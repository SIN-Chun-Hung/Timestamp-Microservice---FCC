// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', function (req, res) {
  
  let date = req.params.date; 
  
  if (/\d{5,}/.test(date)) {
    let intDate = parseInt(date);
    return res.json({unix: intDate, utc: new Date(intDate).toUTCString()});
  }
  
  let dateObject = new Date(date);

  if (dateObject.toUTCString() == 'Invalid Date') {
    return res.json({error: dateObject.toUTCString()});
  }

  res.json({unix: dateObject.getTime(), utc: dateObject.toUTCString()});
  
});

app.get('/api/', function (req, res) {
  let currentDateObject = new Date();
  res.json({unix: currentDateObject.getTime(), utc: currentDateObject.toUTCString()});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
