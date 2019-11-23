import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./ButtonContainer";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/">
          <img src={logo} alt="logo" className="navbar-brand" />
        </Link>
        <ul className="navbar-nav align-item-center">
          <li className="nav-item ml-5">
            <Link to="/" className="nav-link">
              Products
            </Link>
          </li>
        </ul>
        <Link to="/card" className="ml-auto">
          <ButtonContainer>
            <span className="mr-2">
              <i className="fas fa-cart-plus" />
            </span>
            my cart
          </ButtonContainer>
        </Link>
      </NavWrapper>
    );
  }
}

export default Navbar;

const NavWrapper = styled.nav`
  background: var(--mainBlue) !important;
  .nav-link {
    color: var(--mainWhite) !important;
    text-transform: capitalize;
    font-size: 1.3rem;
  }
`;
