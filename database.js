const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1/sena-api';

mongoose.connect(URI)
    .then(db => console.log('DB is connected to', db.connection.host))
    .catch(err => console.error(err));

module.exports = mongoose;
