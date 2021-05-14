import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { itemActions } from "../../redux/actions/itemActions";
import { userActions } from "../../redux/actions/userActions";
import {
  organizationActions,
} from "../../redux/actions/organizationAction";
import Statistics from "./Statistics";
import CustomerOrders from "./CustomerOrders";
import CustomerDetails from "./CustomerDetails";

import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input
} from "reactstrap";
import Select from "react-select";
import "rc-datepicker/lib/style.css";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

const options = [
  { value: "cash", label: "Cash" },
  { value: "credit_card", label: "Credit card" }
];


class Customer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customerOrders:[],
      customer:{},
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

  componentDidMount() {
    this.getCustomer()
  }



  getCustomer = () => {
    this.props.getCustomerByID(this.props.location.state.row._id).then((customer, id) => {
      if (customer.customer && customer.customer.status === 200) {  
        this.setState({
          customer: customer.customer.data,
        });
      }
    });
  };

  togglePayment = () => {
    this.setState(state => ({
      paymentModel: !state.paymentModel
    }));
  };



  render() {

    const { customer} = this.state;


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
            <h3>{customer.firstName} {customer.lastName}</h3>

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
                {customer.contactNumber}
              </span>

            </h5>
          </Col>
        </Row>
        <Statistics />

        <Row>
          <Col lg="8">
            <CustomerOrders />
          </Col>
          <Col lg="4">
            <CustomerDetails customer={customer} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  items: itemActions.getAllItems,
  getCustomerOrders: userActions.getuserOrders,
  getCustomerByID: userActions.getuserByID,
  getOrganizationLocations: organizationActions.getOrganizationLocations,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Customer));

