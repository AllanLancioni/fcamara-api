const app = require('../config');

const
    isDevMode = app.isDevMode,
    db = app.db;

class UserController {

    static get model() { return require('../models/schemas/usersSchema').model };

    //READ all users
    static getAll(config, callbacks){

        if (arguments.length < 2 && (config.success || config.error)) callbacks = config;

        return UserController.model.find()
            .sort(config.sort || '-dateCreated').skip(config.skip || 0).limit(config.count || 20).exec('find', (err, users) => {

                if (!err) {
                    if(isDevMode) console.log("[GET]   Get all users: " + JSON.stringify(users));
                    callbacks.success(users);
                } else {
                    if(isDevMode) console.log(err);
                    callbacks.error(err);
                }
            });
    }

    //READ user by id
    static getById(id, callbacks){
        return UserController.model.findById(id, (err, user) => {
            if (!err) {
                if(isDevMode) console.log("[GET]   Get user: " + JSON.stringify(user));
                callbacks.success(user);
            } else {
                if(isDevMode) console.log(err);
                callbacks.error(err);
            }
        });
    }

    //CREATE user function
    static create(user, callbacks){
        const u = new UserController.model({
            name:   user.name,
            email:   user.email,
            password:   user.password,
        });

        u.save(err => {
            if (!err) {
                if(isDevMode) console.log("[ADD]   User created with username: " + user.username);
                callbacks.success(u);
            } else {
                if(isDevMode) console.log(err);
                callbacks.error(err);
            }
        });
    }


    //UPDATE user
    static update(id, user, callbacks){
        return UserController.model.findById(id, (err, u) => {
            if (!err) {
                u.username = user.username;
                u.password = user.password;
                return u.save(err => {
                    if (!err) {
                        if(isDevMode) console.log("[UDP]   Updated user: " + JSON.stringify(u));
                        callbacks.success(u);
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

    //DELETE user
    static delete(id, callbacks){
        return UserController.model.findById(id, (err, user) => {
            return user.remove( err => {
                if (!err) {
                    if(isDevMode) console.log("[DEL]    Deleted user: " + id);
                    callbacks.success(user);
                } else {
                    if(isDevMode) console.log(err);
                    callbacks.error(err);
                }
            });
        });
    }


    //Login user
    static login(user, callbacks){
        return UserController.model.find({'username': user.username }, (err, u) => {
            if (!err) {
                if(u[0]){
                    if (u[0].password == user.password){
                        //Login ok
                        callbacks.success(u[0]);
                    }else{
                        //Password mismatch
                        callbacks.error({msg: 'Invalid login parameters', data: user});
                    }
                }else{
                    //User does not exist
                    callbacks.error({msg: 'Invalid login parameters', data: user});
                }
            } else {
                callbacks.error(err);
            }
        });
    }
}

module.exports = UserController;







