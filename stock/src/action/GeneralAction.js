var AppDispatcher = require('../common/AppDispatcher');
var GeneralConstants = require('../constants/GeneralConstants');

var GeneralAction = {
    initial: function() {
        AppDispatcher.dispatcher({
            actionType: GeneralConstants.INITIAL
        });
    }
};

module.exports = GeneralAction;
