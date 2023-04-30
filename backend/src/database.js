const mongoose = require('mongoose');
const URI = process.env.MONGO_URL
    ? process.env.MONGO_URL
    : 'mongodb://localhost/mernstack';
mongoose.connect(URI, {

});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB is connected');
});
