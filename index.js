const express = require('express');
const app = express();
const genre = require('./routes/genre');
const cors = require('cors');

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use('/vidly.com/api', genre);


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})