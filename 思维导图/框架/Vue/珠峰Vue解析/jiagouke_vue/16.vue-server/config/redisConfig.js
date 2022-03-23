const redis = require('redis');
const {promisify} = require('util')
let config = require('./index');

const client = redis.createClient({
    host: config.redis.hostname,
    port: config.redis.port,
    password:'zfjg'
});

const setValue = (key, value, time) => {
    if (typeof time !== 'undefined') {
        client.set(key, value, 'EX', time)
    } else {
        client.set(key, value)
    }
}
const getValue = key=>{
    return new Promise((resolve,reject)=>{
        client.get(key,(err,data)=>{
            resolve(data)
        })
    })
}
module.exports = {
    getValue,
    setValue
}