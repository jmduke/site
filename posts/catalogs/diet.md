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
  - date: 2024-02-24
    content:
      - Berlin Game
      - Taskmaster
      - Balatro
      - The E-Myth Revisited
      - The Club Dumas
      - Crystal Project
      - Delicious in Dungeon
  - date: 2024-02-25
      - The E-Myth Revisited
      - Crystal Project
      - Taskmaster
      - Attack on Titan (Season 4)
  - date: 2024-02-25
      - The E-Myth Revisited
      - Blue Eye Samurai
      - Crystal Project
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
