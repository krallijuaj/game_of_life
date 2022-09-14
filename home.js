var express = require("Express");
var app = express();
 var Company = require ("./company")
 var offers = {
    "offers": [{
        "id": 1,
        "position": "software developer",

    },
    {
        "id": 2,
        "position": " marketing"
    }

    ]
 }
 
 var company = new Company("Microsoft", 80,offers)
console.log(newCompany.getOffers())


 app.get("/", function(req, res){
   res.send("<h1>404</h1>");
});
app.get("/name/:name", function(req, res){
   var name = req.params.name;
   res.redirect("https://www.google.com/search?q="+name)
});

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});
