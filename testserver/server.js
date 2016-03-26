var express = require('express');
require('express-namespace');
bodyParser = require("body-parser");
cors = require('cors');

var app;
app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

require('./routes/routes')(app);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
module.exports = app;
