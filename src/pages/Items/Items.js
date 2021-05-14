import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { itemActions } from "../../redux/actions/itemActions";
import {
  organizationAction,
  organizationActions,
} from "../../redux/actions/organizationAction";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { Edit2, Trash2 } from "react-feather";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { toastr } from "react-redux-toastr";
const { SearchBar } = Search;

const ItemsTable = (props) => {
  const tableData = props.items;
  return (
    <div>
      <Card>
        <ToolkitProvider
          keyField="_id"
          data={tableData}
          columns={props.tableColumns}
          exportCSV
          search
        >
          {(props) => (
            <div>
              <CardHeader>
                <div className="float-right pull-right">
                  <SearchBar {...props.searchProps} />
                </div>
                <CardTitle tag="h4">Items Listed</CardTitle>
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
    </div>
  );
};

class Items extends React.Component {
  state = {
    items: [],
    item_options: [],
    total: null,
    totalItems: null,
    locations: null,
  };
  componentDidMount() {
    this.getAllItems(10);
  }

  tableColumns = [
    {
      dataField: "productName",
      text: "Name",
      sort: true,
      formatter: this.nameFormatter,
      headerStyle: (colum, colIndex) => {
        return { width: "20%", textAlign: "" };
      },
    },
    {
      dataField: "productDescription",
      text: "Description",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: "30%", textAlign: "" };
      },
    },
    {
      dataField: "productPrice",
      text: "Price",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: "10%", textAlign: "" };
      },
    },
    {
      dataField: "productQuantity",
      text: "Quantity",
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: "10%", textAlign: "" };
      },
    },
    {
      dataField: "isActive",
      text: "Status",
      formatter: this.statusFormatter,
      sort: true,
    },
    {
      dataField: "item_id",
      text: "Action(s)",
      formatter: this.actionFormatter.bind(this),
      sort: false,
    },
  ];

  nameFormatter(cell, row) {
    return cell;
  }

  statusFormatter(cell, row) {
    if (row) {
      if (cell === 1) {
        return (
          <span className="badge badge-danger ml-0 mr-1 mb-1">Inactive</span>
        );
      } else {
        return (
          <span className="badge badge-success ml-0 mr-1 mb-1">Active</span>
        );
      }
    }
  }

  actionFormatter(cell, row) {
    if (row) {
      return (
        <div>
          <Button
            tag={Link}
            to={{
              pathname: `/items/edit/${row._id}`,
              state: {
                item: row,
              },
            }}
            color="outline"
            className="mt-n1"
          >
            <Edit2 className="align-middle ml-1" size={18} />
          </Button>
          <Button
            onClick={() => this.deleteItem(row._id)}
            color="outline"
            className="mt-n1 "
          >
            <Trash2 className="align-middle ml-1" size={18} />
          </Button>
        </div>
      );
    }
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

  getAllItems = (pageSize) => {
    this.setState({
      item_options: [],
    });
    this.props.items(pageSize).then((items, id) => {
      if (items.items && items.items.status === 200) {
        this.setState({
          items: items.items.data,
          total: items.items.data.length,
          totalItems: items.items.data.length,
        });
      }
    });
  };

  deleteItem = (id) => {
    this.setState((state) => ({
      deleteToggle: !state.deleteToggle,
      deleteID: id,
    }));
  };

  deleteToggle = () => {
    this.setState((state) => ({
      deleteToggle: !state.deleteToggle,
    }));
  };

  confirmDeleteItem = () => {
    this.props.deleteItem(this.state.deleteID).then((item) => {
      if (item.status === 200) {
        this.setState({
          toastrInstance: "success",
          toastrTitle: "Success",
          toastrMessage: "You have successfully deleted a item",
        });
        this.showToastr();
        this.getAllItems();
      } else {
        this.setState({
          toastrInstance: "error",
          toastrTitle: "Error",
          toastrMessage: "Something went wrong please try again",
        });
        this.showToastr();
      }
    });
  };

  render() {
    return (
      <Container fluid className="p-0 container-fluid">
        <Button
          tag={Link}
          to="/items/new"
          color="primary"
          className="float-right mt-n1"
        >
          <FontAwesomeIcon icon={faPlus} /> Add
        </Button>
        <UncontrolledButtonDropdown key={0} className="mr-1 mb-3">
          <span className="h3 mb-3">All Items </span>
        </UncontrolledButtonDropdown>
        <ItemsTable
          items={this.state.items}
          tableColumns={this.tableColumns}
          totalItems={this.state.totalItems}
          total={this.state.total}
          getAllItems={this.getAllItems}
        />

        <Modal
          isOpen={this.state.deleteToggle}
          toggle={() => this.deleteToggle()}
          centered
          size="md"
        >
          <ModalHeader toggle={() => this.deleteToggle()}>Alert</ModalHeader>

          <ModalBody className="text-center m-3">
            <p className="mb-0">Are you sure you want to delete this item?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.confirmDeleteItem()}>
              Yes
            </Button>
            <Button color="secondary" onClick={() => this.deleteToggle()}>
              No
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  items: itemActions.getAllItems,
  deleteItem: itemActions.deleteItem,
  getOrganizationLocations: organizationActions.getOrganizationLocations,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Items));
