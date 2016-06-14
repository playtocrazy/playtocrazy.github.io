var AppDispatcher = require('../common/AppDispatcher');
var GeneralConstants = require('../constants/GeneralConstants');

var GeneralAction = {
    initial: function() {
        AppDispatcher.dispatch({
            actionType: GeneralConstants.INITIAL
        });
    },
    switchNav: function (key) {
        AppDispatcher.dispatch({
            actionType: GeneralConstants.SWITCH_NAV,
            key: key
        });
    }
};

module.exports = GeneralAction;
