// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/timestamp/:date?", function (req, res) {
  console.log(req.params.date);
  let timeDate = null;
  if (req.params.date === undefined) {
    req.params.date = (moment().unix() * 1000);
    timeDate = moment().toString();
  } else {
    if (/\d{5,}/.test(req.params.date)) {
      timeDate = moment.unix(req.params.date / 1000).toString();
    } else {
      timeDate = moment(new Date(req.params.date)).toString();
      req.params.date = (moment(req.params.date).unix() * 1000);
    }
  }
  console.log(timeDate);
  if (timeDate !== 'Invalid date') {
    res.send({ unix: parseInt(req.params.date, 10), utc: new Date(timeDate).toUTCString() });
  } else {
    res.send({ error: "Invalid Date" });
  }
});




// listen for requests :)
var listener = app.listen(8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
