const
    config = require('./config'),
    router = require('./routes');

const
    app  = config.app,
    port = process.env.PORT || 8080,
    bodyParser = config.bodyParser;

app.listen(port);
console.log('Application works in port ' + port);
