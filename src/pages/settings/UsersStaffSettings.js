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

import avatar4 from "../../assets/img/avatars/avatar-4.jpg";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import Select from "react-select";

const { SearchBar } = Search;

const options = [
  { value: "pass", label: "Pass" },
  { value: "fail", label: "Fail" }
];

const tableData = [
  {
    name: "Tiger Nixon",
    user_name: "Tiger",
    ref: "A-00098",
    reg_no: "BM28765",
    emp_type: "Super Admin",
    last_activity: "16 Feb 2019",
    nic: "968798657v",

    phone_number: "704-993-5435",
    branch: "Nugegoda"
  },
  {
    name: "Garrett Winters",
    user_name: "Garrett",
    ref: "A-00099",
    reg_no: "BM28765",
    emp_type: "Editor",
    last_activity: "01 Nov 2019",
    nic: "987604356v",

    phone_number: "704-993-5435",
    branch: "Dehiwala"
  },
  {
    name: "Ashton Cox",
    user_name: "Ashton",
    ref: "A-00100",
    reg_no: "BM28765",
    emp_type: "Instructor",
    last_activity: "05 Sep 2019",
    nic: "897643986v",

    phone_number: "704-993-5435",
    branch: "Nugegoda"
  },
  {
    name: "Cedric Kelly",
    user_name: "Cedric",
    ref: "A-00101",
    reg_no: "BM28765",
    emp_type: "Editor",
    last_activity: "15 Jul 2019",
    nic: "917608435v",

    phone_number: "704-993-5435",
    branch: "Dehiwala"
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
            <CardTitle tag="h4">4 Employee Listed</CardTitle>
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

class UsersStaffSettings extends React.Component {
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
      sort: true,
      formatter: this.nameFormatter,
      headerStyle: (colum, colIndex) => {
        return { width: "25%", textAlign: "left" };
      }
    },
    {
      dataField: "user_name",
      text: "User Name",
      sort: true
    },

    {
      dataField: "branch",
      text: "Branch",
      sort: true
    },
    {
      dataField: "last_activity",
      text: "Last Activity",
      sort: false
    },
    {
      dataField: "emp_type",
      text: "Emp. Type",
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

  nameFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div>
        <img
          src={avatar4}
          width="28"
          height="28"
          className="rounded-circle mr-2"
          alt="Avatar"
        />
        {cell}
      </div>
    );
  }

  render() {
    return (
      <Container fluid className="p-0">
        <div className=" float-right pull-right ">
          <Button onClick={() => this.toggle()} className="" color="info">
            Add New Staff
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
                Employee Type
              </Label>
              <Col sm={6}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={options}
                  placeholder="Select Employee Type"
                  isSearchable
                  isClearable
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                Name
              </Label>
              <Col sm={6}>
                <Input type="text" name="name" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                User Name
              </Label>
              <Col sm={6}>
                <Input type="text" name="user_name" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                Branch
              </Label>
              <Col sm={6}>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={options}
                  placeholder="Select Employee Type"
                  isSearchable
                  isClearable
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                Email
              </Label>
              <Col sm={6}>
                <Input type="email" name="email" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                Phone Number
              </Label>
              <Col sm={6}>
                <Input type="number" name="phone_number" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3} className="text-sm-right">
                NIC
              </Label>
              <Col sm={6}>
                <Input type="text" name="nic" />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle()}>
              Add User
            </Button>
          </ModalFooter>
        </Modal>
        <h1 className="h3 mb-3">Users {"&"} Staff </h1>
        <UsersStaff tableColumns={this.tableColumns} />
      </Container>
    );
  }
}

export default UsersStaffSettings;
