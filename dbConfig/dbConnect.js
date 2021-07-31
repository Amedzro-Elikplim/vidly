const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/vidly", {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
}).then(console.log("database connected"))
    .catch(error => console.error(error));