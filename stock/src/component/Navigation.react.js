var React = require('react');
var PropTypes = React.PropTypes;
var Navbar = require('react-bootstrap').Navbar;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;

var text = require('./text/text.json');

var Navigation = React.createClass({
    render: function() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#"><Glyphicon glyph="flash" />{text.navBar.brand}<span style={{"verticalAlign": "super", "fontSize": "8pt"}}>{" beta"}</span></a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#"><Glyphicon glyph="upload" />{text.navBar.rise}</NavItem>
                        <NavItem eventKey={2} href="#"><Glyphicon glyph="download" />{text.navBar.fall}</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
});

module.exports = Navigation;
