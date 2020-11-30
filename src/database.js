const mongoose = require('mongoose');
const URI =  'mongodb://localhost/mern-stack-task';

mongoose.connect(URI, { useNewUrlParser: true })
    .then(db => console.log('DATABASE IS CONNECTED'))
    .catch(err => console.error(err));


    module.exports =mongoose;