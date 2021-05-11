import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { inventoryAdjustmentActions } from "../../redux/actions/inventoryAdjustmentActions";
import { organizationActions } from "../../redux/actions/organizationAction";
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
  Row,
  FormGroup,
  Input,
} from "reactstrap";
import { MoreHorizontal, Edit2, Eye } from "react-feather";

import BootstrapTable from "react-bootstrap-table-next";
import Moment from "moment";

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
    dataField: "inventory.item_details.item.name",
    text: "Name",
    formatter: nameFormatter,
    sort: true,
  },
  {
    dataField: "inventory.organization_location.name",
    text: "Location",
    sort: true,
  },

  {
    dataField: "adjustment_reason.name",
    text: "Reason",
    sort: false,
  },
  {
    dataField: "adjustment_status_lookup_id",
    text: "Status",
    formatter: statusFormatter,
    sort: false,
  },
  {
    dataField: "created_at",
    text: "Date Created",
    formatter: dateFormatter,
    sort: true,
  },
  {
    dataField: "actions",
    text: "Action(s)",
    formatter: actionFormatter,
    sort: true,
  },
];

function nameFormatter(cell, row) {
  if (row) {
    if (row.inventory.item_option) {
      return (
        cell +
        " (" +
        row.inventory.item_option.value.map((value) => value.value) +
        " )"
      );
    } else {
      return cell;
    }
  }
}

function dateFormatter(cell, row, rowIndex, formatExtraData) {
  if (cell) {
    return <div className="text-primary">{Moment(cell).format("L")}</div>;
  }
}

function statusFormatter(cell, row) {
  if (cell === 1) {
    return <span className="badge badge-secondary ml-0 mr-1 mb-1">Draft</span>;
  } else if (cell === 2) {
    return <span className="badge badge-warning ml-0 mr-1 mb-1">Adjusted</span>;
  }
}

function actionFormatter(cell, row) {
  if (row) {
    return (
      <Button
        tag={Link}
        to={{
          pathname: `/items/inventory-adjustment/${row.id}`,
          state: {
            id: row.id,
            sales_order: row,
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

const InventoryAdjustmentTable = (props) => {
  const tableData = props.adjustments;
  const options = {
    custom: true,
    totalSize: props.total,
    // sizePerPage: 5,
    sizePerPageList: [10, 25, 50],
    onPageChange: (page, sizePerPage) => {
      props.getInventoryAdjustmentsWithFilters(sizePerPage * page);
    },
    onSizePerPageChange: (sizePerPage, page) => {
      props.getInventoryAdjustmentsWithFilters(sizePerPage, page);
    },
  };

  const callbackFunction = (childData) => {
    props.getSearchValue(childData);
  };

  return (
    <React.Fragment>
      {props.totalAdjustments === null ? (
        <h4>Loading...</h4>
      ) : (
        <div>
          {props.totalAdjustments !== 0 ? (
            <Card>
              <PaginationProvider pagination={paginationFactory(options)}>
                {({ paginationProps, paginationTableProps }) => (
                  <div>
                    <CardHeader>
                      <CardTitle tag="h4">
                        <CardHeader>
                          <Row className="float-right mb-3">
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                              <Input
                                className="form-control"
                                placeholder="Search"
                                style={{ fontSize: "18px" }}
                                onChange={(event) =>
                                  props.getSearchValue(event.target.value)
                                }
                                type="text"
                              />
                            </FormGroup>
                          </Row>
                        </CardHeader>
                      </CardTitle>
                    </CardHeader>
                    <BootstrapTable
                      keyField="id"
                      responsive={true}
                      striped
                      hover
                      bootstrap4
                      bordered={false}
                      data={props.adjustments}
                      // rowEvents={prop.rowEvents}
                      columns={tableColumns}
                      {...paginationTableProps}
                      noDataIndication="No results"
                    />
                    {props.adjustments.length !== 0 ? (
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

class InventoryAdjustment extends React.Component {
  state = {
    filter: {
      name: "",
      location_id: "",
    },
    adjustments: [],
    locationsOptionList: [],
    startDate: null,
    endDate: null,
    focusedInput: null,
    totalAdjustments: null,
    total: 0,
    locationDropDownLabel: "All Inventory Adjustments",
  };
  componentDidMount() {
    this.getOrganizationLocations();
    this.getInventoryAdjustments(10, 1);
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

  getInventoryAdjustments = (pageSize, page) => {
    this.props.getInventoryAdjustments(pageSize, page).then((adjustments) => {
      if (adjustments.adjustments && adjustments.adjustments.status === 201) {
        this.setState({
          adjustments: adjustments.adjustments.data.data.data,
          total: adjustments.adjustments.data.data.total,
          totalAdjustments: adjustments.adjustments.data.data.data.length,
        });
      }
    });
  };

  getInventoryAdjustmentsWithFilters = (pageSize, page, filter) => {
    this.setState({
      sizePerPage: pageSize,
    });
    this.props
      .getInventoryAdjustmentsWithFilters(pageSize, page, this.state.filter)
      .then((adjustments) => {
        if (adjustments.adjustments && adjustments.adjustments.status === 201) {
          this.setState({
            adjustments: adjustments.adjustments.data.data.data,
            total: adjustments.adjustments.data.data.total,
          });
        }
      });
  };

  getSearchValue = (value) => {
    const newState = { ...this.state };

    newState.filter.name = value;

    this.setState(newState);

    this.getInventoryAdjustmentsWithFilters(this.state.sizePerPage, 1);
  };

  handleLocationClick = (value, label) => {
    const newState = { ...this.state };

    newState.filter.location_id = value;
    newState.locationDropDownLabel = label;

    this.setState(newState);

    this.getInventoryAdjustmentsWithFilters(this.state.sizePerPage, 1);
  };

  render() {
    const {
      total,
      adjustments,
      totalAdjustments,
      locationDropDownLabel,
      locationsOptionList,
    } = this.state;
    return (
      <Container fluid className="p-0 container-fluid">
        <Button
          tag={Link}
          to="/items/inventory-adjustments/new"
          color="primary"
          className="float-right mt-n1"
        >
          <FontAwesomeIcon icon={faPlus} /> Add
        </Button>
        <UncontrolledButtonDropdown key={0} className="mr-1 mb-3">
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
        <InventoryAdjustmentTable
          adjustments={adjustments}
          totalAdjustments={totalAdjustments}
          total={total}
          getSearchValue={this.getSearchValue}
          getInventoryAdjustmentsWithFilters={
            this.getInventoryAdjustmentsWithFilters
          }
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  getInventoryAdjustmentsWithFilters:
    inventoryAdjustmentActions.getInventoryAdjustmentsWithFilters,
  getInventoryAdjustments: inventoryAdjustmentActions.getInventoryAdjustments,
  getOrganizationLocations: organizationActions.getOrganizationLocations,
};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(InventoryAdjustment)
);
