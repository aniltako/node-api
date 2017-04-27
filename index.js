var config = require('./server/config/config');
var app = require('./server/server');

var logger = require('./server/util/logger');

app.listen(config.port);
console.log('listening on http://localhost:'+config.port);