var React = require('react');
var PropTypes = React.PropTypes;

var Table = require('react-bootstrap').Table;
var Glyphicon = require('react-bootstrap').Glyphicon;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Panel = require('react-bootstrap').Panel;

var Row = require('./Row.react');

var Content = React.createClass({
    render: function() {
        var self = this;
        var PanelModule = this.props.display.data.map(function (src, i) {
            var symbol = self.props.navKey == 0? " ▲ ": " ▽ ";
            var change = src.change > 0? "+" + src.change: src.change;
            var rate = (src.rate > 0? "+" + src.rate: src.rate) + "%";
            var header = src.code + " " + src.name + symbol + src.realtime.z + " / " + change + " / " + rate + " / " + src.realtime.v;
            if(self.props.navKey == 0 && src.change > 0){
                return <Panel header={header} eventKey={i} key={i} bsStyle="danger"><Row data={src} /></Panel>;
            }else if(self.props.navKey == 1 && src.change < 0){
                return <Panel header={header} eventKey={i} key={i} bsStyle="success"><Row data={src} /></Panel>;
            }
        })
        return (
            <PanelGroup accordion>
                {PanelModule}
            </PanelGroup>
        );
    }
});

module.exports = Content;
