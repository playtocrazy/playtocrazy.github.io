var React = require('react');
var PropTypes = React.PropTypes;
var Table = require('react-bootstrap').Table;

var text = require('./text/text.json');

var Row = React.createClass({
    componentDidMount: function() {
        $(".panel-body").css("padding", "0px");
        $(".table-responsive").css("margin-bottom", "0px");
        $(".table.table-striped.table-bordered.table-condensed").css("margin-bottom", "0px");
    },
    render: function() {
        var data = this.props.data;
        var realtime = data.realtime;
        return (
            <Table striped bordered condensed responsive>
                <thead>
                    <tr>
                        <th>{text.row.price}</th>
                        <th>{text.row.change}</th>
                        <th>{text.row.rate}</th>
                        <th>{text.row.volumn}</th>
                        <th>{text.row.lastPrice}</th>
                        <th>{text.row.lastVolumn}</th>
                        <th>{text.row.open}</th>
                        <th>{text.row.high}</th>
                        <th>{text.row.low}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{realtime.z}</td>
                        <td>{data.change > 0? ("+" + data.change): data.change}</td>
                        <td>{(data.rate > 0? ("+" + data.rate): data.rate) + "%"}</td>
                        <td>{realtime.v}</td>
                        <td>{realtime.y}</td>
                        <td>{data.lastVol}</td>
                        <td>{realtime.o}</td>
                        <td>{realtime.h}</td>
                        <td>{realtime.l}</td>
                    </tr>
                </tbody>
            </Table>
        );
    }

});

module.exports = Row;
