"use strict";

//import the express library into this file
//require is a key word
const express = require("express");
//set up a router
//controls all the different routes/paths/endpoints that the api can handle
const routes = express.Router();

//the above need to be declared at the top of the file ^^

//this list of movies will power our api
const movies = [
  { id: 1, title: "2001: A Space Odyssey", year: 1968, anmimater: false },
  { id: 2, title: "The Godfather", year: 1972, animated: false },
  { id: 3, title: "The Lion King", year: 1994, animated: true },
  { id: 4, title: "Black Panther", year: 2019, animated: false },
];
let nextId = 5;

//GET /movies - respond with a JSON array of movies
//.....method("path", (param1, param2)=>{})
routes.get("/movies", (req, res) => {
  const minYear = parseInt(req.query.minYear);

  if (minYear) {
    const filteredMovies = movies.filter((movie) => movie.year >= minYear);
    res.json(filteredMovies);
  } else {
    res.json(movies);
  }

  res.json(movies);
});

//read one: GET /movies/:id, can return two different status code-if found or not found
routes.get("/movies/:id", (req, res) => {
  //req.param lets you access any named path paramaters  .id comes from what you name it
  //use it to name matching movie
  const id = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404);
    res.send(`No movie with id ${id} exists.`);
  }
});

//create and use POST method
routes.post("/movies", (req, res) => {
  //need to know the details of the movie you're making
  // get asccess to the body
  const movie = req.body;
  movie.id = nextId++;
  movies.push(movie);

  res.status(201);
  res.json(movie);
});

//update uses PUT method

//delete
routes.delete("/movies/:id", (req, res) => {
  console.log("Ran DELETE");
  const id = parseInt(req.params.id);

  const index = movies.findIndex((movie) => movie.id === id);
  if (index !== -1) {
    movies.splice(index, 1);
  }
  res.status(204);
  console.log("Finish DELETE");
  //need code below in order to SEND your code through
  res.send();
});

//export routes for use in server.js
module.exports = routes;
