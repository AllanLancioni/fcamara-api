const app = require('../../config');

const
    db = app.db,
    Schema = app.mongoose.Schema;


const UserSchema = new Schema({
    name:   { type: String, required: true, unique: true},
    email:   { type: String, required: true, unique: true},
    password:   { type: String, required: true },
    dateCreated:    { type: Date},
    dateModified:   { type: Date}
});

UserSchema.pre('save', function(next){
    const now = new Date();
    this.dateModified = now;
    if ( !this.dateCreated ) {
        this.dateCreated = now;
    }
    next();
});

module.exports = {
    schema: UserSchema,
    model:  db.model('User', UserSchema)
};
