const
    app  = require('../../../config'),
    domain = require('domain'),
    Product = require('../../../controllers/ProductController');


const router = app.express.Router();

//CREATE a new product
router.post('/', function (req, res){
    const
        d = domain.create();

    d.on('error', function(error){
        res.status(500).send({'error': error.message});
    });

    d.run(function(){

        Product.create(req.body, {
            success: function(product){
                res.status(201).send({msg: 'Product created succesfully: '+JSON.stringify(product), data: product});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});


// GET all
router.get('/', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){

        Product.getAll({
            success: function(products){
                res.status(200).json({data:products});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });

    });
});

// GET one
router.get('/:productId', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        Product.getById(req.params.productId, {
            success: function(product){
                res.status(200).json({data:product});
            },
            error: function(err){
                res.status(500).send(err);

            }
        });
    });
});

//UPDATE
router.put('/:productId', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){

        Product.update(req.params.productId, req.body, {
            success: function(product){
                res.status(200).send({msg: 'Product updated succesfully: '+JSON.stringify(product), data: product});
            },
            error: function(err){
                res.status(500).send(err);
            }
        });
    });
});

// DELETE
router.delete('/:productId', function(req, res, next) {
    var d = domain.create();

    d.on('error', function(error){
        console.log(error.stacktrace);
        res.status(500).send({'error': error.message});
    });

    d.run(function(){
        Product.delete(req.params.productId, {
            success: function(product){
                res.status(200).json({deleted:product, message:"Succesfully deleted!"});
            },
            error: function(err){
                res.status(500).send(err);

            }
        });
    });
});

module.exports = router;