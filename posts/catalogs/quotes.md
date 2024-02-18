---
layout: post.njk
title: Quotes
tags: catalog
date: "2023-01-19"
---

I collect quotes like trading cards. I don’t have a strong criteria for inclusion in this list: if the quote was remarkable in any way (a clever turn of phrase, an interesting concept, a pithy aphorism, a useful insight, a beautiful piece of diction) I’ll add it here. At some point I might try and make this entire enterprise a little more organize with tags and such, but that seems unnecessary while the number of quotes is still less than a thousand: it is hard to displace the ergonomics of Command & F.

{% for quote in collections.quotes %}
{% if quote.data.source or quote.data.author %}

---

<blockquote class="!pt-4">{{ quote.content }}</blockquote>
<div class="flex space-between items-center">
<div class="flex-1">
{% if quote.data.source %}
[[{{ quote.data.source }}]]
{% else %}
{{ quote.data.author }}
{% endif %}
</div>
<div>
{{ quote.date | readablePostDate }}
</div>
</div>
{% endif %}
{% endfor %}
