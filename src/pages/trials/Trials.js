import React from "react";
import { Link } from "react-router-dom";

import Statistics from "./Statistics";
import TrialTable from "./TrialTable";
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
  ModalHeader,
  UncontrolledTooltip
} from "reactstrap";

import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamation,
  faGlobeAmericas,
  faInfo,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import Select from "react-select";
import moment from "moment";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

import { MinusCircle, PlusCircle } from "react-feather";
const { SearchBar } = Search;

const options = [
  { value: "pass", label: "Pass" },
  { value: "fail", label: "Fail" }
];

const trial_time = [
  { value: "9 AM", label: "9 AM" },
  { value: "10 AM", label: "10 AM" },
  { value: "11 AM", label: "11 AM" },
  { value: "12 PM", label: "12 PM" },
  { value: "1 PM", label: "1 PM" },
  { value: "2 PM", label: "2 PM" }
];

const tableData = [
  {
    name: "Tiger Nixon",
    ref: "A-00098",
    reg_no: "BM28765",
    result: "Pending",
    type: "Medical",
    date_and_time: "12 Aug 2019 | 09.00 AM",
    nic: "968798657v",
    status: "Blocked",
    phone_number: "704-993-5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Garrett Winters",
    ref: "A-00099",
    reg_no: "BM28765",
    result: "Passed",
    type: "Medical",
    date_and_time: "12 Aug 2019 | 09.00 AM",
    nic: "987604356v",
    status: "Completed",
    phone_number: "704-993-5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Ashton Cox",
    ref: "A-00100",
    reg_no: "BM28765",
    result: "Pending",
    type: "Written",
    date_and_time: "12 Aug 2019 | 09.00 AM",
    nic: "897643986v",
    status: "Completed",
    phone_number: "704-993-5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Cedric Kelly",
    ref: "A-00101",
    reg_no: "BM28765",
    result: "Passed",
    type: "Medical",
    date_and_time: "12 Aug 2019 | 09.00 AM",
    nic: "917608435v",
    status: "Completed",
    phone_number: "704-993-5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Airi Satou",
    ref: "A-00102",
    reg_no: "BM28765",
    result: "Pending",
    type: "Medical",
    date_and_time: "12 Aug 2019 | 09.00 AM",
    nic: "887643986v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Brielle Williamson",
    ref: "A-00103",
    reg_no: "BM28765",
    result: "Pending",
    type: "Written",
    date_and_time: "12 Aug 2019 | 09.00 AM",
    nic: "867567435v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Herrod Chandler",
    ref: "A-00104",
    reg_no: "BM28765",
    result: "Pending",
    type: "Medical",
    date_and_time: "12 Aug 2019 | 09.00 AM",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Rhona Davidson",
    ref: "A-00105",
    reg_no: "BM28765",
    result: "Pending",
    type: "Medical",
    date_and_time: "12 Aug 2019 | 09.00 AM",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Colleen Hurst",
    ref: "A-00098",
    reg_no: "BM28765 Francisco",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Sonya Frost",
    ref: "A-00098",
    reg_no: "BM28765",
    result: "Pending",
    type: "Medical",
    date_and_time: "12 Aug 2019 | 09.00 AM",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Jena Gaines",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Quinn Flynn",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Charde Marshall",
    ref: "A-00098",
    reg_no: "00001 Francisco",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Haley Kennedy",
    ref: "A-00098 Designer",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Tatyana Fitzpatrick",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Michael Silva",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Paul Byrd",
    ref: "A-00098 reg_nor (00001)",
    reg_no: "00001 York",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Gloria Little",
    ref: "A-00098",
    reg_no: "00001 York",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Bradley Greer",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Dai Rios",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Jenette Caldwell",
    ref: "A-00098",
    reg_no: "00001 York",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Yuri Berry",
    ref: "A-00098 reg_nor (00001)",
    reg_no: "00001 York",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Caesar Vance",
    ref: "A-00098 Support",
    reg_no: "00001 York",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Doris Wilder",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Angelica Ramos",
    ref: "A-00098 reg_nor (00001)",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Gavin Joyce",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Jennifer Chang",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Brenden Wagner",
    ref: "A-00098",
    reg_no: "00001 Francisco",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Fiona Green",
    ref: "A-00098 reg_nor (00001)",
    reg_no: "00001 Francisco",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Shou Itou",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Michelle House",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Suki Burks",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Prescott Bartlett",
    ref: "A-00098",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Gavin Cortez",
    ref: "A-00098",
    reg_no: "00001 Francisco",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Martena Mccray",
    ref: "A-00098 support",
    reg_no: "00001",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  },
  {
    name: "Unity Butler",
    ref: "A-00098",
    reg_no: "00001 Francisco",
    nic: "968798657v",
    status: "Completed",
    phone_number: "704 - 993 - 5435",
    branch: "colombo",
    company: "Xoom Software",
    email: "test@xoomsoftware.com"
  }
];
class Trials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trial_date: new Date(),
      trial_time: new Date(),
      customer: {}
    };
  }

  tableColumns = [
    {
      dataField: "name",
      text: "Name",
      sort: false,
      formatter: this.nameFormatter,
      headerStyle: (colum, colIndex) => {
        return { width: "25%" };
      }
    },
    {
      dataField: "nic",
      text: "NIC",
      sort: true
    },

    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: this.statusFormatter
    },

    {
      dataField: "phone_number",
      text: "Mobile No",
      sort: false,
      headerStyle: (colum, colIndex) => {
        return { width: "25%" };
      }
    },

    {
      dataField: "action",
      text: "Action",
      sort: false,
      formatter: this.actionFormatter.bind(this)
    }
  ];

  actionFormatter(cell, row, rowIndex, formatExtraData) {
    if (row.status === "Blocked") {
      return <span className="">Select</span>;
    } else {
      const self = this;
      return (
        <div>
          <Button
            outline
            color="primary"
            onClick={() => this.selecetCustomer(row)}
          >
            <span className="">Select</span>
          </Button>
        </div>
      );
    }
  }

  statusFormatter(cell, row) {
    if (cell === "Blocked") {
      return (
        <div>
          <span
            id="UncontrolledTooltip"
            className="badge badge-danger ml-0 mr-1 mb-1"
          >
            Blocked <FontAwesomeIcon icon={faExclamation} />
          </span>
          <UncontrolledTooltip placement="bottom" target="UncontrolledTooltip">
            Tooltip on
          </UncontrolledTooltip>
        </div>
      );
    } else {
      return (
        <span className="badge badge-success ml-0 mr-1 mb-1">Completed</span>
      );
    }
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

  toggle = () => {
    this.setState(state => ({
      selectCustomerModal: !state.selectCustomerModal
    }));
  };

  selecetCustomer = customer => {
    this.setState(state => ({
      addExamModal: !state.addExamModal,
      closeAll: false,
      customer: customer
    }));
  };

  toggleNested = () => {
    this.setState(state => ({
      addExamModal: !state.addExamModal,
      closeAll: false
    }));
  };

  toggleAll = () => {
    this.setState(state => ({
      addExamModal: !state.addExamModal,
      closeAll: true
    }));
  };

  closeAssignmentTable = () => {
    console.log("asdf");
    this.setState(state => ({
      index: !state.index
    }));
  };

  componentWillMount() {
    this.setState(() => ({
      index: false,
      selectCustomerModal: false,
      addExamModal: false,
      closeAll: false
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
  render() {
    return (
      <Container fluid className="p-0">
        <div className=" float-right pull-right ">
          <Button onClick={() => this.toggle()} color="primary">
            Assign a Trial
          </Button>
        </div>
        <Modal
          isOpen={this.state.selectCustomerModal}
          toggle={() => this.toggle()}
          centered
          size="lg"
        >
          <ModalHeader toggle={() => this.toggle()}>
            Select Customer
          </ModalHeader>
          <ModalBody>
            <ToolkitProvider
              keyField="name"
              data={tableData}
              columns={this.tableColumns}
              exportCSV
              search
            >
              {props => (
                <div>
                  <div className="float-left">
                    <SearchBar {...props.searchProps} />
                  </div>

                  <div className="float-right pull-right">
                    <UncontrolledButtonDropdown className="ml-3 mr-1">
                      <DropdownToggle caret outline color="secondary">
                        Stats{" "}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Today</DropdownItem>
                        <DropdownItem>This Week</DropdownItem>
                        <DropdownItem>This Month</DropdownItem>
                        <DropdownItem>This Year</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <UncontrolledButtonDropdown className="ml-1 mr-3 mb-0">
                      <DropdownToggle caret outline color="secondary">
                        Branch{" "}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>All Branches</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </div>

                  <BootstrapTable
                    responsive={true}
                    striped
                    hover
                    {...props.baseProps}
                    bootstrap4
                    hover={true}
                    bordered={false}
                    // rowEvents={this.rowEvents}
                    pagination={paginationFactory({
                      sizePerPage: 5,
                      sizePerPageList: [5, 10, 25, 50]
                    })}
                  />
                </div>
              )}
            </ToolkitProvider>

            {/* Add_trial_model */}
            <Modal
              isOpen={this.state.addExamModal}
              toggle={() => this.toggleNested()}
              onClosed={this.state.closeAll ? () => this.toggle() : undefined}
            >
              <ModalHeader toggle={() => this.toggleNested()}>
                Add Trial
              </ModalHeader>
              <ModalBody className="text-center m-3">
                <Row>
                  <span className="h3 mt-0  ml-2 mr-2">
                    {this.state.customer.name}
                  </span>

                  <Col>
                    <Button
                      className="float-right"
                      onClick={() => this.toggleNested()}
                      color="primary"
                      outline
                      size="sm"
                    >
                      Change Customer
                    </Button>
                  </Col>
                </Row>
                <FormGroup row>
                  <span className="badge badge-primary mt-0  ml-2 mr-2 mb-1">
                    H | 19 | 190
                  </span>

                  <span className="badge badge-primary  mt-0 ml-2 mr-2 mb-1">
                    Auto
                  </span>
                </FormGroup>
                <ModalFooter></ModalFooter>
                <FormGroup row>
                  <Label sm={3} className="text-sm-right">
                    Trial Type
                  </Label>
                  <Col sm={6}>
                    <Select
                      className="react-select-container"
                      classNamePrefix="react-select"
                      options={options}
                      placeholder="Select Trial Type"
                      isSearchable
                      isClearable
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={3} className="text-sm-right">
                    Trial Date
                  </Label>
                  <Col sm={6}>
                    <DatePickerInput
                      value={this.state.trial_date}
                      onChange={this.setTrialDate}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={3} className="text-sm-right">
                    Trial Time
                  </Label>
                  <Col sm={6}>
                    <Select
                      className="react-select-container"
                      classNamePrefix="react-select"
                      options={trial_time}
                      placeholder="Select Trial Time"
                      isSearchable
                      isClearable
                    />
                  </Col>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => this.toggleAll()}>
                  Add Trials
                </Button>
              </ModalFooter>
            </Modal>
          </ModalBody>
        </Modal>
        <h1 className="h3 mb-3 mr-4">
          Trials{" "}
          <UncontrolledButtonDropdown className="ml-3 mr-1">
            <DropdownToggle caret outline color="secondary">
              Stats{" "}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Today</DropdownItem>
              <DropdownItem>This Week</DropdownItem>
              <DropdownItem>This Month</DropdownItem>
              <DropdownItem>This Year</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <UncontrolledButtonDropdown className="ml-1 mr-3 mb-0">
            <DropdownToggle caret outline color="secondary">
              Branch{" "}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>All Branches</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </h1>

        <Statistics />
        <TrialTable />
      </Container>
    );
  }
}

export default Trials;
