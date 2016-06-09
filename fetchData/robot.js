var Horseman = require('node-horseman');
var phantomjs = require('phantomjs');
var jsonfile = require('jsonfile');
var dateFormat = require('dateformat');

var _config = {
    twex: {
        type: 0
    },
    tpex: {
        type: 1
    }
}
var jsondata = [];
var now = new Date();
var file = './out/' + dateFormat(now, "yyyymmdd") + '_base.json';
var horseman = new Horseman({
    phantomPath: phantomjs.path,
    loadImages: false,
    ignoreSSLErrors: true,
    bluebirdDebug: true
});

horseman
    .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
    // start to get TWEX data
    .open('http://www.twse.com.tw/ch/trading/exchange/TWTB4U/TWTB4U.php')
    .waitForSelector('#tbl-containerx table thead tr td:nth-child(1)')
    .screenshot('./out/twex.jpg')
    .evaluate(function() {
        var twexJsonData = [];
        var codeArray = $('#tbl-containerx table thead tr').each(function(index, codeGroup) {
            var code = $(codeGroup).find('td:nth-child(1)').text().trim();
            if(code){
                var name = $(codeGroup).find('td:nth-child(2)').text().trim();
                var saleFirst = $(codeGroup).find('td:nth-child(3)').text().replace("&nbsp;", "").trim() == "Y"? false: true;
                twexJsonData.push({
                    code: code,
                    name: name,
                    saleFirst: saleFirst,
                    type: 0
                });
            }
        })
        return twexJsonData;
    })
    .then(function(twexJsonData) {
        if(twexJsonData && twexJsonData.length > 0){
            jsondata = twexJsonData;
        }else{
            throw '# Getting TWEX data failed!';
        }
    })

    // start to get TPEX data
    .openTab('http://www.tpex.org.tw/web/stock/trading/intraday_trading/intraday_trading_list.php?l=zh-tw')
    .waitForSelector('div#v_result_withnote tbody tr.odd td.text-align-center.sorting_1')
    .select('div#v_result_withnote label select', -1)
    .screenshot('./out/tpex.jpg')
    .evaluate(function() {
        var tpexJsonData = [];
        var codeArray = $('div#v_result_withnote table.rpt-table.dataTable tbody tr').each(function(index, codeGroup) {
            var code = $(codeGroup).find('td:nth-child(1)').text().trim();
            var name = $(codeGroup).find('td:nth-child(2)').text().trim();
            var saleFirst = $(codeGroup).find('td:nth-child(3)').text().replace("&nbsp;", "").trim() == "＊"? false: true;
            tpexJsonData.push({
                code: code,
                name: name,
                saleFirst: saleFirst,
                type: 1
            });
        })
        return tpexJsonData;
    })
    .then(function(tpexJsonData) {
        if (tpexJsonData && tpexJsonData.length > 0) {
            jsondata = jsondata.concat(tpexJsonData);
            jsonfile.writeFile(file, jsondata, function(err) {
                if(err) console.error("write json data failed: " + err);
            })
        } else {
            throw '# Getting TPEX data failed!';
        }
    })
    .closeTab(0)
    .close();
