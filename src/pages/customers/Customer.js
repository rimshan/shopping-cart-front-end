import React from "react";
import { Link } from "react-router-dom";

import Statistics from "./Statistics";
import CustomerTable from "./CustomerTable";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Button,
  Col,
  CustomInput,
  Form,
  FormGroup,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row,
  Table
} from "reactstrap";

import moment from "moment";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

class Customer extends React.Component {
  state = {
    startDate: "st",
    endDate: ""
  };

  setStartDate = date => {
    this.setState({
      startDate: date
    });
  };

  setEndDate = date => {
    this.setState({
      endDate: date
    });
  };
  render() {
    return (
      <Container fluid className="p-0">
        <Row className=" float-right pull-right ">
          <FormGroup className="mr-4 mb-0">
            <Input
              type="text"
              className="mr-4 mb-0"
              placeholder="Start Date   |    End Date"
            />
          </FormGroup>

          {/* <DatePickerInput
            value={this.state.startDate}
            className="mr-2 mb-0"
            onChange={this.setStartDate}
          />
          <DatePickerInput
            placeholder={this.state.startDate}
            value={this.state.endDate}
            className="mr-2 mb-0"
            onChange={this.setEndDate}
          /> */}
          {/* <DatePicker
            className="mr-2 mb-0"
            selected={this.state.startDate}
            placeholderText="Start Date"
            onChange={date => this.setStartDate(date)}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
          />
          <DatePicker
            className="mr-3 mb-0"
            selected={this.state.endDate}
            placeholderText="End Date"
            onChange={date => this.setEndDate(date)}
            selectsEnd
            endDate={this.state.endDate}
            minDate={this.state.startDate}
          /> */}

          <UncontrolledButtonDropdown className="mr-3 mb-0">
            <DropdownToggle caret outline color="secondary">
              Branch{" "}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>

          <UncontrolledButtonDropdown className="mr-3">
            <DropdownToggle caret outline color="secondary">
              Export{" "}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Another Action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>

          <Button
            tag={Link}
            to="/add-customer"
            className="mr-3 "
            color="primary"
          >
            Add New Customer
          </Button>
        </Row>
        <h1 className="pt-1 h3 mb-3">Customers</h1>

        <CustomerTable />
      </Container>
    );
  }
}

export default Customer;
