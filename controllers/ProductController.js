const app = require('../config');

const
    isDevMode = app.isDevMode,
    db = app.db;

class ProductController {

    static get model() { return require('../models/schemas/productsSchema').model };


    //READ all products
    static getAll(config, callbacks){

        if (arguments.length < 2 && (config.success || config.error)) callbacks = config;

        return ProductController.model.find()
            .sort(config.sort || '-dateCreated').skip(config.skip || 0).limit(config.count || 200).exec('find', (err, products) => {

                if (!err) {
                    if(isDevMode) console.log("[GET]   Get all products: " + JSON.stringify(products));
                    callbacks.success(products);
                } else {
                    if(isDevMode) console.log(err);
                    callbacks.error(err);
                }
            });
    }

    //READ product by id
    static getById(id, callbacks){
        return ProductController.model.findById(id, (err, product) => {
            if (!err) {
                if(isDevMode) console.log("[GET]   Get product: " + JSON.stringify(product));
                callbacks.success(product);
            } else {
                if(isDevMode) console.log(err);
                callbacks.error(err);
            }
        });
    }

    //CREATE product
    static create(product, callbacks){
        const p = new Product.model({
            title:       product.title,
            description: product.description,
            price:       product.price
        });

        p.save(err => {
            if (!err) {
                if(isDevMode) console.log("[ADD]   product created with productname: " + product.productname);
                callbacks.success(p);
            } else {
                if(isDevMode) console.log(err);
                callbacks.error(err);
            }
        });
    }


    //UPDATE product
    static update(id, product, callbacks){
        return ProductController.model.findById(id, (err, p) => {
            if (!err) {
                p.title =       product.title;
                p.description = product.description;
                p.price =       product.price;
                return p.save(err => {
                    if (!err) {
                        if(isDevMode) console.log("[UDP]   Updated product: " + JSON.stringify(p));
                        callbacks.success(p);
                    } else {
                        if(isDevMode) console.log(err);
                        callbacks.error(err);
                    }
                });
            } else {
                if(isDevMode) console.log(err);
                callbacks.error(err);
            }

        });
    }

    //DELETE product
    static delete(id, callbacks){
        return ProductController.model.findById(id, (err, product) => {
            return product.remove(err => {
                if (!err) {
                    if(isDevMode) console.log("[DEL]    Deleted product: " + id);
                    callbacks.success(product);
                } else {
                    if(isDevMode) console.log(err);
                    callbacks.error(err);
                }
            });
        });
    }

}

module.exports = ProductController;