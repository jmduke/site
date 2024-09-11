---
title: "Auth.js + Square"
date: "2024-05-20"
tags: post
---

Internal tools and small, well-scoped projects are a great avenue to tinker with technologies on the periphery of your understanding, and a [Third South](https://thirdsouth.capital) project has led me to spin up a small Next project using [Bun]() [^1] and [Auth.js](https://authjs.dev/) (nee `next-auth`), which has been quite bad and I think successfully dissuaded me from using it in any more serious endeavor.

Auth.js’s plugin-based provider system is a double-edged sword: when it works, the code foodprint is lovely and small, but when it _doesn’t_ work you get obscure, typo-riddled errors and no easy way to introspect what’s actually happening. This issue is exacerbated by the fact that the most recent change (and concomitant rebrand) significantly changed the provider API, and [providers within the core repository are, at the time of this writing, still broken by those changes.](https://github.com/nextauthjs/next-auth/issues/10727)

But! I am not here to rag on Auth.js! I am here to share a working Square provider implementation. This is an evolution of [this example I found](https://github.com/nemanjam/next-auth-custom-provider-demo/blob/1afed461bbad9336b29828db4078b2d04ce6d3bf/lib/providers/square.ts#L13), which is directionally helpful but on an older version of the API. Here you go:

```ts
const CREDENTIALS = {
  // Replace `clientId` and `clientSecret` with your own.
  clientId: "clientId",
  clientSecret: "clientSecret",
};

// This is for sandbox environment. For production, use `https://connect.squareup.com`.
const BASE_URL = "https://connect.squareupsandbox.com";

const CONFIG = {
  id: "square",
  name: "Square",

  // This disables the CSRF check for the provider, is completely undocumented
  // by the 'making your own provider' guide, and is responsible for me losing
  // 3 hours of my life. I hope you enjoy it.
  checks: ["none"],

  // Pass in the `client_secret` in the request body.
  client: { token_endpoint_auth_method: "client_secret_post" },
  type: "oauth",
  authorization: {
    url: `${BASE_URL}/oauth2/authorize`,
    params: {
      // Replace the `scope` with the permissions you need.
      scope: "MERCHANT_PROFILE_READ,ORDERS_READ,ORDERS_WRITE,PAYMENTS_WRITE",
      clientId: CREDENTIALS.clientId,
      session: false,
    },
  },
  url: `${BASE_URL}/oauth2`,
  token: `${BASE_URL}/oauth2/token`,
  userinfo: `${BASE_URL}/v2/merchants`,

  // You could do with better typing here, but that's left as an exercise to the reader.
  profile: (profile: any) => {
    const unwrappedProfile = profile.merchant[0];
    return {
      id: unwrappedProfile.id,
      name: unwrappedProfile.business_name,
      email: unwrappedProfile.owner_email,
    };
  },
  ...CREDENTIALS,
};

export default CONFIG;
```

[^1]: Which has, thus far, been so easy and banal to use it warrants no further discussion
