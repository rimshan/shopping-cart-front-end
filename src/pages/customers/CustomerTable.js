import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions/userActions";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  UncontrolledTooltip,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

import { Eye } from "react-feather";

import avatar4 from "../../assets/img/avatars/avatar-4.jpg";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

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
    formatter: actionFormatter,
  },
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
                <div className="float-right pull-right">
                  <SearchBar {...props.searchProps} />
                </div>
                <CardTitle tag="h4">
                  {this.state.customers.length} Listed Customers
                </CardTitle>
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
  getCustomers: userActions.getusers,
};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(CustomerTable)
);
