var Promise = require('promise');
var dateFormat = require('dateformat');

var arg = process.argv[2];
var crawl = require('./crawl');
var complete = require('./complete');

var config = {
    file: '../../stock/data/' + dateFormat(new Date(), "yyyymmdd") + '_base.json',
    file500: '../../stock/data/' + dateFormat(new Date(), "yyyymmdd") + '_base_500.json',
    minVol: 500
}

var robot = new Promise(function(resolve, reject) {
    if(arg == 0){
        resolve("# Doing complete data directly!");
    }else{
        crawl(config.file, resolve, reject);
    }
});
robot.then(function(result) {
    console.log(result);
    complete(config);
}).catch(function(e) {
    console.log(e);
});
