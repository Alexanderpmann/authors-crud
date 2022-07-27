const express = require("express");
const app = express();
const cors = require("cors");
const port = 8000;

app.use(cors());

// Add in our connection to the config file
require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({extended: true}));

// Add in our connection to our routes
// MAKE SURE THIS IS BELOW THE CODE FOR POST REQUESTS 
// **** make sure to add (app); at the end to avoid getting 'Cannnot Get' errors in postman
require("./server/routes/author.routes")(app);


app.listen(port, () => console.log(`Running on port ${port}!!`));