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
  - date: 2024-02-26
      - The E-Myth Revisited
      - Blue Eye Samurai
      - Crystal Project
  - date: 2024-02-27
      - The E-Myth Revisited
      - Blue Eye Samurai
      - Crystal Project
      - Monster
  - date: 2024-02-28
      - The E-Myth Revisited
      - Mexico Set
      - Legend of the Galactic Heroes
      - Crystal Project
      - Taskmaster
  - date: 2024-02-29
      - Crystal Project
      - Mexico Set
      - Frieren
  - date: 2024-03-01
      - Blue Eye Samurai
      - Mexico Set
      - The Club Dumas
  - date: 2024-03-02
      - Mexico Set
      - Taskmaster
      - Crystal Project
      - Delicious in Dungeon
  - date: 2024-03-03
      - Mexico Set
      - London Match
      - Attack on Titan (Season 4)
  - date: 2024-03-04
      - Taskmaster
      - Monster
      - Crystal Project
      - Blue Eye Samurai
      - London Match
  - date: 2024-03-05
      - London Match
      - Crystal Project
      - Legend of the Galactic Heroes
  - date: 2024-03-06
      - London Match
      - Blue Eye Samurai
      - Taskmaster
      - Freiren
  - date: 2024-03-07
      - London Match
  - date: 2024-03-08
      - London Match
  - date: 2024-03-09
      - Delicious in Dungeon
      - Taskmaster
      - London Match
      - Secrets of Grindea
  - date: 2024-03-10
      - London Match
      - Austerlitz
      - Secrets of Grindea
      - Taskmaster
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
