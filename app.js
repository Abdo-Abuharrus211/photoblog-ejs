const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
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

//connect to MongoDB by specifying port to access MongoDB server
// 0.0.0.0:27017 instead of localhost:27017  !!!
mongoose.connect("mongodb://0.0.0.0:27017/galleryDB", {
  useNewUrlParser: true
});

//Schemas
const photoSchema = new mongoose.Schema({
  name: String
});

const albumSchema = new mongoose.Schema({
  name: String,
  photos: [photoSchema]
});
//Models
const Photo = new mongoose.model("Photo", photoSchema);
const Album = new mongoose.model("Album", albumSchema)


///Test examples...
/* const dogPic = new Photo({
  name: "Photo of dog"
});
dogPic.save();

const dailyAlbum = new Album({
  name: "The Daily",
  photos: [dogPic]
});
dailyAlbum.save(); */


//Getters for different pages.
app.get("/", function(req, res){
  res.render("home");
});

/* TODO: Retrofit for Express param routing */
app.get("/gallery", function(req, res){
  res.render("gallery");
});

// TODO: Getter for speific album pages via Express Routing(TEST & Fix)
app.get("/gallery/:albumName", function(req, res){
  //save requested album name to const
  const albumName = _.capitalize(req.params.albumName);
  Album.findOne({name: albumName}, function(err, foundAlbum){
    if(!err) {
      if(!foundAlbum){
        console.log("ALbum doesn't exist");
      } else {
        res.render("album", {
          albumName: foundAlbum.name,
          albumPics: foundAlbum.photos
        });
      }
    }
  });
});


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
