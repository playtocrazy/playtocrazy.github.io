var AppDispatcher = require('../common/AppDispatcher');
var GeneralConstants = require('../constants/GeneralConstants');

var GeneralAction = {
    initial: function() {
        AppDispatcher.dispatcher({
            actionType: GeneralConstants.INITIAL
        });
    },
    switchNav: function (key) {
        AppDispatcher.dispatcher({
            actionType: GeneralConstants.SWITCH_NAV,
            key: key
        });
    }
};

module.exports = GeneralAction;
