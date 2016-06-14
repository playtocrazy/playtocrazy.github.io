var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var dateFormat = require('dateformat');
var Cookies = require('js-cookie');
require('whatwg-fetch');

var AppDispatcher = require('../common/AppDispatcher');
var GeneralConstants = require('../constants/GeneralConstants');
var CHANGE_EVENT = 'change';

var now = new Date();
var today = dateFormat(now, "yyyyMMdd");

/*
display: {
    data: [{
        code: "",
        name: "",
        change: "",
        rate: "",
        realtime: {}
    }],
    paging: {
        limit: 0,
        page: 0,
        totalPage: 0,
        totalCount: 0
    }
},
*/

var _data = {
    display: {
        data: [],
        paging: {
            limit: 0,
            page: 1,
            totalPage: 1,
            totalCount: 0,
            tempCount: 0
        },
        filter: {
            volMultiple: 0.33,
            lastVol: 500
        }
    },
    background: {
        base: {},
        base500: {},
        requestStockCode: [],
        filter: {
            risePercentage: 0.3
        }
    },
    navKey: 0
};

var GeneralStore = assign({}, EventEmitter.prototype, {
    getDisplay: function() {
        return _data.display;
    },
    getNavKey: function () {
        return _data.navKey;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherIndex: AppDispatcher.register(function(action) {
        switch (action.actionType) {
            case GeneralConstants.INITIAL:
                initial();
                console.log(_data.background);
                fetchData();
                GeneralStore.emitChange();
                break;
            case GeneralConstants.SWITCH_NAV:
                _data.navKey = action.key;
                GeneralStore.emitChange();
                break;
        }
        return true;
    })
});

var isTradingTime = function (workday) {
    var tradingDay = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    var currentTime = dateFormat(new Date(), "ddd,HH").split(",");
    var dayOfWeek = currentTime[0];
    var hours = Number(currentTime[1]);
    if(hours >= 9 && hours <= 13 && (tradingDay.indexOf(dayOfWeek) > -1 || workday)){
        return true;
    }else{
        return false;
    }
}

// load base data
var initial = function() {
    now.setDate(now.getDate()-1);
    // var fileUrl = "../../data/" + dateFormat(now, "yyyymmdd") + "_base.json";
    var fileUrl1 = "./data/20160611_base_500.json";
    fetch(fileUrl1)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            _data.background.base500 = json;
            //genRequestStockCodeService();
            testGet();
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
}

var fetchData = function () {
    var samples = [
        {
            "code": "3293",
    		"ex": "otc",
    		"name": "鈊象",
    		"saleFirst": true,
    		"type": 1,
    		"lastVol": 961,
    		"realtime": {
    			"ts": "0",
    			"fv": "2",
    			"tk0": "3293.tw_otc_20160608_B_9999733323",
    			"tk1": "3293.tw_otc_20160608_B_9999722518",
    			"oa": "292.50",
    			"ob": "290.50",
    			"tlong": "1465367400000",
    			"ot": "14:30:00",
    			"f": "3_17_9_43_10_",
    			"ex": "otc",
    			"g": "9_8_4_10_7_",
    			"ov": "1410",
    			"d": "20160608",
    			"it": "12",
    			"b": "290.00_289.00_288.50_288.00_287.50_",
    			"c": "3293",
    			"mt": "000000",
    			"a": "290.50_291.00_291.50_292.00_292.50_",
    			"n": "鈊象",
    			"o": "292.50",
    			"l": "286.00",
    			"oz": "290.50",
    			"h": "292.50",
    			"ip": "0",
    			"i": "32",
    			"w": "259.50",
    			"v": "959",
    			"u": "316.50",
    			"t": "13:30:00",
    			"s": "139",
    			"pz": "290.50",
    			"tv": "139",
    			"p": "0",
    			"nf": "鈊象電子股份有限公司",
    			"ch": "3293.tw",
    			"z": "290.50",
    			"y": "288.00",
    			"ps": "138"
    		}
        },
        {
            "code": "3293",
    		"ex": "otc",
    		"name": "鈊象",
    		"saleFirst": true,
    		"type": 1,
    		"lastVol": 961,
    		"realtime": {
    			"ts": "0",
    			"fv": "2",
    			"tk0": "3293.tw_otc_20160608_B_9999733323",
    			"tk1": "3293.tw_otc_20160608_B_9999722518",
    			"oa": "292.50",
    			"ob": "290.50",
    			"tlong": "1465367400000",
    			"ot": "14:30:00",
    			"f": "3_17_9_43_10_",
    			"ex": "otc",
    			"g": "9_8_4_10_7_",
    			"ov": "1410",
    			"d": "20160608",
    			"it": "12",
    			"b": "290.00_289.00_288.50_288.00_287.50_",
    			"c": "3293",
    			"mt": "000000",
    			"a": "290.50_291.00_291.50_292.00_292.50_",
    			"n": "鈊象",
    			"o": "292.50",
    			"l": "286.00",
    			"oz": "290.50",
    			"h": "292.50",
    			"ip": "0",
    			"i": "32",
    			"w": "259.50",
    			"v": "959",
    			"u": "316.50",
    			"t": "13:30:00",
    			"s": "139",
    			"pz": "290.50",
    			"tv": "139",
    			"p": "0",
    			"nf": "鈊象電子股份有限公司",
    			"ch": "3293.tw",
    			"z": "279.50",
    			"y": "288.00",
    			"ps": "138"
    		}
        }
    ];
    $.each(samples, function (i, sample) {
        var change = Number(sample.realtime.z.trim()) - Number(sample.realtime.y.trim());
        var rate = Number((change / Number(sample.realtime.y.trim()) * 100).toFixed(2));
        sample.change = change;
        sample.rate = rate;
        _data.display.data.push(sample);
    })
}

var genRequestStockCodeService = function () {
    var url = cookieService.get();
    if(url){
        fetch(url)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                _data.background.requestStockCode = json;
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            });
            console.log(_data.background.requestStockCode);
    }else{
        _data.background.base500.data.forEach(function (base, i) {
            _data.background.requestStockCode.push(base.code);
        })
        cookieService.clear();
        textUploaderService(_data.background.requestStockCode);
    }
}

