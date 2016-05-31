var phantom = require('phantom');
var jsonfile = require('jsonfile');
var file = './out/pureList.json';
var jqueryPath = './js/jquery-2.2.4.min.js';
phantom.create(['--ignore-ssl-errors=yes', '--load-images=no']).then(function(ph) {
    ph.createPage().then(function(page) {
        page.open('http://www.twse.com.tw/ch/trading/exchange/TWTB4U/TWTB4U.php', function(status) {
            console.log("Status: " + status);
            if(status === "success") {
                page.render('screenshot.png');
                page.includeJs("js/jquery-2.2.4.min.js", function() {
                    page.evaluate(function() {
                        var data = [];
                        var numbers = $("#tbl-containerx").find("td:nth-child(1)").text();
                        $.each(numbers, function (index, number) {
                            data.push({ch: number});
                        })
                        jsonfile.writeFile(file, data, function (err) {
                            console.error(err)
                        })
                    });
                    phantom.exit()
                });
            }
            ph.exit();
        });
    });
});

// var sitepage = null;
// var phInstance = null;
// phantom.create(['--ignore-ssl-errors=yes', '--load-images=no'])
//     .then(instance => {
//         phInstance = instance;
//         return instance.createPage();
//     })
//     .then(page => {
//         sitepage = page;
//         page.onError = function (msg, trace) {
//             console.log(msg);
//             trace.forEach(function(item) {
//                 console.log('  ', item.file, ':', item.line);
//             });
//         };
//         page.onResourceRequested = function (request) {
//             console.log('Request ' + JSON.stringify(request, undefined, 4));
//         };
//         return page.open('http://www.twse.com.tw/ch/trading/exchange/TWTB4U/TWTB4U.php');
//     })
//     .then(status => {
//         console.log(status);
//         var numbers;
//         sitepage.render('test.png');
//         sitepage.includeJs(jqueryPath, function() {
//             var test = sitepage.evaluate(function() {
//                 return $("#tbl-containerx").length > 0;
//
//             //     sitepage.render('test1.png');
//             //     var data = [];
//             //     numbers = $("#tbl-containerx").find("td:nth-child(1)").text();
//             //     $.each(numbers, function (index, number) {
//             //         data.push({ch: number});
//             //     })
//             //     jsonfile.writeFile(file, data, function (err) {
//             //         console.error(err)
//             //     })
//             });
//             console.log(test);
//         });
//         return numbers;
//
//         console.log("finish!");
//         sitepage.close();
//         phInstance.exit();
//
//     });
