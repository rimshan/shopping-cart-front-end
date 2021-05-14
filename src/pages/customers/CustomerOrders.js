import React from "react";
import {  withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { itemActions } from "../../redux/actions/itemActions";
import { userActions } from "../../redux/actions/userActions";
import { salesOrderActions } from "../../redux/actions/salesOrderActions";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Select from "react-select";
import { toastr } from "react-redux-toastr";
import moment from "moment";


import { Eye} from "react-feather";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";


const options = [
  { value: 1, label: "Pending" },
  { value: 2, label: "Approved" },

  { value: 3, label: "Arriving" },
  { value: 4, label: "Completed" },
];

const tableColumns = [
  {
    dataField: "customerAddress",
    text: "Address",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { width: "25%", textAlign: "left" };
    },
  },
  {
    dataField: "orderTotal",
    text: "Total",
    formatter: totalFormatter,
    sort: true,
  },
  {
    dataField: "orderDateAdded",
    text: "Date",
    formatter: dateFormatter,
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { width: "20%", textAlign: "left" };
    },
  },
  {
    dataField: "orderStatus",
    text: "Status",
    formatter: statusFormatter,
    sort: true,
  },
  {
    dataField: "action",
    text: "Action",
    formatter: actionFormatter,
    sort: true,
  },
];

function statusFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <div>
      {cell == 1 ? (
        <span id="UncontrolledTooltip" className="badge badge-warning ">
          Pending
        </span>
      ) : cell == 2 ? (
        <span id="UncontrolledTooltip" className="badge badge-primary ">
          Approved
        </span>
      ) : cell == 3 ? (
        <span id="UncontrolledTooltip" className="badge badge-secondary ">
          Arriving
        </span>
      ) : cell == 4 ? (
        <span id="UncontrolledTooltip" className="badge badge-success ">
          Completed
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

function totalFormatter(cell, row, rowIndex, formatExtraData) {
  return <div>{row.orderCurrency + " " + row.orderTotal}</div>;
}

function dateFormatter(cell, row, rowIndex, formatExtraData) {
  return moment(cell).format("MMM Do YYYY");
}

function nameFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <div>
      <img
        src={avatar3}
        width="28"
        height="28"
        className="rounded-circle mr-2"
        alt="Avatar"
      />
      {row.customerLastName
        ? row.customerFirstName + " " + row.customerLastName
        : row.customerFirstName}
    </div>
  );
}

function actionFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <div>
      <Button
        color="outline"
        className="mt-n1"
      >
        <Eye className="align-middle ml-1" size={18} />
      </Button>
    </div>
  );
}


class CustomerExams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exam_date: new Date(),
      exam_time: new Date(),
      order: {},
      customerOrders:[]
    };
  }

  toggle = () => {
    this.setState((state) => ({
      index: !state.index,
    }));
  };

  componentWillMount() {
    this.setState(() => ({
      index: false,
    }));
  }

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

  componentDidMount() {
    this.getCustomerOrders();
  }



  getCustomerOrders = () => {
    this.props.getCustomerOrders(this.props.location.state.row._id).then((orders, id) => {
      if (orders.orders && orders.orders.status === 200) {  
        this.setState({
          customerOrders: orders.orders.data,
          total: orders.orders.data.length,
          totalorders: orders.orders.data.length,
        });
      }
    });
  };



componentDidUpdate(prevProps) {
}

  setExamDate = (date) => {
    this.setState({
      exam_date: date,
    });
  };

  setExamTime = (date) => {
    this.setState({
      exam_time: date,
    });
  };

  toggleOrder = () => {
    this.setState((state) => ({
      orderModel: !state.orderModel,
    }));
  };

  handleOrderStatusChange = (selectedOption) => {
    const newState = { ...this.state };
    newState.order["orderStatus"] = selectedOption.value;
    this.setState(newState);
  };



  rowEvents = {
    onClick: (e, row, rowIndex) => {
      this.setState((state) => ({
        order: row,
        orderModel: !state.orderModel,
      }));
    },
  };

  updtateOrder = () =>{
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
          this.getCustomerOrders()
          this.toggleOrder()
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
  }
  render() {
    const { order } = this.state;
    return (
      <div>
        <Modal
          isOpen={this.state.orderModel}
          toggle={() => this.toggleOrder()}
          centered
          size="lg"
        >
          <ModalHeader toggle={() => this.toggleOrder()}>
            Customer Order # {order._id}
          </ModalHeader>
          <ModalBody className=" m-3">
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                First Name
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  name="ref_no"
                  value={order.customerFirstName}
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
                  value={order.customerLastName}
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
                  value={order.customerEmail}
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
                  value={order.customerAddress}
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
                  value={order.orderPaymentMethod}
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
                  value={moment(order.orderDateAdded).format("MMM Do YYYY")}
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
                  onChange={this.handleOrderStatusChange}
                  value={options?.filter(
                    (option) => option.value === order.orderStatus
                  )}
                  isSearchable
                  isDisabled
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
                {order.orderItems?.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.productName}</td>
                      <td>{order.orderCurrency} {item.productPrice}</td>
                      <td>{item.productQty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleOrder()}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Card>
          <ToolkitProvider
           remote="true"
            keyField="_id"
            data={this.state.customerOrders}
            columns={tableColumns}
            exportCSV
          >
            {(props) => (
              <div>
                <CardHeader>
                  <CardTitle tag="h5">Customer Orders</CardTitle>
                </CardHeader>
                <CardBody>
                  <BootstrapTable

                    responsive
                    striped
                    hover
                    {...props.baseProps}
                    bootstrap4
                    hover={true}
                    bordered={false}
                    rowEvents={this.rowEvents}
                    pagination={paginationFactory({
                      sizePerPage: 5,
                      sizePerPageList: [5, 10, 25, 50],
                    })}
                  />
                </CardBody>
              </div>
            )}
          </ToolkitProvider>
        </Card>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  items: itemActions.getAllItems,
  getCustomerOrders: userActions.getuserOrders,
  updtateOrder :salesOrderActions.update,
  getCustomerByID: userActions.getuserByID,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(CustomerExams));


