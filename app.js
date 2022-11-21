const express = require("express");
const ejs = require("ejs");
const app = express();
const _ = require("lodash");

//Set view engine EJS
app.set('view engine', 'ejs');
////////////////////////////////
// EXPRESS' built-in body parser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//Getters for different pages.
app.get("/", function(req, res){
  res.render("home");
});

/* TODO: Retrofit for Express param routing */
app.get("/gallery", function(req, res){
  res.render("gallery");
});

// TODO: Getter for speific album pages via Express Routing
// app.get("/gallery/:albumName", function(req, res){
// const reqTitle = _.lowerCase(req.params.albumName);
// const albumTitle = _.lowerCase(...);
// {...}
// })

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
