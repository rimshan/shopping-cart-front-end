import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

import Select from "react-select";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

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

const options = [
  { value: "pass", label: "Pass" },
  { value: "fail", label: "Fail" }
];

const tableData = [
  {
    name: "Garrett Winters",
    ref: "A-00099",
    reg_no: "00002",
    nic: "987604356v",
    startDate: "2011/07/25",
    phone_number: "704-993-5435",
    branch: "colombo"
  },
  {
    name: "Airi Satou",
    ref: "A-00102",
    reg_no: "00005",
    nic: "887643986v",
    startDate: "2008/11/28",
    phone_number: "704 - 993 - 5435",
    branch: "colombo"
  },
  {
    name: "Brielle Williamson",
    ref: "A-00103",
    reg_no: "00006",
    nic: "867567435v",
    startDate: "2012/12/02",
    phone_number: "704 - 993 - 5435",
    branch: "colombo"
  },
  {
    name: "Herrod Chandler",
    ref: "A-00104",
    reg_no: "00007",
    nic: "968798657v",
    startDate: "2012/08/06",
    phone_number: "704 - 993 - 5435",
    branch: "colombo"
  }
];

const tableColumns = [
  {
    dataField: "name",
    text: "Name",
    sort: true
  },
  {
    dataField: "ref",
    text: "Ref",
    sort: true
  },
  {
    dataField: "reg_no",
    text: "Reg No",
    sort: true
  },
  {
    dataField: "nic",
    text: "NIC",
    sort: true
  }
  // {
  //   dataField: "startDate",
  //   text: "Start Date",
  //   sort: true
  // },
  //   {
  //     dataField: "phone_number",
  //     text: "Phone number",
  //     sort: true
  //   },
  //   {
  //     dataField: "branch",
  //     text: "Branch",
  //     sort: true
  //   },
  //   {
  //     dataField: "action",
  //     text: "Action",
  //     sort: false,
  //     formatter: actionFormatter
  //   }
];

function actionFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <div>
      <Edit2 className="align-middle mr-1" size={18} />
      <Trash className="align-middle" size={18} />
    </div>
  );
}

function nameFormatter(cell, row, rowIndex, formatExtraData) {
  return (
    <div className="row">
      <img
        src={avatar4}
        width="48"
        height="48"
        className="rounded-circle mr-2"
        alt="Avatar"
      />{" "}
      {cell}
    </div>
  );
}

const MyExportCSV = props => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <div>
      <span onClick={handleClick}>Export</span>
    </div>
  );
};

class CustomerTrails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trial_date: new Date(),
      trial_time: new Date()
    };
  }

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

  setTrialDate = date => {
    this.setState({
      trial_date: date
    });
  };

  setExamTime = date => {
    this.setState({
      trial_time: date
    });
  };

  rowEvents = {
    onClick: (e, row, rowIndex) => {}
  };
  render() {
    return (
      <Card>
        <ToolkitProvider
          keyField="name"
          data={tableData}
          columns={tableColumns}
          exportCSV
          search
        >
          {props => (
            <div>
              <CardHeader>
                <CardTitle tag="h5" className="p-1">
                  Trials
                  <div className="float-right pull-right">
                    <Button
                      className=""
                      color="primary"
                      onClick={() => this.toggle()}
                    >
                      Submit Trials
                    </Button>
                  </div>
                </CardTitle>
                <h6 className="card-subtitle text-muted p-1">
                  Single horizontal row.
                </h6>
              </CardHeader>
              <CardBody>
                <Modal
                  isOpen={this.state.index}
                  toggle={() => this.toggle()}
                  centered
                  size="lg"
                >
                  <ModalHeader toggle={() => this.toggle()}>
                    Add Trial
                  </ModalHeader>
                  <ModalBody className="text-center m-3">
                    <FormGroup row>
                      <Label sm={2} className="text-sm-right">
                        Trial Date
                      </Label>
                      <Col sm={2}>
                        <DatePicker
                          placeholderText="Click to select a date"
                          selected={this.state.trial_date}
                          isClearable
                          onChange={date => this.setTrialDate(date)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={2} className="text-sm-right">
                        Trial Time
                      </Label>
                      <Col sm={2}>
                        <DatePicker
                          placeholderText="Click to select a date"
                          selected={this.state.trial_time}
                          isClearable
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          onChange={date => this.setTrialTime(date)}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={2} className="text-sm-right">
                        B
                      </Label>
                      <Col sm={6}>
                        <Select
                          className="react-select-container"
                          classNamePrefix="react-select"
                          options={options}
                          placeholder="Select Exam Result"
                          isSearchable
                          isClearable
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm={2} className="text-sm-right">
                        A
                      </Label>
                      <Col sm={6}>
                        <Select
                          className="react-select-container"
                          classNamePrefix="react-select"
                          placeholder="Select Exam Result"
                          options={options}
                          isSearchable
                          isClearable
                        />
                      </Col>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="secondary" onClick={() => this.toggle()}>
                      Close
                    </Button>{" "}
                    <Button color="primary" onClick={() => this.toggle()}>
                      Submit Trials
                    </Button>
                  </ModalFooter>
                </Modal>
                {/* <Form inline className="pb-4">
                  <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                    <SearchBar {...props.searchProps} />
                    <hr />
                  </FormGroup>
                </Form> */}
                <BootstrapTable
                  responsive
                  striped
                  hover
                  {...props.baseProps}
                  bootstrap4
                  hover={true}
                  bordered={false}
                  rowEvents={this.rowEvents}
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
  }
}

export default withRouter(CustomerTrails);
