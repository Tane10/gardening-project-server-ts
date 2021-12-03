# Gardening project server

- [Gardening project server](#gardening-project-server)
  - [Brief](#brief)
    - [!NOTE](#note)
  - [How to run](#how-to-run)
  - [History of the project](#history-of-the-project)
    - [Proud moments](#proud-moments)

## Brief

This repo contains the server for my gardening project. The approach for this was to use [Restify](http://restify.com/) and build routes dynamically, dependency injection are handled by [Inversify](https://inversify.io/).

This project is the building block for a garden planning tool the front end will be using [React](https://reactjs.org/) typescript and [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) to handle the drawing.

### !NOTE

- Data base that this project uses has been deprecated

## How to run

`npm run i`

`npm run dev`

## History of the project

The reason of the project was to build a tool that i could use to plan my garden i wanted to save the designs / plans that i would use for my garden. Once the designs for my garden would be done i would then use this application to track my gardens progress.

### Proud moments

The main learning points i took from this small project wast learning about dependency injection, containers and dynamically building routes.

I learnt a lot about typescript during this small project and found out how flexible it can be, the strengths of using decorators with inversify to allow services to be injected through your code.

A really great moment was when i started to learn how to use react and canvas to start to draw the shapes on the canvas and connect the frontend to the back.

But doing project came to the conclusion that this approach with restify wasn't the best way to build a project.

Next time:

- use [nest.ts](https://nestjs.com/)
- write JSDocs for the functions
- use openAPI to document the api before i build it
- use firebase as a real time database, because it comes with authentication out the box
