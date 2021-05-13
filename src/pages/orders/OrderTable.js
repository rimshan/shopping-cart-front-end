import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { itemActions } from "../../redux/actions/itemActions";
import { salesOrderActions } from "../../redux/actions/salesOrderActions";
import {
  organizationAction,
  organizationActions,
} from "../../redux/actions/organizationAction";
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
  Table,
  UncontrolledPopover,
  UncontrolledTooltip,
  PopoverBody,
  PopoverHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamation,
  faGlobeAmericas,
  faInfo,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { Edit2, Trash } from "react-feather";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import { MinusCircle, PlusCircle } from "react-feather";
const { SearchBar } = Search;



const tableColumns = [
  {
    dataField: "customerFirstName",
    text: "Name",
    sort: true,
    formatter: nameFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: "20%", textAlign: "left" };
    },
  },

  {
    dataField: "customerEmail",
    text: "Email",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { width: "20%", textAlign: "left" };
    },
  },
  {
    dataField: "customerAddress",
    text: "Address",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { width: "25%", textAlign: "left" };
    },
  },

  {
    dataField: "contactNumber",
    text: "Mobile No",
    sort: false,
    headerStyle: (colum, colIndex) => {
      return { width: "12%", textAlign: "left" };
    },
  },
  {
    dataField: "orderStatus",
    text: "Status",
    sort: false,
    formatter: statusFormatter,
  },
  {
    dataField: "action",
    text: "Action",
    sort: false,
    formatter: actionFormatter
  }
];

function actionFormatter(cell, row, rowIndex, formatExtraData) {
  if (row) {
    return (
      <Button
        tag={Link}
        to={{
          pathname: `/orders/edit/${row._id}`,
          state: {
            order: row,
          },
        }}
        color="outline"
        className="mt-n1"
      >
        <Edit2 className="align-middle ml-1" size={18} />
      </Button>
    );
  }
}

function statusFormatter(cell, row) {
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

function nameFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <div>
      <img
        src={avatar4}
        width="28"
        height="28"
        className="rounded-circle mr-2"
        alt="Avatar"
      />
      {row.customerLastName ? row.customerFirstName + " " + row.customerLastName : row.customerFirstName}
    </div>
  );
}

function refNoFormatter(cell, row, rowIndex, formatExtraData) {
  return <div className="text-primary">{cell}</div>;
}

const MyExportCSV = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <span onClick={handleClick}>Export</span>
    </div>
  );
};

class CustomerTable extends React.Component {
  state = {
    orders: [],
    item_options: [],
    total: null,
    totalCustomers: null,
    locations: null,
  };
  componentDidMount() {
    this.getAllCustomers(10);
  }

  getAllCustomers = () => {
    this.setState({
      item_options: [],
    });
    this.props.getOrders().then((orders, id) => {
      console.log(orders);
      if (orders.orders && orders.orders.status === 200) {
        this.setState({
          orders: orders.orders.data,
          total: orders.orders.data.length,
          totalOrders: orders.orders.data.length,
        });
      }
    });
  };

  rowEvents = {
    onClick: (e, row, rowIndex) => {
      const customer = row;
      this.props.history.push("/customer-view/" + row._id, { row });
    },
  };
  render() {
    return (
      <Card>
        <ToolkitProvider
          keyField="_id"
          data={this.state.orders}
          columns={tableColumns}
          exportCSV
          search
        >
          {(props) => (
            <div>
              <CardHeader>
                {/* <div className="float-right pull-right">
                  <MyExportCSV {...props.csvProps} />
                </div> */}
                <div className="float-right pull-right">
                  <SearchBar {...props.searchProps} />
                </div>
                <CardTitle tag="h4">{this.state.orders.length} Listed Orders</CardTitle>
              </CardHeader>
              <CardBody>
                <BootstrapTable
                  responsive={true}
                  striped
                  hover
                  {...props.baseProps}
                  bootstrap4
                  hover={true}
                  bordered={false}
            
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
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  items: itemActions.getAllItems,
  getOrders: salesOrderActions.getSalesOrders,
  getOrganizationLocations: organizationActions.getOrganizationLocations,
};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(CustomerTable)
);
