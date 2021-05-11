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
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { MoreHorizontal, Edit2 } from "react-feather";

import BootstrapTable from "react-bootstrap-table-next";

import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const tableColumns = [
  {
    dataField: "name",
    text: "Name",
    sort: true,
    formatter: nameFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: "65%", textAlign: "" };
    },
  },
  // {
  //   dataField: "sku",
  //   text: "SKU",
  //   sort: true,
  // },
  // {
  //   dataField: "stock_on_hand",
  //   text: "Stock On Hand",
  //   sort: true,
  // },
  // {
  //   dataField: "reorder_level",
  //   text: "Reorder Level",
  //   sort: true,
  // },
  {
    dataField: "is_active",
    text: "Status",
    formatter: statusFormatter,
    sort: true,
  },
  {
    dataField: "item_id",
    text: "Action(s)",
    formatter: actionFormatter,
    sort: false,
  },
];

function nameFormatter(cell, row) {
  if (row) {
    if (row.item_details && row.item_details[0].item_option) {
      // const locations = [
      //   ...new Set(row.item_details.map((x) => x.organization_location_id)),
      // ];
      return (
        cell +
        " (" +
        row.item_details.length +
        " items in " +
        row.item_details[0].inventory.length +
        " locations)"
      );
    } else {
      return cell;
    }
  }
}

function statusFormatter(cell, row) {
  if (row) {
    if (cell === 1) {
      return <span className="badge badge-success ml-0 mr-1 mb-1">Active</span>;
    } else {
      return (
        <span className="badge badge-danger ml-0 mr-1 mb-1">Inactive</span>
      );
    }
  }
}

function actionFormatter(cell, row) {
  if (row) {
    return (
      <Button
        tag={Link}
        to={{
          pathname: `/items/edit/${row.id}`,
          state: {
            item: row,
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

const ItemsTable = (props) => {
  const tableData = props.items;
  const options = {
    custom: true,
    totalSize: props.total,
    // sizePerPage: 5,
    sizePerPageList: [10, 25, 50],
    onPageChange: (page, sizePerPage) => {
      props.getAllItems(sizePerPage * page);
    },
    onSizePerPageChange: (sizePerPage, page) => {
      props.getAllItems(sizePerPage, page);
    },
  };

  const callbackFunction = (childData) => {
    props.getSearchValue(childData);
  };

  return (
    <React.Fragment>
      {props.totalItems === null ? (
        <h4>Loading...</h4>
      ) : (
        <div>
          {props.totalItems !== 0 ? (
            <Card>
              <PaginationProvider pagination={paginationFactory(options)}>
                {({ paginationProps, paginationTableProps }) => (
                  <div>
                    <BootstrapTable
                      keyField="id"
                      responsive={true}
                      striped
                      hover
                      bootstrap4
                      bordered={false}
                      data={tableData}
                      // rowEvents={prop.rowEvents}
                      columns={tableColumns}
                      {...paginationTableProps}
                      noDataIndication="No results"
                    />
                    {props.items.length !== 0 ? (
                      <SizePerPageDropdownStandalone {...paginationProps} />
                    ) : null}

                    <div className="float-right pull-right">
                      <PaginationListStandalone {...paginationProps} />
                    </div>
                  </div>
                )}
              </PaginationProvider>
            </Card>
          ) : (
            <h4>No results found.</h4>
          )}
        </div>
      )}
    </React.Fragment>
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
    this.getOrganizationLocations();
  }

  getAllItems = (pageSize) => {
    this.setState({
      item_options: [],
    });
    this.props
      .items( pageSize)
      .then((items, id) => {
        console.log(items)
        if (items.items && items.items.status === 200) {
          this.setState({
            items: items.items.data,
            total: items.items.data.total,
            totalItems: items.items.data.length,
          });
        }
      });
  };

  getOrganizationLocations = () => {
    this.props.getOrganizationLocations().then((locations) => {
      if (locations.locations && locations.locations.status === 201) {
        this.setState({
          locations: locations.locations.data.data.length,
        });
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
          <DropdownToggle caret color={"test"}>
            <span className="h3 mb-3">All Items </span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>All</DropdownItem>
            <DropdownItem>Draft</DropdownItem>
            <DropdownItem>Pending Approval</DropdownItem>
            <DropdownItem>Approved</DropdownItem>
            <DropdownItem>Partially Received</DropdownItem>
            <DropdownItem>Unpaid</DropdownItem>
            <DropdownItem>Overdue</DropdownItem>
            <DropdownItem>Paid</DropdownItem>
            <DropdownItem>Void</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Advanced Search</DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <ItemsTable
          items={this.state.items}
          totalItems={this.state.totalItems}
          total={this.state.total}
          getAllItems={this.getAllItems}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  items: itemActions.getAllItems,
  getOrganizationLocations: organizationActions.getOrganizationLocations,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Items));
