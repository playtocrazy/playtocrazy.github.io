var Promise = require('promise');
var jsonfile = require('jsonfile');
var request = require("request");
// var fetchUrl = require("fetch").fetchUrl;
var each = require('each-done');

var base;
var base500 = {
    data: [],
    paging: {
        twexLength: 0,
        tpexLength: 0,
        totalCount: 0
    }
};
var allRequestUrl = [];

var complete = function(config) {
    var file = config.file;
    var file500 = config.file500;
    var minVol = config.minVol;

    var generateUrl = new Promise(function(resolve, reject) {
        jsonfile.readFile(file, function(err, jsonData) {
            if (err) {
                reject(err);
            } else {
                base = jsonData;
                resolve(jsonData);
            }
        })
    })
    generateUrl.then(function(jsonData) {
            var count = 0;
            var reqUrl = "http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=";
            var parameters = "&json=1&delay=0&_=";
            var fullUrl = reqUrl;
            each(jsonData.data, function(stock, index, done) {
                if (count == 99 || index == jsonData.data.length - 1) {
                    if(index == jsonData.data.length - 1){
                        fullUrl += (count == 0 ? "" : "|") + (stock.ex + "_" + stock.code + ".tw");
                    }
                    fullUrl = fullUrl + parameters + new Date().getTime();
                    allRequestUrl.push(fullUrl);
                    count = 0;
                    fullUrl = reqUrl;
                } else {
                    fullUrl += (count == 0 ? "" : "|") + (stock.ex + "_" + stock.code + ".tw");
                    count++;
                }
                done();
            }, function(error) {
                console.log("# Generating url finished!");
                console.log("# Start to append info, totalcount: " + allRequestUrl.length);
                fetchDataByUrl(allRequestUrl[0], request);
            });
        })
        .catch(function(err) {
            throw err;
        })

    var processCount = 0;
    var fetchDataByUrl = function(url, request) {
        var requestOptions = {
            url: 'http://mis.twse.com.tw/stock/index.jsp',
            headers: {
                'User-Agent': 'request',
                'Accept-Language': 'zh-TW'
            }
        };
        var request = request.defaults({jar: true});
        var fetchData = new Promise(function (resolve, reject) {
            request(requestOptions, function() {
                request(url, function(error, response, body) {
                    if (response.statusCode == 200) {
                        var jsonResult = JSON.parse(body.toString());
                        each(jsonResult.msgArray, function(_stock, j, _done) {
                            each(base.data, function(stock, k, done) {
                                if (_stock.c == stock.code) {
                                    var lastVol = parseInt(_stock.v) + parseInt(_stock.fv);
                                    stock.lastVol = lastVol;
                                    stock.exInfo = _stock;
                                    
                                    if(lastVol >= minVol){ // build another array for volumn more than 500
                                        base500.data.push(stock);
                                        if(_stock.ex === "tse") base500.paging.twexLength += 1;
                                        if(_stock.ex === "otc") base500.paging.tpexLength += 1;
                                        base500.paging.totalCount += 1;
                                    }
                                    _done();
                                }
                            });
                        }, function(error) {
                            processCount++;
                            console.log("# Appending info, count: " + processCount + " ...");
                            resolve(request);
                        });
                    }
                });
            });
        })
        fetchData.then(function (request) {
            if(allRequestUrl.length > processCount){
                fetchDataByUrl(allRequestUrl[processCount], request);
            }else{
                console.log("# Appending Info All Success!");
                jsonfile.writeFile(file, base, function(err) {
                    if (err) console.error("write json data failed: " + err);
                })
                jsonfile.writeFile(file500, base500, function(err) {
                    if (err) console.error("write json data failed: " + err);
                })
            }
        })


    }

}




module.exports = complete;
