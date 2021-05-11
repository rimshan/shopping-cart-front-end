import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row
} from "reactstrap";

import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Plus } from "react-feather";

const Quantities = [{ value: 1, label: 2 }];

const options = [
  { value: "Repair and Maintainance", label: "Repair and Maintainance" },
  {
    value: "Salaries and Employee Wages",
    label: "Salaries and Employee Wages"
  },
  { value: "Telephone Expense", label: "Telephone Expense" },
  { value: "Travel Expense", label: "Travel Expense" },
  { value: "Uncategorized", label: "Uncategorized" },
  { value: "Cost of Goods Sold", label: "Cost of Goods Sold" }
];

const SectionOne = props => (
  <Card>
    <CardBody>
      <Form>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Transfer Order
          </Label>
          <Col sm={10}>
            <Input type="text" name="refference" placeholder="Transfer Order" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Date
          </Label>
          <Col sm={10}>
            <DatePicker
              placeholderText="Click to select a date"
              selected={props.date}
              isClearable
              onChange={date => this.setDate(date)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Reason
          </Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="textarea"
              placeholder="Textarea"
              rows="4"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Source Warehouse
          </Label>
          <Col sm={4}>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={options}
              placeholder="Select Source Warehouse"
              isSearchable
              isClearable
            />
          </Col>
          <Label sm={2} className="text-sm-right">
            Destination Warehouse
          </Label>
          <Col sm={4}>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={options}
              placeholder="Select Destination Warehouse"
              isSearchable
              isClearable
            />
          </Col>
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
);

const ItemRows = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5">Item details</CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label>Item</Label>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                options={options}
                isLoading
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Quantity</Label>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                options={Quantities}
              />
            </FormGroup>
          </Col>
          <Col md={1}>
            <FormGroup>
              <Label>Rate</Label>
              <Input type="text" name="zip" />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Discount</Label>
              <Input type="text" name="city" />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Tax</Label>
              <Input type="select" name="state">
                <option />
                <option>...</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Amount</Label>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">LKR</InputGroupAddon>
                <Input
                  type="text"
                  placeholder="Username"
                  defaultValue="130.00"
                  disbaled="true"
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                options={options}
                isLoading
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                options={Quantities}
              />
            </FormGroup>
          </Col>
          <Col md={1}>
            <FormGroup>
              <Input type="text" name="zip" />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input type="text" name="city" />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Input type="select" name="state">
                <option />
                <option>...</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">LKR</InputGroupAddon>
                <Input
                  placeholder="Username"
                  defaultValue="130.00"
                  disbaled="true"
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <FormGroup>
              <Button color="primary" className="mr-1 mb-1" outline>
                <Plus /> Add another Item
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>
);

const ActionPanel = () => (
  <Form>
    <Button color="primary" className="mr-1 mb-1">
      Initiate Transfer
    </Button>
    <Button color="primary" className="mr-1 mb-1">
      Transfer and Receive
    </Button>
    <Button color="primary" className="mr-1 mb-1" outline>
      Cancel
    </Button>
  </Form>
);

class HorizontalForm extends React.Component {
  state = {
    date: new Date(),
    expected_delivery_date: new Date()
  };

  setDate = date => {
    this.setState({
      date: date
    });
  };

  setExpectedDeliveryDate = date => {
    this.setState({
      expected_delivery_date: date
    });
  };

  render() {
    return (
      <Container fluid className="p-0">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/items">Items</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/items/transfers">Transfers</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>New Transfer Request</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="h3 mb-3">New Transfer Request</h1>
        <SectionOne props={this.state} />
        <ItemRows />
        <ActionPanel />
      </Container>
    );
  }
}

export default HorizontalForm;
