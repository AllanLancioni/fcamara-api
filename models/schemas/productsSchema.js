const app = require('../../config');

const
    db = app.db,
    Schema = app.mongoose.Schema;


const ProductSchema = new Schema({
    title:   { type: String, required: true },
    description:   { type: String },
    price:    { type: Number, required: true},
    dateModified:   { type: Date},
    dateCreated:   { type: Date}
});

ProductSchema.pre('save', function(next){
    const now = new Date();
    this.dateModified = now;
    if ( !this.dateCreated ) {
        this.dateCreated = now;
    }
    next();
});

module.exports = {
    schema: ProductSchema,
    model:  db.model('Product', ProductSchema)
};