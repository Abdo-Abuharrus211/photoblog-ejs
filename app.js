const express = require("express");

const app = express();

// EXPRESS' built-in body parser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
  res.send("Hello");
});

app.listen(9000, function(){
  console.log("Server started on port 9000.");
});
