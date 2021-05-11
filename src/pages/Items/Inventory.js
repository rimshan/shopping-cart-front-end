import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { inventoryActions } from "../../redux/actions/inventoryActions";
import { organizationActions } from "../../redux/actions/organizationAction";

import {
  Card,
  CardBody,
  CardHeader,
  Container,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
  CardTitle,
} from "reactstrap";
import { MoreHorizontal } from "react-feather";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
  PaginationTotalStandalone,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator";

const tableColumns = [
  {
    dataField: "item_details.item.name",
    text: "Name",
    sort: true,
    formatter: nameFormatter,
  },
  {
    dataField: "item_details.selling_price",
    text: "Selling Price",
    sort: true,
  },
  {
    dataField: "item_details.sku",
    text: "SKU",
    sort: true,
  },
  {
    dataField: "incoming_stock",
    text: "Incoming Stock",
    sort: true,
  },
  {
    dataField: "quantity_on_hand",
    text: "Stock In Hand",
    sort: true,
    formatter: stockInHandFormatter,
  },
  {
    dataField: "organization_location.name",
    text: "Location",
    sort: true,
  },
];

function nameFormatter(cell, row) {
  if (row) {
    if (row.item_details.item_option) {
      let name =
        cell +
        " (" +
        row.item_details.item_option.value.map((value) => value.value) +
        ")";
      return name;
    } else {
      return cell;
    }
  }
}

function stockInHandFormatter(cell, row) {
  if (row) {
    if (Number(row.reorder_level) >= Number(cell)) {
      return <span className="badge badge-danger ml-0 mr-1 mb-1">{cell}</span>;
    } else {
      return <span className=" ml-0 mr-1 mb-1">{cell}</span>;
    }
  }
}

const InventoryTable = (props) => {
  const options = {
    custom: true,
    totalSize: props.total,
    //sizePerPage: 10,
    sizePerPageList: [10, 25, 50],
    onPageChange: (page, sizePerPage) => {
      props.getInventoriesWithFilters(sizePerPage * page);
    },
    onSizePerPageChange: (sizePerPage, page) => {
      props.getInventoriesWithFilters(sizePerPage, page);
    },
  };

  const callbackFunction = (childData) => {
    // prop.getSearchValue(childData);
  };

  return (
    <React.Fragment>
      {props.totalInventories === null ? (
        <h4>Loading...</h4>
      ) : (
        <div>
          {props.totalInventories !== 0 ? (
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
                      data={props.inventories}
                      // rowEvents={prop.rowEvents}
                      columns={tableColumns}
                      {...paginationTableProps}
                      noDataIndication="No results"
                    />
                    {props.inventories.length !== 0 ? (
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

class Inventory extends React.Component {
  state = {
    filter: {
      location_id: null,
      stat: null,
    },
    sizePerPage: 5,
    inventories: [],
    total: 0,
    totalInventories: null,
    locationsOptionList: [],
    locationDropDownLabel: "All Inventories",
  };

  componentDidMount() {
    this.getOrganizationLocations();
    this.getInventories(10, 1);
  }

  getOrganizationLocations = () => {
    this.props.getOrganizationLocations().then((locations) => {
      if (locations.locations) {
        if (locations.locations.status === 201) {
          let LocationList = locations.locations.data.data.map((data) => ({
            value: data.id,
            label: data.name,
          }));
          this.setState({
            locationsOptionList: LocationList,
          });
        }
      }
    });
  };

  getInventories = (pageSize, page) => {
    this.setState({
      sizePerPage: pageSize,
    });
    this.props.getInventories(pageSize, page).then((inventories) => {
      if (inventories.inventories) {
        if (inventories.inventories.status === 201) {
          this.setState({
            inventories: inventories.inventories.data.data.data,
            total: inventories.inventories.data.data.total,
            totalInventories: inventories.inventories.data.data.data.length,
          });
        }
      }
    });
  };

  getInventoriesWithFilters = (pageSize, page, filter) => {
    if (pageSize) {
      this.setState({
        sizePerPage: pageSize,
      });
      this.props
        .getInventoriesWithFilters(pageSize, page, this.state.filter)
        .then((inventories) => {
          if (inventories.inventories.status === 201) {
            this.setState({
              inventories: inventories.inventories.data.data.data,
              total: inventories.inventories.data.data.total,
              totalInventories: inventories.inventories.data.data.data.length,
            });
          }
        });
    } else {
      this.props
        .getinventoriesWithFilters(
          this.state.sizePerPage,
          page,
          this.state.filter
        )
        .then((inventories) => {
          if (inventories.inventories.status === 201) {
            this.setState({
              inventories: inventories.inventories.data.data.data,
              total: inventories.inventories.data.data.total,
              totalInventories: inventories.inventories.data.data.data.length,
            });
          }
        });
    }
  };

  handleLocationClick = (value, label) => {
    const newState = { ...this.state };

    newState.filter.location_id = value;
    newState.locationDropDownLabel = label;

    this.setState(newState);

    this.getInventoriesWithFilters(this.state.sizePerPage, 1);
  };

  render() {
    const {
      inventories,
      totalInventories,
      total,
      locationsOptionList,
      locationDropDownLabel,
    } = this.state;
    return (
      <Container fluid className="p-0 container-fluid">
        <UncontrolledButtonDropdown className="mr-3 mb-3">
          <DropdownToggle caret color={"test"}>
            <span className="h3 mb-3"> {locationDropDownLabel} </span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => this.handleLocationClick(null, "All Inventories")}
            >
              All Inventories
            </DropdownItem>
            {locationsOptionList.map((location) => {
              return (
                <DropdownItem
                  key={location.value}
                  onClick={() =>
                    this.handleLocationClick(location.value, location.label)
                  }
                >
                  {location.label}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <InventoryTable
          getInventoriesWithFilters={this.getInventoriesWithFilters}
          inventories={inventories}
          totalInventories={totalInventories}
          total={total}
        />
      </Container>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  getInventories: inventoryActions.getInventories,
  getInventoriesWithFilters: inventoryActions.getInventoriesWithFilters,
  getOrganizationLocations: organizationActions.getOrganizationLocations,
};

export default withRouter(connect(mapState, actionCreators)(Inventory));
