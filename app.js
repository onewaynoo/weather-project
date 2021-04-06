const express = require("express");
const https = require("https");
const bodyParser =  require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res)
{
res.sendFile(__dirname + "/index.html")

});
app.post("/",function(req,res)
{
  const query = req.body.cityName;
  const api ="xyz";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + api + "&units="+unit+"";

  https.get(url, function(response)
  {
    console.log(response.statusCode);

    response.on("data", function(data)
   {
     const weather = JSON.parse(data);
     const temp = weather.main.temp;
     const description = weather.weather[0].description;
     var iconcode = weather.weather[0].icon;
     const imageurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

     res.write(`<h1> The temperature of ${query} is ${temp} degree celcius</h1><br>`);
     res.write(`<h1>The weather is currently ${description}</h1>`);
     res.write("<img src=" + imageurl + ">");
   })
  })

});





app.listen(3000,function(){
  console.log("server is running at port 3000.");
})