var updateService = function (realtime_all) {
    realtime_all.msgArray.forEach(function (realtime, i) {
        var stock = _data.background.base500.data.find(function (_base, j) {
            return realtime.c === _base.code;
        });
        stock.realtime = realtime;
        if(filterService(stock)){
            _data.display.data.push(stock);
            pagingService();
        }
    })
}

var filterService = function (stock) {
    var result = false;
    if(Number(stock.realtime.v) >= parseInt(stock.lastVol * _data.display.filter.volMultiple)){
        result = true;
    }else{
        result = false;
    }
    if(stock.lastVol >= _data.display.filter.lastVol){
        result = true;
    }else{
        result = false;
    }
    return result;
}

var pagingService = function () {
    _data.display.paging.totalCount++;
    _data.display.paging.tempCount++;
    if(_data.display.paging.tempCount > _data.display.paging.limit){
        _data.display.paging.totalPage++;
        _data.display.paging.tempCount = 0;
    }
}

var cookieService = {
    cookieName: "RequestStockCodeUrl_" + today,
    get: function () {
        return Cookies.get(this.cookieName);
    },
    save: function (data) {
        Cookies.set(this.cookieName, data, { expires: 1, path: '/' });
    },
    clear: function () {
        Cookies.remove(this.cookieName);

    }
}

var textUploaderService = function(requestStockCode) {
    var reqHeaders = new Headers();
        reqHeaders.append("Accept", "application/json");
        reqHeaders.append("Content-Type", "application/json");
        reqHeaders.append("X-TextUploader-API-Key", "NrpI8M2IVK3v6hBapfP0W4EDg+z0vptv");
    // var headers = new Headers({
    //     "Accept": "application/json",
    //     "Content-Type": "application/json",
    //     "X-TextUploader-API-Key": "NrpI8M2IVK3v6hBapfP0W4EDg+z0vptv"
    // });
    var body = {
        title: "RequestStockCode_" + today,
        content: requestStockCode,
        type: "unlisted"
    }
    fetch('http://api.textuploader.com/v1/posts', {
        method: 'POST',
        headers: reqHeaders,
        body: JSON.stringify(body),
        mode: 'no-cors'
    })
    .then(function(response) {
        return response.json();
    }).then(function(json) {
        cookieService.save(json.results.rawurl);
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    });

    // var request = $.ajax({
    //     url: "http://api.textuploader.com/v1/posts",
    //     headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json",
    //         "X-TextUploader-API-Key": "NrpI8M2IVK3v6hBapfP0W4EDg+z0vptv",
    //         "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    //         "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept"
    //     },
    //     crossDomain: true,
    //     contentType: 'application/json',
    //     method: "POST",
    //     data: JSON.stringify(body),
    //     dataType: "json"
    // });
    // request.done(function(msg) {
    //     $("#log").html(msg);
    // });
    // request.fail(function(jqXHR, textStatus) {
    //     alert("Request failed: " + textStatus);
    // });
}

var testGet = function () {
    fetch('http://mis.twse.com.tw/stock/index.jsp', {
        mode: 'no-cors',
        credentials: 'include'
    })
    .then(function(response) {
        console.log(response);
        fetch('http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_2330.tw|otc_3293.tw&json=1&delay=0&_=1435210928008', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            mode: 'no-cors',
            credentials: 'include',
            referrer: "no-referrer",
            referrerPolicy: "origin-when-cross-origin"
        })
        .then(function(rsp) {
            console.log(rsp);
            return rsp.text();
        }).then(function(text) {
            console.log(JSON.parse(text));
        }).catch(function(ex) {
            console.log('parsing failed', ex)
        });
    }).catch(function(ex) {
        console.log('parsing failed', ex)
    });
}














module.exports = GeneralStore;
