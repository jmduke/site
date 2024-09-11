---
title: "Using Cursor to port Django tests to pytest"
date: "2024-08-25"
tags: post
---

When it comes to AI tooling, I am equal parts optimist and cynic. I have no moral qualm with using these tools (Supermaven is a pretty heavy part of my day-to-day work), but have found most tools quite bad by the metric of "do they make me more productive on [Buttondown](https://buttondown.com)'s code base?" I think it's important to [be able to taste the kool-aid](/posts/post/koolaid/) with these kinds of things, and try to carve out an hour every weekend to test something new.

My own personal Turing test as of late has been porting some old Django test cases to pytest. Our codebase is around 75% pytest, and I'd love for that to be 100% but it's not really _urgent_, but it does have a couple characteristics that make it particularly useful for testing an AI tool:

1. It's immediately obvious whether or not the work was successful (i.e. do the tests execute and pass or not?)
2. It's the kind of work that I really _want_ to be able to delegate to a tool — I can do it myself, but it's monotonous and I don't add much value
3. There's a good amount of prior art on how pytest works, but it's not as common as `unittest`.
4. `pytest` fixtures are tricky (they exist in different files, their usage pattern is non-obvious).

Two standalone tools (GitHub's [Copilot Workspace](https://copilot-workspace.githubnext.com/), SourceGraph's [Cody](https://sourcegraph.com/cody)) have failed this test; [Cursor](https://www.cursor.com/), however, succeeded.

To emphasize, these are not complicated test files. Here's a very basic (_real_) file that Cursor succeeded at porting from Django's test framework:

```python
from django.test import TestCase

from monetization.events.charge_refunded import handle
from monetization.models import StripeAccount, StripeCharge
from monetization.tests.utils import construct_event


class ChargeRefundedTestCase(TestCase):
    def setUp(self) -> None:
        self.event = construct_event("charge_refunded.json")
        self.account_id = "acct_whomstever"
        self.account = StripeAccount.objects.create(account_id=self.account_id)

    def test_basic(self) -> None:
        charge = StripeCharge.objects.create(
            charge_id="ch_whatever", account=self.account
        )
        handle(self.event.object, self.account_id)
        assert charge.refunds.count() == 1
```

to `pytest`!

```python
import pytest

from monetization.events.charge_refunded import handle
from monetization.models import StripeCharge
from monetization.tests.utils import construct_event


@pytest.fixture
def stripe_charge(stripe_account):
    return StripeCharge.objects.create(
        charge_id="ch_whatever", account=stripe_account
    )


def test_basic(stripe_account, stripe_charge):
    event = construct_event("charge_refunded.json")
    handle(event.object, stripe_account.account_id)
    assert stripe_charge.refunds.count() == 1
```

(Note that it's _intentional_ that the `stripe_account` fixture is not actually in this file: it's in a global `conftest.py` that I pointed Cursor to.)

This is basically the most trivial possible port (and, again, Cody + Copilot Workspace both failed). Here's a slightly more complicated one testing out our [Exports API](https://docs.buttondown.email/api-exports-create):

```python
from unittest import mock
from unittest.mock import MagicMock

from django.test import override_settings

from api.tests.utils import ViewSetTestCase
from emails.models.account.model import Account
from emails.models.export.model import Export
from emails.tests.utils import FakeData


class ExportViewSetTestCase(ViewSetTestCase):
    url = "/v1/exports"

    @override_settings(IS_TEST=False, DEBUG=False)
    def test_list_on_v2(self) -> None:
        account = self.newsletter.owning_account
        account.billing_type = Account.BillingType.V2
        account.save()
        response = self.api_client.get(self.url)
        assert response.status_code == 403, response.content
        assert "upgrade your account" in response.json()["detail"]

    @mock.patch("emails.models.export.actions.s3.put")
    def test_list(self, put_mock: MagicMock) -> None:
        put_mock.return_value = "s3://foo/bar"
        FakeData.export(newsletter=self.newsletter)
        FakeData.export(newsletter=self.newsletter)
        response = self.api_client.get(self.url)
        assert response.status_code == 200, str(response.content)
        assert isinstance(response.json(), dict), response.json()
        assert response.json()["count"] == 2, response.json()

    @mock.patch("emails.models.export.actions.s3.put")
    def test_list_should_not_pollute_across_newsletters(
        self, put_mock: MagicMock
    ) -> None:
        put_mock.return_value = "s3://foo/bar"
        other_newsletter = FakeData.newsletter(
            owning_account=self.newsletter.owning_account
        )
        FakeData.export(newsletter=other_newsletter)
        FakeData.export(newsletter=other_newsletter)
        response = self.api_client.get(self.url)
        assert response.status_code == 200, str(response.content)
        assert isinstance(response.json(), dict), response.json()
        assert response.json()["count"] == 0, response.json()

    @mock.patch("emails.models.export.actions.s3.put")
    def test_export_return_ids(self, put_mock: MagicMock) -> None:
        put_mock.return_value = "s3://foo/bar"
        FakeData.export(newsletter=self.newsletter)
        response = self.api_client.get(self.url)
        assert "id" in response.json()["results"][0], response.content

    @mock.patch("emails.models.export.actions.s3.put")
    def test_POST_request_of_export_api(self, put_mock: MagicMock) -> None:
        put_mock.return_value = "s3://foo/bar"
        self.assertPOSTReturnsStatusCode(
            {
                "collections": ["comments"],
            },
            201,
        )
        assert Export.objects.filter(newsletter=self.newsletter).exists()

    @mock.patch("emails.models.export.actions.s3.put")
    def test_empty_collection_POST_request_of_export_api(
        self, put_mock: MagicMock
    ) -> None:
        put_mock.return_value = "s3://foo/bar"
        self.assertPOSTReturnsStatusCode(
            {
                "collections": [],
            },
            400,
        )

    @mock.patch("emails.models.export.actions.s3.put")
    def test_export_requester_matches_account(self, put_mock: MagicMock) -> None:
        put_mock.return_value = "s3://foo/bar"
        self.user = FakeData.user()
        self.account = Account.objects.get(user_id=self.user.id)
        self.newsletter = FakeData.newsletter(owning_account=self.account)
        self.account.email_address = "testexport@example.com"
        self.account.save()
        FakeData.export(newsletter=self.newsletter, requester=self.account)
        export = Export.objects.filter(newsletter=self.newsletter).first()
        self.assertEqual(
            export.requester.email_address,
            self.account.email_address,
            "Requester does not match",
        )
```

Beyond the obvious _size_ of the file, there are a couple other things that made this trickier:

- We're overriding settings in some tests, mocking in others, and inheriting from a custom class.
- We're using `FakeData`, a sort of factory-pattern generator that would ideally be replaced with `pytest` fixtures.

Cursor did pretty well, though the final output (seen below) required a couple tweaks on my end:

```python
import json

import pytest
from django.test import override_settings

from emails.models.account.model import Account
from emails.models.export.model import Export
from emails.tests.utils import FakeData


@pytest.fixture
def url():
    return "/v1/exports"


@pytest.fixture
def mocked_s3_put(mocker):
    return mocker.patch(
        "emails.models.export.actions.s3.put", return_value="s3://foo/bar"
    )


@override_settings(IS_TEST=False, DEBUG=False)
def test_list_on_v2(logged_in_client, url, newsletter):
    account = newsletter.owning_account
    account.billing_type = Account.BillingType.V2
    account.save()
    response = logged_in_client.get(url)
    assert response.status_code == 403, response.content
    assert "upgrade your account" in response.json()["detail"]


def test_list(logged_in_client, url, newsletter, mocked_s3_put):
    FakeData.export(newsletter=newsletter)
    FakeData.export(newsletter=newsletter)
    response = logged_in_client.get(url)
    assert response.status_code == 200, str(response.content)
    assert isinstance(response.json(), dict), response.json()
    assert response.json()["count"] == 2, response.json()


def test_list_should_not_pollute_across_newsletters(
    logged_in_client, url, newsletter, mocked_s3_put
):
    other_newsletter = FakeData.newsletter(owning_account=newsletter.owning_account)
    FakeData.export(newsletter=other_newsletter)
    FakeData.export(newsletter=other_newsletter)
    response = logged_in_client.get(url)
    assert response.status_code == 200, str(response.content)
    assert isinstance(response.json(), dict), response.json()
    assert response.json()["count"] == 0, response.json()


def test_export_return_ids(logged_in_client, url, newsletter, mocked_s3_put):
    FakeData.export(newsletter=newsletter)
    response = logged_in_client.get(url)
    assert "id" in response.json()["results"][0], response.content


def test_POST_request_of_export_api(logged_in_client, url, newsletter, mocked_s3_put):
    response = logged_in_client.post(
        url, json.dumps({"collections": ["comments"]}), content_type="application/json"
    )
    assert response.status_code == 201, response.json()
    assert Export.objects.filter(newsletter=newsletter).exists()


def test_empty_collection_POST_request_of_export_api(
    logged_in_client, url, mocked_s3_put
):
    response = logged_in_client.post(
        url, json.dumps({"collections": []}), content_type="application/json"
    )
    assert response.status_code == 400


def test_export_requester_matches_account(db, mocked_s3_put):
    user = FakeData.user()
    account = Account.objects.get(user_id=user.id)
    newsletter = FakeData.newsletter(owning_account=account)
    account.email_address = "testexport@example.com"
    account.save()
    FakeData.export(newsletter=newsletter, requester=account)
    export = Export.objects.filter(newsletter=newsletter).first()
    assert (
        export.requester.email_address == account.email_address
    ), "Requester does not match"
```

Some notes on its efforts:

- It got the fixture-mocking API down first try, which is more than I can say for _myself_ (I always end up trying to create a `MagicMock` or forget to `start` it or some other such trivial error)
- It originally put those final three tests in a completely empty class for reasons passing understanding; I amended the prompt to say `no classes` and it fixed it
- The final test (`test_export_requester_matches_account`) was failing because it did not place the `db` fixture, which I had to fix manually.

Overall, I was impressed. Not only did Cursor pass the first bar of "actually accomplishing the task", it also passed the second bar of "accomplishing the task faster than it would have taken me."

Not unlike Icarus, I was emboldened by these results. I tried two other genres of task that I suspected Cursor would be able to handle well:

1. Localizing a footer in a handful of different languages. This was, I presume, made easier by the fact that the relevant file already _had_ localization logic.

2. Adding some logic to a Django admin form. Not only did this work, this was the clearest example of Cursor doing something that I _didn't know how to do_ off the top of my head. (It's a trivial change, and I would have been able to figure it out in five minutes of Googling — but ten seconds is better than five minutes.)

Cursor did both! ...and then it choked on some more complicated feature work that spanned multiple files. Which is fine: a tool does not need to be flawless to be useful, and Cursor proved itself useful.
