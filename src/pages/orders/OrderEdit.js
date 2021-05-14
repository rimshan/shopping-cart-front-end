import React from "react";
import { connect } from "react-redux";
import { salesOrderActions } from "../../redux/actions/salesOrderActions";

import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
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
  FormGroup,
  Input,
  Label,
} from "reactstrap";

import { toastr } from "react-redux-toastr";

import {
  AvForm,
} from "availity-reactstrap-validation";

import Select from "react-select";

import Table from "reactstrap/lib/Table";

const options = [
  { value: 1, label: "Pending" },
  { value: 2, label: "Approved" },

  { value: 3, label: "Arriving" },
  { value: 4, label: "Completed" },
];

const ItemEditForm = (props) => {

  return (
    <Container fluid className="p-0">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/orders">Orders</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Edit #{props.order?._id}</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="h3 mb-3">Edit Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Basic Details</CardTitle>
        </CardHeader>
        <CardBody>
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              First Name
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="ref_no"
                value={props.order?.customerFirstName}
                placeholder="First Name"
                readOnly
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              Last Name
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="ref_no"
                value={props.order?.customerLastName}
                placeholder="Last Name"
                readOnly
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              Email
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="ref_no"
                value={props.order?.customerEmail}
                placeholder="Email"
                readOnly
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              Address
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="ref_no"
                placeholder="Address"
                value={props.order?.customerAddress}
                readOnly
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              Payment Method
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="ref_no"
                placeholder="Address"
                value={props.order?.orderPaymentMethod}
                readOnly
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              Date
            </Label>
            <Col sm={8}>
              <Input
                type="text"
                name="ref_no"
                value={moment(props.order?.orderDateAdded).format(
                  "MMM Do YYYY"
                )}
                placeholder="Date"
                readOnly
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              Status
            </Label>
            <Col sm={8}>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                options={options}
                onChange={props.handleOrderStatusChange}
                value={options?.filter(
                  (option) => option.value === props.order?.orderStatus
                )}
                isSearchable
              />
            </Col>
          </FormGroup>
          <h3>Order Items</h3>
          <Table striped bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Product Pirce</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {props.order?.orderItems?.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.productName}</td>
                    <td>
                      {props.order?.orderCurrency} {item.productPrice}
                    </td>
                    <td>{item.productQty}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
};

const ActionPanel = (props) => (
  <div className="mb-4">
    <Button type="submit" color="primary" className="mr-1 mb-1">
      Save
    </Button>

    <Button
      color="primary"
      className="mr-1 mb-1"
      outline
      onClick={() => props.props.history.push("/orders")}
    >
      Cancel
    </Button>
  </div>
);

class OrderEdit extends React.Component {
  state = {
    toastrInstance: "",
    toastrTitle: "",
    toastrMessage: "",
    index: false,
    item_attachments: [{}],
    files: [],
    manufacturersOptionList: null,
    OrganizationTaxOptionList: [],
    brandsOptionList: [],
    categoriesOptionList: [],
    itemOptions: [],
    date: new Date(),
    isChecked: true,
    locations: [],
    values: this.props.location.state.item,
    touched: {
      type: false,
      category: false,
      manufacturer: false,
      brand: false,
    },
    edit_item: this.props.location.state.item,

    order: this.props.location.state.order,
  };

  showToastr = () => {
    const options = {
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right",
    };

    const toastrInstance =
      this.state.toastrInstance === "error" ? toastr.error : toastr.success;

    toastrInstance(this.state.toastrTitle, this.state.toastrMessage, options);
  };

  toggle = () => {
    this.setState((state) => ({
      index: !state.index,
    }));
  };

  async componentDidMount() {}

  handleOrderStatusChange = (selectedOption) => {
    const newState = { ...this.state };
    newState.order["orderStatus"] = selectedOption.value;
    this.setState(newState);
  };

  handleSubmit = async () => {
    this.props
    .updtateOrder(this.state.order, this.state.order._id)
    .then((item) => {
      if (item) {
        if (item.status === 200) {
          this.setState({
            toastrInstance: "success",
            toastrTitle: "Success",
            toastrMessage: "You have successfully updated the order",
          });
          this.showToastr();
          this.props.history.push("/orders");
        }else{
          this.setState({
            toastrInstance: "error",
            toastrTitle: "Error",
            toastrMessage: "Something went wrong please try again",
          });
          this.showToastr();
        }
      }
    });
  };
  render() {
    const { order } = this.state;

    return (
      <Container>
        <AvForm onValidSubmit={this.handleSubmit} model={this.state.order}>
          <ItemEditForm
            order={order}
            handleOrderStatusChange={this.handleOrderStatusChange}
          />

          <ActionPanel props={this.props} />
        </AvForm>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
    updtateOrder :salesOrderActions.update,

};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(OrderEdit)
);
