import { Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, Navbar, NavbarBrand} from "reactstrap"
import { NavLink } from "react-router-dom";
import { useState } from 'react'
import { Link } from "react-scroll";
import PropTypes from 'prop-types';


const HeaderLayout = ( {children} ) => {
    //drop down button
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <div>
      <Navbar color="light" light expand="md">
          <Container fluid className=" d-flex justify-content-between">
            <NavbarBrand>HCMax</NavbarBrand>
            <Nav navbar className="navbar d-flex flex-row">
              <NavItem className="pe-1 ps-1 navItem">
                <NavLink to="/mainpage" className="navbarlink">Home</NavLink>
              </NavItem>
              <NavItem className="pe-1 ps-1 navItem">
                <NavLink to="/admi/products/product-list" className="navbarlink">Shop</NavLink>
              </NavItem>
              <NavItem className="pe-1 ps-1 navItem">
                <NavLink href="#" className="navbarlink">Cart</NavLink>
              </NavItem>
              <Dropdown className="pe-1 ps-1 navItem" nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret>
                  Menu
                </DropdownToggle>
                <DropdownMenu>
                  <Link to="contactUs" smooth={true} duration={50}>
                    <DropdownItem>Contact</DropdownItem>
                  </Link>
                  <DropdownItem href="/admin/user/user-login">Login</DropdownItem>
                  <DropdownItem href="/admin/user/user-register">Sign Up</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </Container>
        </Navbar>
        {children}
    </div>
  )
}

HeaderLayout.propTypes = {
  children: PropTypes.node,
};

export default HeaderLayout;
