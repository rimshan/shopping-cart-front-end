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
  Label,
  Row,
  UncontrolledAlert
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import Timeline from "../../components/Timeline";
import TimelineItem from "../../components/TimelineItem";

import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { Trash2 } from "react-feather";

const Quantities = [
  { value: 0, label: 0 },
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
  { value: 11, label: 11 },
  { value: 12, label: 12 },
  { value: 13, label: 13 },
  { value: 14, label: 14 },
  { value: 15, label: 15 },
  { value: 16, label: 16 },
  { value: 17, label: 17 },
  { value: 18, label: 18 },
  { value: 19, label: 19 },
  { value: 20, label: 20 },
  { value: 21, label: 21 },
  { value: 22, label: 22 },
  { value: 23, label: 23 },
  { value: 24, label: 24 },
  { value: 25, label: 25 },
  { value: 26, label: 26 },
  { value: 27, label: 27 },
  { value: 28, label: 28 },
  { value: 29, label: 29 },
  { value: 30, label: 30 },
  { value: 31, label: 31 },
  { value: 32, label: 32 },
  { value: 33, label: 33 },
  { value: 34, label: 34 },
  { value: 35, label: 35 },
  { value: 36, label: 36 },
  { value: 37, label: 37 },
  { value: 38, label: 38 },
  { value: 39, label: 39 },
  { value: 40, label: 40 },
  { value: 41, label: 41 },
  { value: 42, label: 42 },
  { value: 43, label: 43 },
  { value: 44, label: 44 },
  { value: 45, label: 45 },
  { value: 46, label: 46 },
  { value: 47, label: 47 },
  { value: 48, label: 48 },
  { value: 49, label: 49 },
  { value: 50, label: 50 }
];

const SectionOne = props => {
  return (
    <Card>
      <CardBody>
        <Form>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              Expected Arrival
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="date"
                placeholder={props.props.transfer.createdDate}
                disabled
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
                placeholder={props.props.transfer.reason}
                rows="4"
                disabled
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              Source Location
            </Label>
            <Col sm={4}>
              <Input
                type="text"
                name="date"
                placeholder={props.props.transfer.source_location}
                disabled
              />
            </Col>
            <Label sm={2} className="text-sm-right">
              Destination Location
            </Label>
            <Col sm={4}>
              <Input
                type="text"
                name="date"
                placeholder={props.props.transfer.destination_location}
                disabled
              />
            </Col>
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

function handleOnDelete() {}

const ItemRows = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5">Item details</CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row form>
          <Col md={8}>
            <FormGroup>
              <Label>Item</Label>
              <Input type="text" name="date" placeholder="Item 1" disabled />
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
              <Label>Action</Label>
              <InputGroup className="mb-3">
                <Button
                  color="danger"
                  size="sm"
                  className="mr-1 mb-1 float-right"
                  outline
                  onClick={handleOnDelete}
                >
                  <Trash2 />
                </Button>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <UncontrolledAlert
              color="warning"
              className="alert-outline-coloured"
            >
              <div className="alert-icon">
                <FontAwesomeIcon icon={faBell} fixedWidth />
              </div>
              <div className="alert-message">
                1 items will be restocked at Location A location.
              </div>
            </UncontrolledAlert>
          </Col>
        </Row>

        <Row form>
          <Col md={8}>
            <FormGroup>
              <Input type="text" name="date" placeholder="Item 2" disabled />
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
              <InputGroup className="mb-3">
                <Button
                  color="danger"
                  size="sm"
                  className="mr-1 mb-1 float-right"
                  outline
                  onClick={handleOnDelete}
                >
                  <Trash2 />
                </Button>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>
);

const Single = () => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Activity
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Timeline className="mt-2">
        <TimelineItem>
          <strong>You created this transfer</strong>
          <span className="float-right text-muted text-sm">30m ago</span>
          <p></p>
        </TimelineItem>
        <TimelineItem>
          <strong>Created invoice #1204</strong>
          <span className="float-right text-muted text-sm">2h ago</span>
          <p></p>
        </TimelineItem>
        <TimelineItem>
          <strong>Inventory was deducted from location Location B</strong>
          <span className="float-right text-muted text-sm">3h ago</span>
          <p></p>
        </TimelineItem>
      </Timeline>
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
    expected_delivery_date: new Date(),
    transfer: this.props.location.state.transfer
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
    console.log(this.props.location.state);
    return (
      <Container fluid className="p-0">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/items">Items</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/items/transfers">Transfers</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>
            #{this.props.location.state.transfer.transfer}
          </BreadcrumbItem>
        </Breadcrumb>

        <Button className="float-right mr-2 mb-1" color="danger">
          Reject All
        </Button>
        <Button className="float-right mr-2 mb-1" color="primary">
          Mark as Complete
        </Button>

        <h1 className="h3 mb-3">
          Transfer #{this.props.location.state.transfer.transfer}
        </h1>
        <SectionOne props={this.state} />
        <ItemRows />
        <Single />
        <ActionPanel />
      </Container>
    );
  }
}

export default HorizontalForm;
