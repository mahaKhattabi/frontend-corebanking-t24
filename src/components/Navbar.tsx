import React, { FunctionComponent, useState } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from "reactstrap";
import { useHistory, Link } from "react-router-dom";

const DefaultNavbar: FunctionComponent = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const prenom = localStorage.getItem("prenom");
  const role = localStorage.getItem("role");
  const nom = localStorage.getItem("nom");

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");

    history.push("/auth/login");
  };

  const BtnLink: FunctionComponent<{ to: string }> = (props) => {
    const getclasses = (reference: string) =>
      history.location.pathname.indexOf(reference) === 0
        ? "nav-active"
        : "nav-white";

    return (
      <Link to={props.to}>
        <Button className={getclasses(props.to)}>{props.children}</Button>
      </Link>
    );
  };

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color='light' dark expand='md'>
        {/* <NavbarBrand href='/'>Aatf</NavbarBrand> */}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <BtnLink to='/domains'>Domaines</BtnLink>
            </NavItem>
            <NavItem>
              <BtnLink to='/process'>Processus</BtnLink>
            </NavItem>
            <NavItem>
              <BtnLink to='/tables'>Tables</BtnLink>
            </NavItem>
            <NavItem>
              <BtnLink to='/reporting'>Reporting</BtnLink>
            </NavItem>
          </Nav>
          <NavbarText>Welcome! </NavbarText>
          <Nav>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {`${prenom} ${nom}`}
              </DropdownToggle>
              <DropdownMenu right>
                {/* <DropdownItem>Edit Profile</DropdownItem> */}
                {role === "admin" && (
                  <React.Fragment>
                    <DropdownItem href='/admin'>Admin</DropdownItem>
                    <DropdownItem divider />
                  </React.Fragment>
                )}
                <DropdownItem onClick={logout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default DefaultNavbar;
