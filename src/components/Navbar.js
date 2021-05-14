import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { authActions } from "../redux/actions/authActions";
import { toggleSidebar } from "../redux/actions/sidebarActions";

import {
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input
} from "reactstrap";

import {
  Settings,
} from "react-feather";

import avatar1 from "../assets/img/avatars/avatar.jpg";

class NavbarComponent extends React.Component  {

  signOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    this.props.logout();
    this.props.history.push("/auth/sign-in");
  };

  render(){
    const dispatch = this.props.dispatch;
    return (
      <Navbar color="white" light expand>
        <span
          className="sidebar-toggle d-flex mr-2"
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          <i className="hamburger align-self-center" />
        </span>
  
        <Form inline>
          <Input
            type="text"
            placeholder="Search projects..."
            aria-label="Search"
            className="form-control-no-border mr-sm-2"
          />
        </Form>
  
        <Collapse navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <span className="d-inline-block d-sm-none">
                <DropdownToggle nav caret>
                  <Settings size={18} className="align-middle" />
                </DropdownToggle>
              </span>
              <span className="d-none d-sm-inline-block">
                <DropdownToggle nav caret>
                  <img
                    src={avatar1}
                    className="avatar img-fluid rounded-circle mr-1"
                    alt="Chris Wood"
                  />
                  <span className="text-dark">{localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).lastName}</span>
                </DropdownToggle>
              </span>
              <DropdownMenu right>
                <DropdownItem onClick={this.signOut.bind(this)}>Sign out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
  
};

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  logout: authActions.logout,
  dispatch: toggleSidebar,
};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(NavbarComponent)
);

