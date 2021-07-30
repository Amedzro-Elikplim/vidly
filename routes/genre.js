const express = require("express");
const Joi = require("joi");
const router = express.Router();
const Genre = require("../models/addGenre");
const { validateNewGenre } = require("../validators/validator");

const check = (genre) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
};

//endpoint for display all genre of musics
router.get("/allgenre", async (req, res) => {
  const genre = await Genre.find((item) => item);
  if (!genre) return res.status(401).send("no genre is available");
  return res.status(200).send(genre);
});

//find genre by id
router.get("/genre/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res.status(404).send("Requested genre with ID not found");
    return res.status(200).send(`Genre:${genre}`);
  } catch (error) {
    console.error(error);
  }
});

//endpoint to add new genre
router.post("/addgenre", async (req, res) => {
  try {
    const validate = await validateNewGenre.validateAsync(req.body);
    const { name } = validate;
    if (error) return res.status(400).send(error.details[0].message);

    const genre = { name };

    const isAvailable = await Genre.findOne({ name });
    if (isAvailable) return res.status(401).send("genre already exist");

    const result = await Genre.create(genre);
    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
  }
});

//endpoint to update a genre
router.put("/allgenre/:id", async (req, res) => {
    try {
        //   const validate = await validateNewGenre.validateAsync(req.body);
        //   const { name } = validate;

          const genre = await Genre.updateOne(req.params.id);
          if (!genre) return res.status(404).send("Request genre with ID not found");

          genre.name = req.body.name;
          return res.status(200).send(genre);
    } catch (error) {
        console.error(error)
    }
 
});

//endpoint to delete a genre
router.delete("/allgenre/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Request genre with ID not found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

module.exports = router;
