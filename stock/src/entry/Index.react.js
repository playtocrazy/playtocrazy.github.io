var React = require('react');
var PropTypes = React.PropTypes;
var ReactDOM = require('react-dom');

var GeneralAction = require('../action/GeneralAction');
var GeneralStore = require('../store/GeneralStore');
var Navigation = require('../component/Navigation.react');
var Content = require('../component/Content.react');

var Index = React.createClass({
    getInitialState: function() {
        return {
            display: GeneralStore.getDisplay()
        };
    },
    componentWillMount: function() {
        GeneralAction.initial();
    },
    componentDidMount: function() {
        GeneralStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        GeneralStore.removeChangeListener(this._onChange);
    },
    _onChange: function () {
        this.setState({
            display : GeneralStore.getDisplay()
        });
    },
    render: function() {
        console.log(this.state.display);
        return (
            <div>
                <Navigation />
                <Content display={this.state.display} />
            </div>
        );
    }

});

var mountNode = document.getElementById("react-root");
ReactDOM.render(<Index />, mountNode);
