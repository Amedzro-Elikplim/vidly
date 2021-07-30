const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/vidly", {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(console.log("database connected"))
    .catch(error => console.error(error));