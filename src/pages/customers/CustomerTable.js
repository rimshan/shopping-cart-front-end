import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { itemActions } from "../../redux/actions/itemActions";
import { userActions } from "../../redux/actions/userActions";
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

import { Edit2, Trash, Eye } from "react-feather";

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
    dataField: "firstname",
    text: "Name",
    sort: true,
    formatter: nameFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: "25%", textAlign: "left" };
    },
  },

  {
    dataField: "email",
    text: "Email",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { width: "20%", textAlign: "left" };
    },
  },
  {
    dataField: "userAddress",
    text: "Address",
    sort: true,
    headerStyle: (colum, colIndex) => {
      return { width: "25%", textAlign: "left" };
    },
  },

  {
    dataField: "contactNumber",
    text: "Mobile No",
    headerStyle: (colum, colIndex) => {
      return { width: "15%", textAlign: "left" };
    },
    sort: false,
  },
  {
    dataField: "status",
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
          pathname: `/customer-view/${row._id}`,
          state: {
            row: row,
          },
        }}
        color="outline"
        className="mt-n1"
      >
        <Eye className="align-middle ml-1" size={18} />
      </Button>
    );
  }
}

function statusFormatter(cell, row) {
  if (cell === "Blocked") {
    return (
      <div>
        <span id="UncontrolledTooltip" className="badge badge-danger ">
          Blocked <FontAwesomeIcon icon={faExclamation} />
        </span>
        <UncontrolledTooltip placement="bottom" target="UncontrolledTooltip">
          Tooltip on
        </UncontrolledTooltip>
      </div>
    );
  } else {
    return <span className="badge badge-success ">Completed</span>;
  }
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
      {row.lastName ? row.firstName + " " + row.lastName : row.firstName}
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
    customers: [],
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
    this.props.getCustomers().then((customers, id) => {
      console.log(customers);
      if (customers.customers && customers.customers.status === 200) {
        this.setState({
          customers: customers.customers.data,
          total: customers.customers.data.length,
          totalCustomers: customers.customers.data.length,
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
          data={this.state.customers}
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
                <CardTitle tag="h4">{this.state.customers.length} Listed Customers</CardTitle>
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
  getCustomers: userActions.getusers,
  getOrganizationLocations: organizationActions.getOrganizationLocations,
};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(CustomerTable)
);
