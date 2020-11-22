import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function NavbarItem(props) {
  return (
    <Link className="navbar-item is-capitalized" to={`/${props.link}`}>
      {props.page}
    </Link>
  );
}
function NavbarBurger(props) {
  return (
    <button
      onClick={props.toggleMenu}
      className={`button navbar-burger ${props.active ? "is-active" : ""}`}
    >
      <span />
      <span />
      <span />
    </button>
  );
}

class Navbar extends Component {
  state = {
    activeMenu: false,
  };

  toggleMenu = () => {
    this.setState({
      activeMenu: !this.state.activeMenu,
    });
  };
  render() {
    let navbarItems = this.props.pages.map((page) => (
      <NavbarItem page={page.page} key={page.page} link={page.link} />
    ));
    return (
      <nav className={`navbar is-fixed-top`}>
        <div className="navbar-brand">
          <NavbarItem page="logo" link="" />
          <NavbarBurger
            active={this.state.activeMenu}
            toggleMenu={this.toggleMenu}
          />
        </div>
        <div
          className={`navbar-menu ${this.state.activeMenu ? "is-active" : ""}`}
        >
          <div className="navbar-start">{navbarItems}</div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  pages: PropTypes.array.isRequired,
  color: PropTypes.string,
};

export default Navbar;
