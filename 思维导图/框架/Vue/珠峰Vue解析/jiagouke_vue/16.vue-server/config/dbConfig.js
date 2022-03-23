let mongoose = require('mongoose');
let config  = require('./index');

mongoose.connect(config.mongo,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

module.exports =  mongoose;