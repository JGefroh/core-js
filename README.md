# core-js
core-js is a very simple game/simulation loop framework I initially made a long time ago in Java, which I ported to Javascript. 

It is an Entity-Component system used to structure packages of data and reference them - almost like viewing a set of data through an arbitrary window. Core also keeps track of the Systems - things that operate on Entities to perform a particular set of work every game loop.

Games run in a loop many time a second. In fact, if you’re trying to run a game at 60 frames per second, you only have a budget of ~16.6667ms to complete all of the things you are trying to do in your game. 

I built Core so that I could manage all of the pieces of all of the things I wanted to do in a centralized, consistent manner.

---

# Games I made with Core:

# Frontier
[Source code](https://github.com/JGefroh/core-frontier) | [Demo](http://frontier.jgefroh.com/)

<img width="2010" alt="Screenshot 2024-04-19 at 7 13 18 PM" src="https://github.com/JGefroh/core-js/assets/1077095/16ec6674-0c48-4a1a-870e-9313c4a96aeb">

# Light
[Source code](https://github.com/JGefroh/core-light) | [Demo](http://light.jgefroh.com/)

![screenshot-1](https://github.com/user-attachments/assets/44818268-5f4b-4785-bfc9-a3086bc13c27)



----
# The major parts

## Entities
Entities are things in the game world. They have a unique identifier as well as a key, and that’s about it. Entities contain Components that hold the actual data.

## Components
A component is a set of data for a particular arbitrary purpose. They can be added to an Entity. Imagine data you need to represent an Entity’s health - you could have a `HealthComponent` with a property `health_points`.

## Tags
A tag is a window into an entity and its components that is particularly relevant for something you are trying to do with or to that Entity. 

You can use it to group together component data access from multiple components, and then access all eligible Entities with that Tag - handy for naming a set of things that a System can act on. 

For example - if you wanted to have a Movable object, you could create a Tag that looks at a PositionComponent and a VelocityComponent to modify the data necessary to simulate movement. You could then reference all Entities with both a PositionComponent and a VelocityComponent with the Movable tag.

## Systems
Systems are the actual system that operate in the game. Systems can either perform work every game cycle, or send and receive messages to each other. In the above example, I could have a MovementSystem that handles moving all of my Entities by their specified velocity every game loop, using the Movable tag to identify all of them.

# Core
Core is the central part of the framework that brings them all together. It tracks the list of Entities, automatically assigns or unassigns Tags as Components are added / removed, and runs the core game loop - a loop that calls every system in sequence and asks it to do work. Because it tracks everything, Systems can use Core to pass messages to each other, retrieve specific Entities, and set/retrieve "global data.
