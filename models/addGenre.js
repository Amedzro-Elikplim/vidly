const { model, Schema } = require('mongoose');

const genreSchema = new Schema({
    name: {
        type: String,
        required: [true, "please provide genre name"]
    }
});

module.exports = model("genre", genreSchema);