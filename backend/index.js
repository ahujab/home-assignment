const express = require("express")
const bodyParser = require("body-parser")
const axios = require('axios');
// Initialize express and define a port
const app = express()
const PORT = 3000
const path = require('path');
const http = require('http');
const { response } = require("express");
const queryString=require("querystring");
const fs = require('fs');
const readJson = fs.readFileSync(path.resolve(__dirname, './views/data/series.json'));
const data = JSON.parse(readJson);


// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())
app.use('/', function(req,res){
  res.sendFile(path.join(__dirname+'/index.ejs'));
  //__dirname : It will resolve to your project folder.
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.post("/baks", (req, res) => {
    console.log(req.body);
    
    // return a text response
    const {body}=req;
    //res.send(req.body.id,req.body.status); 
     //res.redirect('/baks2?',queryString.stringify(body.data))
     const { id, status } = req.body;

     data.push({ ID: data.length + 1, Title: title, Country: country });
     fs.writeFileSync('.view/data/series.json', JSON.stringify(data, null, 4));
     res.redirect('/');

    //   res.render('/baks2', {
    //   callid: body.id,
    //  callstatus:body.status
    //  });
    })
  
  

    app.get("/baks", (req, res) => {
      console.log(req.body);
      
      // return a text response
      const {body}=req;
      res.send(req.body.id,req.body.status); 
       return res.render('calldetail', {
        callid: body.id,
       callstatus:body.status
       });
      });
  
app.get("/baks2", (req, res) => {
    
var data = JSON.stringify({"phone":"13018040009","webhookURL":"http://localhost:3000/baks"});

var config = {
  method: 'options',
  url: 'http://localhost:4830/call',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then(function (response) {
  
 
  console.log(JSON.stringify(response.data));
  return res.render('index', {
    callid: response.data.id,
    callstatus:"gg"
   

    
  });
  res.send("Thank you")
})
.catch(function (error) {
  console.log(error);
});





    //res.json(data);
});
const server = http.createServer(app);

server.listen(PORT ,() => console.log(`🚀 Server running on port ${PORT}`));


// Start express on the defined port
//app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
