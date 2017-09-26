const Product = require('../../models/schemas/productsSchema').model;
/*

    var products = [
        new Product({
            title:       'Produto 1',
            description: 'Primeiro produto a venda!',
            price:       20.00
        }),
        new Product({
            title:       'Produto 2',
            description: 'Segundo produto a venda!',
            price:       9.95
        }),
        new Product({
            title:       'Produto 3',
            description: 'Terceiro (e mais caro) produto a venda!',
            price:       99.99
        }),
        new Product({
            title:       'Produto 4',
            description: 'Quarto produto a venda!',
            price:       52.25
        })
    ];
*/

const config = {
    elementsNumber: 20,
    maxPrice: 200
};

var products = [];

for (let i = 1; i <= config.elementsNumber; i++) {

    products.push(
        new Product({
            title:       `Product ${i}`,
            description: `Product number ${i} to sale!`,
            price:       parseFloat((Math.random() * config.maxPrice).toFixed(2))
        })
    )

}


{
    Product.remove({}, function(err, row) {
        if (err) {
            console.log("Collection couldn't be removed" + err);
            return;
        }

        console.log("Collection truncated!");
    });
    products.forEach(x => x.save());
    console.log("Seeding finished!");

}
