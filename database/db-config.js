const mongoose = require('mongoose');
const
    dbConfig = {
        drive : 'mongodb',
        user  : 'root',
        pwd   : 'root',
        dbName: 'fcamara',
        port  : 29183,
        host  : 'ds129183.mlab.com'
    },
    path  = `${dbConfig.drive}://${dbConfig.user}:${dbConfig.pwd}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`

//Set up MongoDb connection
function initDB(){

    mongoose.connect(path);
    var conn = mongoose.connection;

    conn.on('error', (err) => { console.error('connection error:', err); conn = null});

    if (conn)
        conn.once('open', () =>  console.log('db connected!'));

    return conn;
}

module.exports = {
    conn: initDB(),
    mongoose,
    dbConfig
};