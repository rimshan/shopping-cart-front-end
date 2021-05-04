import React from "react";
import { Link } from "react-router-dom";

import Statistics from "./Statistics";
import CustomerExams from "./CustomerExams";
import CustomerDetails from "./CustomerDetails";
import CustomerPayments from "./CustomerPayments";
import CustomerTimeline from "./CustomerTimeline";
import CustomerTrails from "./CustomerTrails";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input
} from "reactstrap";
import Select from "react-select";
import moment from "moment";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamation,
  faGlobeAmericas,
  faInfo,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

const options = [
  { value: "cash", label: "Cash" },
  { value: "credit_card", label: "Credit card" }
];

const exam_time = [
  { value: "9 AM", label: "9 AM" },
  { value: "10 AM", label: "10 AM" },
  { value: "11 AM", label: "11 AM" },
  { value: "12 PM", label: "12 PM" },
  { value: "1 PM", label: "1 PM" },
  { value: "2 PM", label: "2 PM" }
];

class Customer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      payment_date: new Date(),
      exam_date: new Date(),
      exam_time: new Date(),
      trial_date: new Date(),
      trial_time: new Date()
    };
  }

  componentWillMount() {
    this.setState(() => ({
      paymentModel: false,
      examModel: false,
      trialModel: false
    }));
  }

  togglePayment = () => {
    this.setState(state => ({
      paymentModel: !state.paymentModel
    }));
  };

  toggleExam = () => {
    this.setState(state => ({
      examModel: !state.examModel
    }));
  };

  toggleTrial = () => {
    this.setState(state => ({
      trialModel: !state.trialModel
    }));
  };

  setTrialDate = date => {
    this.setState({
      trial_date: date
    });
  };

  setTrialTime = date => {
    this.setState({
      trial_time: date
    });
  };
  setExamTime = date => {
    this.setState({
      trial_time: date
    });
  };

  setExamDate = date => {
    this.setState({
      exam_date: date
    });
  };

  setExamTime = date => {
    this.setState({
      exam_time: date
    });
  };

  setPaymentDate = date => {
    this.setState({
      payment_date: date
    });
  };

  render() {
    const customer = this.props.location.state.row;

    return (
      <Container fluid className="p-0">
        <div>
          <Breadcrumb style={{ backgroundColor: "#ffffff" }}>
            <BreadcrumbItem>
              <Link to="/customers">Customer</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Customer view</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className=" float-right pull-right ">
          <Button
            tag={Link}
            to="/add-customer"
            className="mr-3 "
            outline
            color="primary"
          >
            Edit Customer
          </Button>
          <UncontrolledButtonDropdown>
            <DropdownToggle caret color="primary">
              Add{" "}
            </DropdownToggle>
            <DropdownMenu>
              {/* <DropdownItem>
                <MyExportCSV {...props.csvProps} />
              </DropdownItem> */}
              <DropdownItem onClick={() => this.togglePayment()}>
                Payment
              </DropdownItem>
              <DropdownItem onClick={() => this.toggleTrial()}>
                Trial
              </DropdownItem>
              <DropdownItem onClick={() => this.toggleExam()}>
                Exam
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <Modal
            isOpen={this.state.paymentModel}
            toggle={() => this.togglePayment()}
            centered
            size="md"
          >
            <ModalHeader toggle={() => this.togglePayment()}>
              Add Payment
            </ModalHeader>
            <ModalBody className="text-center m-3">
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Payment Type
                </Label>
                <Col sm={8}>
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
                <Label sm={3} className="text-sm-right">
                  Method
                </Label>
                <Col sm={8}>
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
                <Label sm={3} className="text-sm-right">
                  Amount
                </Label>
                <Col sm={8}>
                  <Input type="text" name="ref_no" placeholder="Amount" />
                </Col>
              </FormGroup>
              {/* <FormGroup row>
                <Label sm={2} className="text-sm-right">
                  Payment Date
                </Label>
                <Col sm={2}>
                  <DatePicker
                    placeholderText="Click to select a date"
                    selected={this.state.payment_date}
                    isClearable
                    onChange={date => this.setPaymnentDate(date)}
                  />
                </Col>
              </FormGroup> */}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => this.toggleExam()}>
                Close
              </Button>{" "}
              <Button color="primary" onClick={() => this.toggleExam()}>
                Add Payment
              </Button>
            </ModalFooter>
          </Modal>
          <Modal
            isOpen={this.state.examModel}
            toggle={() => this.toggleExam()}
            centered
            size="md"
          >
            <ModalHeader toggle={() => this.toggleExam()}>Add Exam</ModalHeader>
            <ModalBody className="text-center m-3">
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Exam Type
                </Label>
                <Col sm={8}>
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
                <Label sm={3} className="text-sm-right">
                  Exam Date
                </Label>
                <Col sm={8}>
                  <DatePickerInput
                    value={this.state.exam_date}
                    onChange={this.setExamDate}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Exam Time
                </Label>
                <Col sm={8}>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={exam_time}
                    placeholder="Select Exam Time"
                    isSearchable
                    isClearable
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => this.toggleExam()}>
                Close
              </Button>{" "}
              <Button color="primary" onClick={() => this.toggleExam()}>
                Add Exam
              </Button>
            </ModalFooter>
          </Modal>

          <Modal
            isOpen={this.state.trialModel}
            toggle={() => this.toggleTrial()}
            centered
            size="md"
          >
            <ModalHeader toggle={() => this.toggleTrial()}>
              Add Trial
            </ModalHeader>
            <ModalBody className="text-center m-3">
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Trial Type
                </Label>
                <Col sm={8}>
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
                <Label sm={3} className="text-sm-right">
                  Trial Date
                </Label>
                <Col sm={8}>
                  <DatePickerInput
                    value={this.state.trial_date}
                    onChange={this.setTrialDate}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Trial Time
                </Label>
                <Col sm={8}>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={exam_time}
                    placeholder="Select Exam Time"
                    isSearchable
                    isClearable
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => this.toggleTrial()}>
                Close
              </Button>{" "}
              <Button color="primary" onClick={() => this.toggleTrial()}>
                Add Trials
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        <Row>
          <Col sm={1}>
            <h1 className="h3 mb-3">
              {" "}
              <img
                src={avatar4}
                width="58"
                height="58"
                className="rounded-circle mr-2"
                alt="Avatar"
              />
            </h1>
          </Col>

          <Col>
            <h3>{customer.name}</h3>

            <h5>
              {customer.status === "Blocked" ? (
                <span
                  id="UncontrolledTooltip"
                  className="badge badge-danger ml-1 mr-1 mb-1"
                >
                  Blocked <FontAwesomeIcon icon={faExclamation} />
                </span>
              ) : (
                <span className="badge badge-success ml-0 mr-2 mb-1">
                  Completed
                </span>
              )}

              <span className="badge badge-primary ml-2 mr-2 mb-1">
                H | 19 | 190
              </span>

              <span className="badge badge-primary ml-2 mr-2 mb-1">
                Head Office
              </span>
            </h5>
          </Col>
        </Row>
        <Statistics />

        <Row>
          <Col lg="8">
            <CustomerExams />
            <CustomerPayments />
            {/* <CustomerTrails /> */}
          </Col>
          <Col lg="4">
            <CustomerDetails customer={customer} />
            {/* <CustomerTimeline /> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Customer;
