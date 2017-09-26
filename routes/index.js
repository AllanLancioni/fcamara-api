const
    config  = require('../config'),
    domain = require('domain');

const
    app = config.app,
    express = config.express,
    router = express.Router(),
    userRouter = require('./api/v1/users'),
    productRouter = require('./api/v1/products'),
    authGuard = require('../middlewares/auth-middleware');

//Define routes base
app.use('/', router);
app.use('/api/v1/users', userRouter);

app.use('/api/v1/products', authGuard);
authGuard.use('/', productRouter);


// GET index
router.get('/', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        res.status(404).send({ error: 'Bad request!' });
    });
});

module.exports = router;