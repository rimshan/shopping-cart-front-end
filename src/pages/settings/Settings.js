import React from "react";
import AccountSettings from "./AccountSettings";
import CompanySettings from "./CompanySettings";
import BrandSettings from "./BrandSettings";
import CategoriesSettings from "./CategoriesSettings";
import ManufacturerSettings from "./ManufacturerSettings";
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";

const Navigation = props => (
  <Card>
    <ListGroup flush>
      <ListGroupItem
        tag="a"
        href="#"
        action
        active={props.state.view === "account" ? true : false}
        onClick={() => props.onNavigationClick("account")}
      >
        Account
      </ListGroupItem>
      {/* <ListGroupItem
        tag="a"
        href="#"
        action
        active={props.state.view === "company" ? true : false}
        onClick={() => props.onNavigationClick("company")}
      >
        Company
      </ListGroupItem> */}
      <ListGroupItem
        tag="a"
        href="#"
        active={props.state.view === "categories" ? true : false}
        action
        onClick={() => props.onNavigationClick("categories")}
      >
        Categoires
      </ListGroupItem>
      <ListGroupItem
        tag="a"
        href="#"
        active={props.state.view === "manufacturer" ? true : false}
        action
        onClick={() => props.onNavigationClick("manufacturer")}
      >
        Manufacturers
      </ListGroupItem>
      <ListGroupItem
        tag="a"
        href="#"
        active={props.state.view === "brand" ? true : false}
        action
        onClick={() => props.onNavigationClick("brand")}
      >
        Brands
      </ListGroupItem>
    </ListGroup>
  </Card>
);

class Settings extends React.Component {
  state = {
    view: "account"
  };

  onNavigationClick = field => {
    const newState = { ...this.state };

    //newState.active[field] = true;
    newState.view = field;

    this.setState(newState);
  };
  render() {
    return (
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Settings</h1>

        <Row>
          <Col md="3" xl="2">
            <Navigation
              onNavigationClick={this.onNavigationClick}
              state={this.state}
            />
          </Col>
          <Col md="9" xl="10">
            {this.state.view === "account" && <AccountSettings />}
            {this.state.view === "company" && <CompanySettings />}
            {this.state.view === "categories" && <CategoriesSettings />}
            {this.state.view === "manufacturer" && <ManufacturerSettings />}
            {this.state.view === "brand" && <BrandSettings />}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Settings;
