var phantom = require('node-phantom');
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

phantom.create(function(ph) {
  return ph.createPage(function(page) {
    return page.open("http://www.google.com", function(status) {
      console.log("opened google? ", status);
      return page.evaluate((function() {
        return document.title;
      }), function(result) {
        console.log('Page title is ' + result);
        return ph.exit();
      });
    });
  });
},{parameters:{'ignore-ssl-errors': true, 'web-security': false}});
