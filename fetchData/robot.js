var crawl = require('./crawl');
var complete = require('./complete');

var robot = new Promise(function(resolve, reject) {
    var result = crawl();
    console.log(result);
    if(result){
        resolve(result);
    }
    return
});
robot.then(function(result) {
    console.log(result);
    complete();
});
