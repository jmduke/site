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
      - The Club Dumas
  - date: 2024-03-10
      - London Match
      - Austerlitz
      - Secrets of Grindea
      - Crystal Project
      - Taskmaster
      - Attack on Titan (Season 4)
  - date: 2024-03-11
      - Austerlitz
      - Taskmaster
      - Monster
  - date: 2024-03-12
      - Austerlitz
  - date: 2024-03-13
      - Austerlitz
      - Scott Pilgrim Takes Off
      - Legend of the Galactic Heroes
  - date: 2024-03-14
      - Crystal Project
      - Scott Pilgrim Takes Off
      - Frieren
      - Taskmaster
  - date: 2024-03-15
      - Crystal Project
      - Unicorn Overlord
      - Austerlitz
      - Delicious in Dungeon
  - date: 2024-03-16
      - Austerlitz
      - Unicorn Overlord
      - Dune
      - Frieren
  - date: 2024-03-17
      - Austerlitz
      - Unicorn Overlord
      - Monster
  - date: 2024-03-18
      - Attack on Titan (Season 4)
      - Unicorn Overlord
      - Taskmaster
      - Devs
  - date: 2024-03-19
      - Devs
      - Unicorn Overlord
  - date: 2024-03-20
      - Devs
      - Unicorn Overlord
      - Taskmaster
  - date: 2024-03-21
      - Devs
  - date: 2024-03-22
      - Dune 2
  - date: 2024-03-23
  - date: 2024-03-24
      - Austerlitz
      - Frieren
  - date: 2024-03-25
      - Unicorn Overlord
  - date: 2024-03-26
      - Delicious in Dungeon
  - date: 2024-03-27
      - Monster
      - Taskmaster
  - date: 2024-03-28
      - The Late Show
      - Austerlitz
  - date: 2024-03-29
      - Attack on Titan (Season 4)
      - Superforecasting
      - Cribsheet
  - date: 2024-03-30
      - Cribsheet
      - Taskmaster
      - Unicorn Overlord
      - Legends of the Galactic Heroes
  - date: 2024-03-31
      - Cribsheet
      - Unicorn Overlord
  - date: 2024-04-01
      - Frieren
      - Cribsheet
      - Unicorn Overlord
  - date: 2024-04-02
      - Cromartie High School
      - Cribsheet
  - date: 2024-04-03
      - Cribsheet
  - date: 2024-04-04
      - Cribsheet
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
