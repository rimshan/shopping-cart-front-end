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
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  UncontrolledButtonDropdown,
  Label,
  UncontrolledTooltip,
  UncontrolledCollapse,
  Input
} from "reactstrap";

import dragula from "react-dragula";

import { MoreHorizontal } from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamation,
  faPlus,
  faAngleDown,
  faAngleUp
} from "@fortawesome/free-solid-svg-icons";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import Select from "react-select";
import moment from "moment";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

const { SearchBar } = Search;

const options = [
  { value: "pass", label: "Pass" },
  { value: "fail", label: "Fail" }
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

class Lane extends React.Component {
  state = {
    isOpen: false
  };
  handleContainerLoaded = container => {
    if (container) {
      this.props.onContainerLoaded(container);
    }
  };

  changeToggleState = () => {
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  };

  render() {
    const { name, children, time, id } = this.props;

    return (
      <div>
        {name === "search" ? (
          <div>
            <Input
              type="search"
              placeholder="Search Lessons..."
              className="mt-1 mb-2"
            ></Input>
          </div>
        ) : name ? (
          <div className="mb-4">
            <div className="card-actions float-right">
              <UncontrolledDropdown>
                <DropdownToggle tag="a">
                  <MoreHorizontal />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem>Something else here</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>

            <h5>{name}</h5>
          </div>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle tag="h6">
              <Button color="primary" outline size="sm" className="mr-2">
                <FontAwesomeIcon icon={faPlus} />
              </Button>

              <FontAwesomeIcon
                className="float-right"
                id={id}
                icon={this.state.isOpen ? faAngleUp : faAngleDown}
              />

              {time}
            </CardTitle>
          </CardHeader>
          <UncontrolledCollapse
            toggler={id}
            onEntered={() => this.changeToggleState()}
            onExit={() => this.changeToggleState()}
          >
            <CardBody className="p-3">
              <div ref={this.handleContainerLoaded}>{children}</div>
            </CardBody>
          </UncontrolledCollapse>
        </Card>
      </div>
    );
  }
}

const Task = ({ onClick, id, checked, text, avatar, customer, status }) => (
  <Card className="mb-3 bg-light cursor-grab border">
    <CardHeader>
      <Row>
        <div className="float-left mt-n1 mr-1">
          <img
            src={avatar}
            width="32"
            height="32"
            className="rounded-circle"
            alt="Avatar"
          />
        </div>
        <span className="float-left mr-1">{customer}</span>
        <div className="float-right">
          {status === "Attended" ? (
            <span className="float-right badge badge-success">{status}</span>
          ) : status === "Learning" ? (
            <span className="float-right badge badge-info">{status}</span>
          ) : (
            <span className="float-right badge badge-danger">{status}</span>
          )}
        </div>
      </Row>
    </CardHeader>
    <CardBody className="p-3">
      <Row>
        <span className="mr-2 h7">{text}</span>
        <div className="float-right">
          <Link to="">
            <span className="mr-1">Edit</span>
          </Link>
          <Link to="">
            <span className="mr-0">Delete</span>
          </Link>
        </div>
      </Row>
    </CardBody>
  </Card>
);

class Tasks extends React.Component {
  constructor(props) {
    super(props);

    this.containers = [];

    this.state = {
      lesson_date: new Date(),
      customer: {},
      show: true
    };
  }

  onContainerReady = container => {
    this.containers.push(container);
  };

  componentDidMount() {
    dragula(this.containers);
  }
  toggle = () => {
    this.setState(state => ({
      selectCustomerModal: !state.selectCustomerModal
    }));
  };

  onShow = () => {
    this.setState(state => ({
      show: !state.show
    }));
  };

  selectCustomer = customer => {
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

  setLessonDate = date => {
    this.setState({
      lesson_date: date
    });
  };

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
            onClick={() => this.selectCustomer(row)}
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

  render = () => (
    <Container fluid className="p-0">
      <Button
        color="primary"
        className="float-right"
        onClick={() => this.toggle()}
      >
        New Lesson
      </Button>
      <h1 className="h3 mb-3">Lessons</h1>

      <Row>
        <Col lg="6" xl="3">
          <div>
            <Lane
              id="manual9"
              name="Manual Vehicles"
              time="9 AM - 10 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="1"
                avatar={avatar1}
                customer="Carla Jhonson"
                text="+94778645389"
                checked
              />
              <Task
                status="Absent"
                id="2"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
                checked
              />
            </Lane>
          </div>

          <div>
            <Lane
              id="manual10"
              time="10 AM - 11 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="6"
                customer="Carla Jhonson"
                avatar={avatar1}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="7"
                customer="Carla Jhonson"
                avatar={avatar3}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="8"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="manual11"
              time="11 AM - 12 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="9"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="10"
                customer="Carla Jhonson"
                avatar={avatar3}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="manual12"
              time="12 AM - 1 PM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="13"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
              <Task
                id="14"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="manual1"
              time="1 PM - 2 PM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                id="13"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
              <Task
                id="14"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
            </Lane>
          </div>
        </Col>

        <Col lg="6" xl="3">
          <div>
            <Lane
              id="auto9"
              name="Auto Vehicles"
              time="9 AM - 10 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Learning"
                onClick={() => this.onShow()}
                id="1"
                avatar={avatar1}
                customer="Carla Jhonson"
                text="+94778645389"
                checked
              />
              <Task
                status="Attended"
                id="2"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
                checked
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="auto10"
              time="10 AM - 11 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="6"
                customer="Carla Jhonson"
                avatar={avatar1}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="7"
                customer="Carla Jhonson"
                avatar={avatar3}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="8"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="auto11"
              time="11 AM - 12 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="9"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="10"
                customer="Carla Jhonson"
                avatar={avatar3}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="auto12"
              time="12 AM - 1 PM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="13"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="14"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="auto1"
              time="1 PM - 2 PM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="13"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="14"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
            </Lane>
          </div>
        </Col>

        <Col lg="6" xl="3">
          <div>
            <Lane
              id="bike9"
              name="Bike and Tri-wheeler"
              time="9 AM - 10 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                onClick={() => this.onShow()}
                id="1"
                avatar={avatar1}
                customer="Carla Jhonson"
                text="+94778645389"
                checked
              />
              <Task
                status="Attended"
                id="2"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
                checked
              />
            </Lane>
          </div>

          <div>
            <Lane
              id="bike10"
              time="10 AM - 11 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="6"
                customer="Carla Jhonson"
                avatar={avatar1}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="7"
                customer="Carla Jhonson"
                avatar={avatar3}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="8"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="bike11"
              time="11 AM - 12 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="9"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="10"
                customer="Carla Jhonson"
                avatar={avatar3}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="bike12"
              time="12 AM - 1 PM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="13"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="14"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="bike1"
              time="1 PM - 2 PM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="13"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="14"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
            </Lane>
          </div>
        </Col>

        <Col lg="6" xl="3">
          <div>
            <Lane
              id="bs"
              name="search"
              time="9 AM - 10 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                onClick={() => this.onShow()}
                id="1"
                avatar={avatar1}
                customer="Carla Jhonson"
                text="+94778645389"
                checked
              />
              <Task
                status="Attended"
                id="2"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
                checked
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="c"
              time="10 AM - 11 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="6"
                customer="Carla Jhonson"
                avatar={avatar1}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="7"
                customer="Carla Jhonson"
                avatar={avatar3}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="8"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="d"
              time="11 AM - 12 AM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="9"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="10"
                customer="Carla Jhonson"
                avatar={avatar3}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="e"
              time="12 AM - 1 PM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="13"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="14"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
            </Lane>
          </div>
          <div>
            <Lane
              id="f"
              time="1 PM - 2 PM"
              onContainerLoaded={this.onContainerReady}
            >
              <Task
                status="Attended"
                id="13"
                customer="Carla Jhonson"
                avatar={avatar2}
                text="+94778645389"
              />
              <Task
                status="Attended"
                id="14"
                customer="Carla Jhonson"
                avatar={avatar4}
                text="+94778645389"
              />
            </Lane>
          </div>
        </Col>
      </Row>

      <Modal
        isOpen={this.state.selectCustomerModal}
        toggle={() => this.toggle()}
        centered
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Select Customer</ModalHeader>
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

          {/* Add_exam_model */}
          <Modal
            isOpen={this.state.addExamModal}
            toggle={() => this.toggleNested()}
            onClosed={this.state.closeAll ? () => this.toggle() : undefined}
          >
            <ModalHeader toggle={() => this.toggleNested()}>
              Add Lesson
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
                  Time Slot
                </Label>
                <Col sm={8}>
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
                <Label sm={3} className="text-sm-right">
                  Lesson Date
                </Label>
                <Col sm={8}>
                  <DatePickerInput
                    value={this.state.lesson_date}
                    onChange={this.setLessonDate}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Branch
                </Label>
                <Col sm={8}>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={options}
                    placeholder="Select Branch"
                    isSearchable
                    isClearable
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Vehicle Type
                </Label>
                <Col sm={8}>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={options}
                    placeholder="Select Vehicle Type"
                    isSearchable
                    isClearable
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Vehicle
                </Label>
                <Col sm={8}>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={options}
                    placeholder="Select Vehicle"
                    isSearchable
                    isClearable
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Instructor
                </Label>
                <Col sm={8}>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={options}
                    placeholder="Select Instructor"
                    isSearchable
                    isClearable
                  />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.toggleAll()}>
                Add Lesson
              </Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default Tasks;
