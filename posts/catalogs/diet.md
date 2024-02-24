---
title: Media diet
date: "2024-02-21"
data:
  - date: 2024-02-21
    content:
      - Balatro
      - Berlin Game
      - Taskmaster
  - date: 2024-02-22
    content:
      - Balatro
      - Berlin Game
      - Mr. and Mrs. Smith
  - date: 2024-02-23
    content:
      - Mr. and Mrs. Smith
      - Berlin Game
      - Frieren
---

<style>
li > p { margin-bottom: 0 !important; margin-top: 0 !important;}
</style>

{% for datum in data %}

### {{ datum.date | readablePostDate }}

{% for item in datum.content %}

- [[{{ item }}]]
  {% endfor %}
  {% endfor %}
