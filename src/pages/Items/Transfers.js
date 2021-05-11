import React from "react";
import { Link } from "react-router-dom";
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
  UncontrolledButtonDropdown
} from "reactstrap";
import { MoreHorizontal, Eye } from "react-feather";

import BootstrapTable from "react-bootstrap-table-next";

import paginationFactory from "react-bootstrap-table2-paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const tableData = [
  {
    id: 1,
    name: "t-shirt-XL",
    transfer: "T0001",
    sku: "T-S-XL",
    stock_in_hand: "10 In",
    reorder_level: 5,
    status: "Pending",
    order: "ORD-000001",
    reason: "Reason",
    source_location: "Location A",
    destination_location: "Location B",
    refference: "1234",
    email: "pavan@xoomsoftware.com",
    receivables: "$320,800",
    payables: "$320,800",
    createdDate: "26 Jan 2020"
  },
  {
    id: 2,
    name: "t-shirt-M",
    transfer: "T0002",
    sku: "T-S-M",
    stock_in_hand: "10 In",
    reorder_level: 5,
    status: "Completed",
    order: "ORD-000001",
    reason: "Reason",
    source_location: "Location A",
    destination_location: "Location B",
    refference: "1234",
    email: "pavan@xoomsoftware.com",
    receivables: "$320,800",
    payables: "$320,800",
    createdDate: "26 Jan 2020"
  },
  {
    id: 3,
    name: "t-shirt-L",
    transfer: "T0003",
    sku: "T-S-L",
    stock_in_hand: "10 In",
    reorder_level: 5,
    status: "Pending",
    order: "ORD-000001",
    reason: "Reason",
    source_location: "Location A",
    destination_location: "Location B",
    refference: "1234",
    email: "pavan@xoomsoftware.com",
    receivables: "$320,800",
    payables: "$320,800",
    createdDate: "26 Jan 2020"
  },
  {
    id: 4,
    name: "rice",
    transfer: "T0004",
    sku: "rice01",
    stock_in_hand: "10 kg",
    reorder_level: 1,
    status: "Partial",
    order: "ORD-000001",
    reason: "Reason",
    source_location: "Location A",
    destination_location: "Location B",
    refference: "1234",
    email: "pavan@xoomsoftware.com",
    receivables: "$320,800",
    payables: "$320,800",
    createdDate: "26 Jan 2020"
  }
];

const tableColumns = [
  {
    dataField: "order",
    text: "Transfer #",
    sort: true
  },
  {
    dataField: "source_location",
    text: "Locations",
    formatter: locationFromatter,
    sort: false
  },
  {
    dataField: "reorder_level",
    text: "Quantity",
    sort: false
  },
  {
    dataField: "reason",
    text: "Reason",
    sort: false
  },

  {
    dataField: "status",
    text: "Status",
    formatter: statusFormatter,
    sort: true
  },
  {
    dataField: "createdDate",
    text: "Date Created",
    sort: true
  },

  {
    dataField: "actions",
    text: "Action(s)",
    formatter: actionFormatter,
    sort: true
  }
];

function actionFormatter(cell, row) {
  // return <Eye className="align-middle ml-1" size={18} />;
  return (
    <Button
      tag={Link}
      to={{
        pathname: `/items/transfer/${row.id}`,
        state: {
          transfer: row
        }
      }}
      color="outline"
      className="mt-n1"
    >
      <Eye className="align-middle ml-1" size={18} />
    </Button>
  );
}

function statusFormatter(cell, row) {
  if (cell === "Pending") {
    return <span className="badge badge-warning ml-0 mr-1 mb-1">{cell}</span>;
  } else if (cell === "Partial") {
    return <span className="badge badge-warning ml-0 mr-1 mb-1">{cell}</span>;
  } else {
    return <span className="badge badge-success ml-0 mr-1 mb-1">{cell}</span>;
  }
}

function locationFromatter(cell, row) {
  return (
    <span>
      From {cell} To {row.destination_location}
    </span>
  );
}

const RowSelectionTable = () => {
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    bgColor: "#f8f9fa"
  };
  return (
    <Card>
      <CardHeader>
        <div className="card-actions float-right">
          <UncontrolledDropdown>
            <DropdownToggle tag="a">
              <MoreHorizontal />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Archive Transfers</DropdownItem>
              <DropdownItem>Unarchive Transfers</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <CardTitle tag="h5">Export CSV</CardTitle>
        <h6 className="card-subtitle text-muted">
          Exportable CSV by react-bootstrap-table2
        </h6>
      </CardHeader>
      <CardBody>
        <BootstrapTable
          bootstrap4
          bordered={false}
          keyField="id"
          data={tableData}
          columns={tableColumns}
          selectRow={selectRow}
          pagination={paginationFactory({
            sizePerPage: 10,
            sizePerPageList: [5, 10, 25, 50]
          })}
        />
      </CardBody>
    </Card>
  );
};

const Transfers = () => (
  <Container fluid className="p-0 container-fluid">
    <Button
      tag={Link}
      to="/items/transfers/new"
      color="primary"
      className="float-right mt-n1"
    >
      <FontAwesomeIcon icon={faPlus} /> New
    </Button>
    <UncontrolledButtonDropdown key={0} className="mr-1 mb-3">
      <DropdownToggle caret color={"test"}>
        <span className="h3 mb-3">All Transfers </span>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>All</DropdownItem>
        <DropdownItem>Pending</DropdownItem>
        <DropdownItem>Partial</DropdownItem>
        <DropdownItem>Completed</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>All Locations</DropdownItem>
        <DropdownItem>Warehouse A</DropdownItem>
        <DropdownItem>Warehouse B</DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>

    {/* <PaginationTable /> */}
    <RowSelectionTable />
    {/* <ExpandableRowsTable />
    <ExportCSVTable /> */}
  </Container>
);

export default Transfers;
