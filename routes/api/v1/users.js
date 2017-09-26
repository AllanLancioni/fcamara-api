const
    app  = require('../../../config'),
    domain = require('domain'),
    User = require('../../../controllers/UserController'),
    Auth = require('../../../controllers/AuthController');

const
    router = app.express.Router();
    jwt = app.jwt;
    
//CREATE a new user
router.post('/', (req, res) => {
    var d = domain.create();

    d.on('error', function(error){
        res.status(500).send({'error': error.message});
    });

    d.run(function(){

        User.create({
            name:       req.body.name,
            password:   req.body.password,
            email:      req.body.email
        }, {
            success: function(user){
                res.status(201).send({msg: 'User created succesfully: '+JSON.stringify(user), data: user});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

router.post('/login', (req, res) => {
    if(!req.body.email || !req.body.pwd) return res.status(412).json({success:false, message:'Email and password are required!'});


    var d = domain.create();

    d.on('error', error => {
        console.log(error.stacktrace);
        res.status(500).json({success:false, message: error.message});
    });

    d.run(function(){

        const auth = new Auth({email:req.body.email, password:req.body.pwd});

        return auth.find( function(data) {
            console.log(data);

            if (data.err !== null) return res.status(500).json({success:false, message: data.err});

            if (data.user === null) return res.status(202).json({success:false, message: 'Email or Password incorrect!'});

            return res.status(200).json({success:true, message: 'Logged in!', data: data.token});
        });


    });
});


// GET index
router.get('/', (req, res, next) => {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });


    d.run(function(){

        User.getAll({
            success: function(users){
                res.status(201).json(users);
            },
            error: function(err){
                res.status(500).send(err);
            }
        });

    });
});
router.get('/:userId', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        User.getById(req.params.userId, {
            success: function(user){
                res.status(201).json(user);
            },
            error: function(err){
                res.status(500).send(err);

            }
        });
    });
});



module.exports = router;