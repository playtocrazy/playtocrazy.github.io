var phantom = require('phantom');

// phantom.create(function(err, ph) {
//     console.log(ph);
//     return ph.createPage(function(err, page) {
//         return page.open("http://www.twse.com.tw/ch/trading/exchange/TWTB4U/TWTB4U.php", function(err, status) {
//             console.log("opened site? ", status);
//             page.render('screenshot.png');
//             page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function(err) {
//
//                 //jQuery Loaded.
//                 //Wait for a bit for AJAX content to load on the page. Here, we are waiting 5 seconds.
//                 setTimeout(function() {
//                     return page.evaluate(function() {
//                         var res = $("#tbl-containerx").length > 0;
//                         console.log(res);
//
//                         return {};
//                     }, function(err, result) {
//                         console.log(result);
//                         ph.exit();
//                     });
//                 }, 5000);
//             });
//         });
//     });
// },{parameters:{'ignore-ssl-errors': true, 'web-security': false}});

phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        page.open('http://www.twse.com.tw/ch/trading/exchange/TWTB4U/TWTB4U.php').then(function(status) {
            console.log(status);
            page.property('content').then(function(content) {
                console.log(content);
                page.close();
                ph.exit();
            });
        });
    });
});
