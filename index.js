var config = require('./server/config/config');
var app = require('./server/server');
var hbs = require('express-handlebars');
var path = require('path');

app.engine('hbs', hbs({extname:'hbs',defaultLayout:'layout', layoutsDir: __dirname+'/views/layouts/'}));
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'hbs');

var logger = require('./server/util/logger');

app.listen(config.port);
console.log('listening on http://localhost:'+config.port);