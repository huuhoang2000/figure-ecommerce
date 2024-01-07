import { Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, Navbar, NavbarBrand} from "reactstrap"
import { NavLink } from "react-router-dom";
import { login, logout } from '../store/slices/login.slice'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from "react-scroll";
import { useAppSelector } from "../store/hooks";
import { useDispatch } from "react-redux";

const HeaderLayout = ( {children} ) => {
    //drop down button
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    // login state
    // get username from token once login is complete.
    const username = localStorage.getItem('username');
    
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const dispatch = useDispatch();

    // Call this function when the user logs out
    const handleLogout = () => {
      dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    };

    // Call this function when the user logs in
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(login());
      }
    }, [dispatch]);

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
                <NavLink to="/admin/products/product-list" className="navbarlink">Shop</NavLink>
              </NavItem>
              <NavItem className="pe-1 ps-1 navItem">
                <NavLink to="/admin/carts/cart-list" className="navbarlink">Cart</NavLink>
              </NavItem>
              {isLoggedIn || username ? (
                <NavItem className="pe-1 ps-1 navItem">
                  <NavLink className="link-deco">Welcome, {username}</NavLink>
                </NavItem>
              ) : null}
              <Dropdown className="pe-1 ps-1 navItem" nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret>
                  Menu
                </DropdownToggle>
                <DropdownMenu>
                  <Link to="contactUs" smooth={true} duration={50}>
                    <DropdownItem>Contact</DropdownItem>
                  </Link>
        
                   {isLoggedIn || username ? (
                    <>
                      <DropdownItem onClick={handleLogout}>Logout</DropdownItem>                    </>
                   ) : (
                    <>
                      <DropdownItem href="/admin/admin-login">Login</DropdownItem>
                      <DropdownItem href="/admin/user/user-register">Sign Up</DropdownItem>
                    </>
                   )}

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
