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
  UncontrolledPopover,
  UncontrolledTooltip,
  PopoverBody,
  PopoverHeader
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamation,
  faGlobeAmericas,
  faInfo,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

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

const tableData = [
  {
    name: "Tiger Nixon",
    ref: "A-00098",
    reg_no: "BM28765",
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

const tableColumns = [
  {
    dataField: "name",
    text: "Name",
    sort: true,
    formatter: nameFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: "25%", textAlign: "left" };
    }
  },
  {
    dataField: "ref",
    text: "Ref No",
    sort: true,
    formatter: refNoFormatter
  },

  {
    dataField: "nic",
    text: "NIC",
    sort: true
  },
  {
    dataField: "reg_no",
    text: "RMV ID",
    sort: true
  },
  {
    dataField: "status",
    text: "Status",
    sort: false,
    formatter: statusFormatter
  },
  {
    dataField: "phone_number",
    text: "Mobile No",
    sort: false
  },
  {
    dataField: "action",
    text: "Action",
    sort: false,
    formatter: actionFormatter
  }
];

function actionFormatter(cell, row, rowIndex, formatExtraData) {
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

function statusFormatter(cell, row) {
  if (cell === "Blocked") {
    return (
      <div>
        <span id="UncontrolledTooltip" className="badge badge-danger ">
          Blocked <FontAwesomeIcon icon={faExclamation} />
        </span>
        <UncontrolledTooltip placement="bottom" target="UncontrolledTooltip">
          Tooltip on
        </UncontrolledTooltip>
      </div>
    );
  } else {
    return <span className="badge badge-success ">Completed</span>;
  }
}

function nameFormatter(cell, row, rowIndex, formatExtraData) {
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

function refNoFormatter(cell, row, rowIndex, formatExtraData) {
  return <div className="text-primary">{cell}</div>;
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

class CustomerTable extends React.Component {
  rowEvents = {
    onClick: (e, row, rowIndex) => {
      this.props.history.push("/customer-view", { row });
    }
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
                {/* <div className="float-right pull-right">
                  <MyExportCSV {...props.csvProps} />
                </div> */}
                <div className="float-right pull-right">
                  <SearchBar {...props.searchProps} />
                </div>
                <CardTitle tag="h4">2,735 Listed Customers</CardTitle>
              </CardHeader>
              <CardBody>
                {/* <div className="float-right pull-right">
                  <UncontrolledButtonDropdown className="mr-1">
                    <DropdownToggle caret color="secondary">
                      Actions
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <MyExportCSV {...props.csvProps} />
                      </DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                     
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div> */}

                <BootstrapTable
                  responsive={true}
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

export default withRouter(CustomerTable);
