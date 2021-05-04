import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  CustomInput,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row
} from "reactstrap";

import Select from "react-select";
import moment from "moment";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import jQuery from "jquery";
const $ = jQuery;
window.jQuery = jQuery;

require("smartwizard/dist/js/jquery.smartWizard.min.js");

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const gender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" }
];

const handleChange = () => {};

class WizardVariant extends React.Component {
  state = {
    Date: new Date(),
    NIC_Passport_issue_date: new Date(),
    DOB: new Date(),
    MC_Date: new Date()
  };

  setDate = date => {
    this.setState({
      Date: date
    });
  };

  setDOB = date => {
    this.setState({
      DOB: date
    });
  };

  setMcDate = date => {
    this.setState({
      MC_Date: date
    });
  };

  setNicPassportDate = date => {
    this.setState({
      NIC_Passport_issue_date: date
    });
  };
  componentDidMount() {
    $(this.refs.smartwizard)
      .smartWizard({
        theme: this.props.variant, // default OR arrows
        showStepURLhash: false,
        toolbarSettings: {
          toolbarExtraButtons: [
            $(
              '<button class="btn btn-submit btn-primary" type="button">Save Customer</button>'
            )
          ]
        }
      })
      .on("leaveStep", function(e, anchorObject, stepNumber, stepDirection) {
        if (stepDirection === "forward") {
          // Validation between steps
        }
        return true;
      });

    $(this.refs.smartwizard)
      .find(".btn-submit")
      .on("click", function() {
        alert("Great! The form is ready to submit.");
        // Final validation

        return false;
      });
  }
  render = () => {
    const { color } = this.props;

    return (
      <div ref="smartwizard" className={`wizard wizard-${color} mb-4`}>
        <ul>
          <li>
            <a href={`#step-1`}>
              Overview
              <br />
              <small>Branch and Liesence Type</small>
            </a>
          </li>
          <li>
            <a href={`#step-2`}>
              Customer
              <br />
              <small>Personal and Contact Details</small>
            </a>
          </li>
          <li>
            <a href={`#step-3`}>
              Certification
              <br />
              <small>Verification Details</small>
            </a>
          </li>
          <li>
            <a href={`#step-4`}>
              Payment
              <br />
              <small>Payment Details</small>
            </a>
          </li>
        </ul>

        <div>
          <div id={`step-1`}>
            {" "}
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Branch
              </Label>
              <Col sm={6}>
                <span className="badge badge-success mt-1">Head Office</span>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Ref
              </Label>
              <Col sm={6}>
                <span inline="true" className="badge badge-primary mt-1">
                  H|19|180
                </span>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Customer Type
              </Label>
              <Col sm={6}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={options}
                  isSearchable
                  isClearable
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Date
              </Label>
              <Col sm={6}>
                <DatePickerInput
                  value={this.state.Date}
                  onChange={this.setDate}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Training Course
              </Label>
              <Col sm={6}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={options}
                  isSearchable
                  isClearable
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Training Days
              </Label>
              <Col sm={6}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={options}
                  isSearchable
                  isClearable
                />
              </Col>
            </FormGroup>
          </div>
          <div id={`step-2`}>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Name
              </Label>
              <Col sm={6}>
                <Input type="text" name="name" placeholder="Name" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                NIC/Passport Number
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="nic_passport_number"
                  placeholder="NIC/Passport Number"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                NIC/Passport Issued Date
              </Label>

              <Col sm={6}>
                <DatePickerInput
                  value={this.state.NIC_Passport_issue_date}
                  onChange={this.setNicPassportDate}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Date of Birth
              </Label>

              <Col sm={6}>
                <DatePickerInput
                  value={this.state.DOB}
                  onChange={this.setDOB}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Gender
              </Label>
              <Col sm={6}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={gender}
                  isSearchable
                  isClearable
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Permenent Address
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="permenent_address"
                  placeholder="Line 1"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right"></Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="permenent_address"
                  placeholder="Line 2"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right"></Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="permenent_address"
                  placeholder="Line 3"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Contact Number Mobile
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="contact_number_mobile"
                  placeholder="Contact Number Mobile"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Contact Number Home
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="contact_number_home"
                  placeholder="Contact Number Home"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Contact Number Working
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="contact_number_working"
                  placeholder="Contact Number working"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                How Do You Know us
              </Label>
              <Col sm={6}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={options}
                  isSearchable
                  isClearable
                />
              </Col>
            </FormGroup>
          </div>
          <div id={`step-3`}>
            {" "}
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Medical Certificate Number
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="Medical"
                  placeholder="Medical Certificate Number"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                MC Issued Date
              </Label>
              <Col sm={6}>
                <DatePickerInput
                  value={this.state.MC_Date}
                  onChange={this.setMcDate}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                RMV Barcode Ref
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="rmv_barcode_ref"
                  placeholder="RMV Barcode Ref"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right pt-sm-0">
                Customer Medical
              </Label>
              <Col sm={6}>
                <CustomInput
                  type="checkbox"
                  id="customer_medical"
                  label="Check me out"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right pt-sm-0">
                Paper Set
              </Label>
              <Col sm={6}>
                <CustomInput
                  type="checkbox"
                  id="paper_set"
                  label="Check me out"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right pt-sm-0">
                Book
              </Label>
              <Col sm={6}>
                <CustomInput type="checkbox" id="book" label="Check me out" />
              </Col>
            </FormGroup>
          </div>
          <div id={`step-4`}>
            {" "}
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Discount
              </Label>
              <Col sm={6}>
                <Input type="text" name="discount" placeholder="Discount" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Discount Reason
              </Label>
              <Col sm={6}>
                <Input
                  type="textarea"
                  name="discount_reason"
                  placeholder="Discount Reason"
                  rows="3"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Sub Total
              </Label>
              <Col sm={6}>
                <Input type="text" name="sub_total" placeholder="Sub Total" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2} className="text-sm-right">
                Advanced Payment
              </Label>
              <Col sm={6}>
                <Input
                  type="text"
                  name="advanced_payment"
                  placeholder="Advanced Payment"
                />
              </Col>
            </FormGroup>{" "}
          </div>
        </div>
      </div>
    );
  };
}

const Layouts = () => (
  <Container fluid className="p-0">
    <div className=" float-right pull-right ">
      <Button tag={Link} to="/customers" color="secondary" outline>
        Cancel
      </Button>
    </div>
    {/* <Row>
      <h1 className="pt-2 h3 mb-3">Add Customer</h1>
      <Col>
        <span className="badge badge-success mr-1 mb-1">Head Office</span>
      </Col>
      <Col>
        <span className="badge badge-success mr-1 mb-1">H|19|180</span>
      </Col>
    </Row> */}
    <FormGroup row>
      <h1 className="pt-2 h3 mb-3">Add New Customer</h1>
    </FormGroup>

    <Row>
      <Col lg="12">
        <WizardVariant variant="arrows" color="primary" />
      </Col>
    </Row>
  </Container>
);

export default Layouts;
