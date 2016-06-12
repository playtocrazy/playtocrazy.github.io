var React = require('react');
var PropTypes = React.PropTypes;

var Table = require('react-bootstrap').Table;
var Glyphicon = require('react-bootstrap').Glyphicon;
var PanelGroup = require('react-bootstrap').PanelGroup;
var Panel = require('react-bootstrap').Panel;

var Row = require('./Row.react');

var Content = React.createClass({
    render: function() {
        var PanelModule = this.props.display.data.map(function (src, i) {
            var header = src.code + " " + src.name + " ▲ " + src.realtime.z + " / " + src.change + " / " + src.rate + " / " + src.realtime.v;
            return <Panel header={header} eventKey="1"><Row data={src} /></Panel>;
        })
        return (
            <PanelGroup accordion>
                {PanelModule}
            </PanelGroup>
        );
    }
});

module.exports = Content;
