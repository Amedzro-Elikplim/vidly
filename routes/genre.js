const express = require("express");
const Joi = require("joi");
const router = express.Router();
const Genre = require("../models/addGenre");
const { validateNewGenre } = require("../validators/validator");

//endpoint for display all genre of musics
router.get("/allgenre", async (req, res) => {
  const genre = await Genre.find((item) => item);
  if (!genre) return res.status(401).send("no genre is available");
  return res.status(200).send(genre);
});

//find genre by id
router.get("/genre/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await Genre.findById(id);
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
    const validate = await validateNewGenre.validate(req.body);
    const { name } = validate;

    const genre = { name };

    const isAvailable = await Genre.findOne({ name });
    if (isAvailable) return res.status(401).send("genre already exist");

    const result = await Genre.create(genre);
    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

//endpoint to update a genre
router.put("/updategenre/:id", async (req, res) => {
  try {
    const validate = await validateNewGenre.validate(req.body);

    const { id } = req.params;
    const { name } = validate;

    if (error) return res.status(400).send(error);

    const doc = await Genre.findById(id);

    doc.name = name;
    doc.save();

    res.status(200).send(doc);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

//endpoint to delete a genre
router.delete("/allgenre/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Genre.findById(id);
    const { name } = doc;
    const deletedDoc = await Genre.deleteOne({ id });

    res.status(200).send(deletedDoc);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
