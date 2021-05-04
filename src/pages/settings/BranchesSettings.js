import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import Select from "react-select";

const { SearchBar } = Search;

const options = [
  { value: "Every Hour", label: "Every Hour" },
  { value: "Every 30 Minitues", label: "Every 30 Minitues" }
];

const date = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Staurday", label: "Staurday" },
  { value: "Sunday", label: "Sunday" }
];

const time = [
  { value: "8 AM", label: "8 AM" },
  { value: "9 AM", label: "9 AM" },
  { value: "10 AM", label: "10 AM" },
  { value: "11 AM", label: "11 AM" }
];

const tableData = [
  {
    name: "Maharagama",
    address: "78, Galle Rd, Maharagama",
    assigned_employee: "Jeff Gross & 2 others"
  },
  {
    name: "Nugegoda",
    address: "56, High level Rd, Nugegoda",
    assigned_employee: "Ross Massey & 2 others"
  }
];

const UsersStaff = prop => (
  <Card>
    <ToolkitProvider
      keyField="name"
      data={tableData}
      columns={prop.tableColumns}
      exportCSV
      search
    >
      {props => (
        <div>
          <CardHeader>
            <div className="float-right pull-right">
              <SearchBar {...props.searchProps} />
            </div>
            <CardTitle tag="h4">2 Branches Listed</CardTitle>
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
                sizePerPageList: [5, 10, 25, 50]
              })}
            />
          </CardBody>
        </div>
      )}
    </ToolkitProvider>
  </Card>
);

class BranchesSettings extends React.Component {
  state = {};

  toggle = () => {
    this.setState(state => ({
      index: !state.index
    }));
  };

  componentWillMount() {
    this.setState(() => ({
      index: false
    }));
  }

  tableColumns = [
    {
      dataField: "name",
      text: "Name",
      sort: false
    },
    {
      dataField: "address",
      text: "Address",
      headerStyle: (colum, colIndex) => {
        return { width: "30%" };
      },
      sort: false
    },

    {
      dataField: "assigned_employee",
      text: "Assigned Employee",
      sort: false
    },

    {
      dataField: "action",
      text: "Action",
      sort: false,
      formatter: this.actionFormatter
    }
  ];

  actionFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div>
        <Link to="">
          <span className="mr-2 mb-1">Edit</span>
        </Link>
        <Link to="">
          <span className="mr-1 mb-1">Delete</span>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <Container fluid className="p-0">
        <div className=" float-right pull-right ">
          <Button onClick={() => this.toggle()} className="" color="info">
            Add New Branch
          </Button>
        </div>
        <Modal
          isOpen={this.state.index}
          toggle={() => this.toggle()}
          centered
          size="md"
        >
          <ModalHeader toggle={() => this.toggle()}>Add Employee</ModalHeader>
          <ModalBody className="text-center m-3">
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                Branch Name
              </Label>
              <Col sm={6}>
                <Input type="text" name="branch_name" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                Address
              </Label>
              <Col sm={6}>
                <Input type="text" name="address" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                Contact Number
              </Label>
              <Col sm={6}>
                <Input type="text" name="contact_number" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                Time slot
              </Label>
              <Col sm={6}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={options}
                  placeholder="Select Transmission Type"
                  isSearchable
                  isClearable
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                Work Hours
              </Label>
              <Col sm={4}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={date}
                  placeholder="Select Date"
                  isSearchable
                  isClearable
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right"></Label>
              <Col sm={4}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={date}
                  placeholder="Select Date"
                  isSearchable
                  isClearable
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right"></Label>
              <Col sm={4}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={date}
                  placeholder="Select Date"
                  isSearchable
                  isClearable
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right"></Label>
              <Col sm={4}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={date}
                  placeholder="Select Date"
                  isSearchable
                  isClearable
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right"></Label>
              <Col sm={4}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={date}
                  placeholder="Select Date"
                  isSearchable
                  isClearable
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right"></Label>
              <Col sm={4}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={date}
                  placeholder="Select Date"
                  isSearchable
                  isClearable
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right"></Label>
              <Col sm={4}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={date}
                  placeholder="Select Date"
                  isSearchable
                  isClearable
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
              <Col>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={time}
                />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle()}>
              Add Branch
            </Button>
          </ModalFooter>
        </Modal>
        <h1 className="h3 mb-3">Branches</h1>
        <UsersStaff tableColumns={this.tableColumns} />
      </Container>
    );
  }
}

export default BranchesSettings;
