const express = require("express")
const bodyParser = require("body-parser")
const axios = require('axios');
const ws = require('ws');
const cors = require('cors')


const wss = new ws.Server({ port: 4890 })
const app = express()
const PORT = 3000
const path = require('path');
const http = require('http');
const { response } = require("express");
const queryString = require("querystring");
const fs = require('fs');
const readJson = fs.readFileSync(path.resolve(__dirname, './views/data/series.json'));
const data = JSON.parse(readJson);

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log("ws message")
  })
  
})

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.renderWithData = function (view, model, data) {
    res.render(view, model, function (err, viewString) {
      data.view = viewString;
      res.json(data);
    });
  };
  next();
});
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.post("/baks", (req, res) => {
  console.log(req.body);

  const { body } = req;
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(body));
  })
 
  const { id, status } = req.body;
  data.id = id;
  data.status = status;
  
  res.redirect('/calls');
})



app.get("/baks", (req, res) => {
  
  // return a text response
  const { body } = req;
  res.send(req.body.id, req.body.status);
  return res.render('calldetail', {
    callid: body.id,
    callstatus: body.status,
    
  });
});

app.get("/baks2", (req, res) => {
  let param = req.query.phone
  var data = JSON.stringify({ "phone": param.toString(), "webhookURL": "http://localhost:3000/baks" });

  var config = {
    method: 'options',
    url: 'http://localhost:4830/call',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };
  axios(config)
    .then(function (response) {
      console.log("hi"+JSON.stringify(response.data));
      res.send(response.data)      
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.get("/calls", (req, res) => {
  console.log("in call ")
  res.render('index', { callid: data.id, callstatus: data.status })
});

const server = http.createServer(app);
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

