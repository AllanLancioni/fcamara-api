const User = require('../../models/schemas/usersSchema').model;

const jsonSimulation = {
    "data": [
        {
            "email": "admin@example.com",
            "name": "Admin",
            "password": "admin"
        },
        {
            "email": "allan@example.com",
            "name": "AllanLancioni",
            "password": "aclancioni"
        },
        {
            "email": "test@example.com",
            "name": "test",
            "password": "1234"
        },
        {
            "email": "joaozinho@example.com",
            "name": "JoaozinhoDaSilva",
            "password": "JDSilva"
        }
    ]
},
users = [];


{
    jsonSimulation.data.forEach(x => {

        users.push(new User(x));

    });

    User.remove({}, (err, row) => {
        if (err) {
            console.log("Collection couldn't be removed" + err);
            return;
        }

        console.log("Collection truncated!");
    });
    users.forEach(user => user.save());
    console.log("Seeding finished!");
    process.exit()
}
