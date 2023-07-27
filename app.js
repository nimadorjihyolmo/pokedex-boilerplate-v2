const express = require("express");
const morgan = require("morgan");
const pokeBank = require("./pokeBank");
const pokeList = require("./views/pokeList");
const pokeDetails = require("./views/pokeDetails");
const Pokemon = require("./models/Pokemon");

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const pokemon = pokeBank.list();
  res.send(pokeList(pokemon));
});

app.get("/pokemon/:id", (req, res) => {
  const pokemon = pokeBank.find(req.params.id);
  res.send(pokeDetails(pokemon));
});

// Create a route to get all Pokemon.
app.get("/pokemon", async (req, res) => {
  const pokemon = await Pokemon.findAll();
  res.json(pokemon);
});

// Create a route to get a single Pokemon by ID
app.get("/pokemon/:id", async(req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});

// Create a route to create a new Pokemon
app.post("/pokemon", async (req, res) => {
  const newPokemon = await Pokemon.create(req.body);
  res.json(newPokemon);
});

// Create a route to update a Pokemon by ID.
app.put("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.update(req.body);
    res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});

// Create a route to delete a Pokemon by ID.
app.delete("/pokemon/:id", async (req, res) => {
  const pokemon = await Pokemon.findByPk(req.params.id);
  if (pokemon) {
    await pokemon.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Pokemon not found");
  }
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
