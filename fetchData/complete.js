var jsonfile = require('jsonfile');

var complete = function () {
    var data = {"a": "1"};
    var file = './out/' + dateFormat(new Date(), "yyyymmdd") + '_test.json';

    jsonfile.writeFile(file, data, function(err) {
        if(err) console.error("write json data failed: " + err);
    })
}

module.exports = complete;
