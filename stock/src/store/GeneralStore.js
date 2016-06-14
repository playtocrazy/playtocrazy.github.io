var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var dateFormat = require('dateformat');
require('whatwg-fetch');

var AppDispatcher = require('../common/AppDispatcher');
var GeneralConstants = require('../constants/GeneralConstants');
var CHANGE_EVENT = 'change';

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
            page: 0,
            totalPage: 0,
            totalCount: 0
        }
    },
    background: {
        base: {},
        base500: {}
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
    var now = new Date();
    now.setDate(now.getDate()-1);
    // var fileUrl = "../../data/" + dateFormat(now, "yyyymmdd") + "_base.json";
    var fileUrl1 = "../../data/20160611_base_500.json";
    var fileUrl2 = "../../data/20160611_base.json";
    fetch(fileUrl1)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            _data.background.base500 = json;
            fetch(fileUrl2)
                .then(function(response) {
                    return response.json();
                }).then(function(json) {
                    _data.background.base = json;
                }).catch(function(ex) {
                    console.log('parsing failed', ex)
                });
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

var filterService = function (realtime_all) {
    _data.background.base500.data.forEach(function (base, i) {
        var realtime = realtime_all.msgArray.find(function (stock, j) {
            return stock.c === base.code;
        });
        base.realtime = realtime;
        _data.display.data.push(base);
    })
}

/*
var abcd1 = [
    {t: "a"},
    {t: "b"},
    {t: "c"},
    {t: "d"}
];

var abcd2 = [
    {t: "a", tab: "aaa"},
    {t: "b", tab: "bbb"},
    {t: "c", tab: "ccc"},
    {t: "d", tab: "ddd"}
];

var test = function() {
    // function isPrime(str, element) {
    //     return element.t == "a";
    // }
    //
    abcd1.forEach(function (abcd11, i) {
        var obj = abcd2.find(function (abcd21, j) {
            return abcd21.t == abcd11.t;
        });
        console.log(obj);
        abcd11.t = obj.tab;
    })
    console.log(abcd1);

    // var ffff = abcd1.find(function (e) {
    //     return e.t == this.t;
    // }, {t: "a"});
    //
    // ffff.t = "aaaa";
    //console.log(abcd1);
}

test();
*/

















module.exports = GeneralStore;
