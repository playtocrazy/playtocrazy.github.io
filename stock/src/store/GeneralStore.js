var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var dateFormat = require('dateformat');

var AppDispatcher = require('../common/AppDispatcher');
var GeneralConstants = require('../constants/GeneralConstants');
var CHANGE_EVENT = 'change';

var now = new Date();
now.setDate(now.getDate()-1);
// var base = require("../../../fetchData/out/" + dateFormat(now, "yyyymmdd") + "_base.json");
// var base500 = require("../../../fetchData/out/" + dateFormat(now, "yyyymmdd") + "_base_500.json");

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
    }
};

var GeneralStore = assign({}, EventEmitter.prototype, {
    getDisplay: function() {
        return _data.display;
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
    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        switch (action.actionType) {
            case GeneralConstants.INITIAL:
                initial();
                fetchData();
                GeneralStore.emitChange();
                break;
        }
        return true;
    })
});

// load base data
var initial = function () {
    // _data.background.base = base;
    // _data.background.base500 = base500;
}

var fetchData = function () {
    var sample = {
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
	};
    var change = Number(sample.realtime.z.trim()) - Number(sample.realtime.y.trim());
    var rate = (change / Number(sample.realtime.y.trim()) * 100).toFixed(2);
    sample.change = (change > 0? "+": "") + change;
    sample.rate = (rate > 0? "+": "") + rate + "%";
    _data.display.data.push(sample);
}

module.exports = GeneralStore;
