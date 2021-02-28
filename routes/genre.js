const express = require('express');
const Joi = require('joi');
const router = express.Router();


const genres = [
    {id: 1, name: "Horror"},
    {id: 2, name: "thriller"},
    {id: 3, name: "Sci-fi"},
    {id: 4, name: "Comedy & drama"},
    {id: 5, name: "Fantasy"},
];

const check = (genre) => {
    const schema = {
        name: Joi.string().required()
    }

    return Joi.validate(genre, schema);
}


//endpoint for display all genre of musics 
router.get('/allgenre', (req, res) => {
    res.send(genres); 
});

router.get('/genre/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send("Request genre with ID not found");
    res.send(`Genre:  ${genre.name}`);
});


//endpoint to add new genre
router.post('/allgenre', (req, res) => {

    const {error} = check(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});


//endpoint to update a genre
router.put('/allgenre/:id', (req, res) => {
       const {error} = check(req.body);
       if(error) return res.status(400).send(error.details[0].message);
       
       const genre = genres.find(g => g.id === parseInt(req.params.id));
       if(!genre) return res.status(404).send("Request genre with ID not found");

       genre.name = req.body.name;
       res.send(genre);
});


//endpoint to delete a genre
router.delete('/allgenre/:id', (req, res) => {
      const genre = genres.find(g => g.id === parseInt(req.params.id));
      if(!genre) return res.status(404).send("Request genre with ID not found");

      const index = genres.indexOf(genre);
      genres.splice(index, 1);
      res.send(genre);
      
});

module.exports = router;