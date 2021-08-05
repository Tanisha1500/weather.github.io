const express=require('express');
const app=express();
const https=require('https');
const bodyParser=require('body-parser');


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{

  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res)
{
      const cityName=req.body.city;
      const id="ebfa6470fd5f4f5ddb47f7378aeb0ece";
      const unit="metric";

      const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+id+"&units="+unit;
        https.get(url,function(response) //when you send a https request toanother server
        {
          response.on("data",function(data)
        {
          var object=JSON.parse(data);   //it basically converts the json format into javascript object
          console.log(object);
          var des=object.main.temp;
          var icon=object.weather[0].icon;
         var url="https://openweathermap.org/img/wn/"+icon+"@2x.png";
          res.write("<h1>The temperature in Bangalore right now is "+des+" Celsius</h1>");
          res.write("<img src="+url+">");
          res.send();
        })

})
})






app.listen(3000,function()
{
  console.log("Server is running on port 3000")
})
