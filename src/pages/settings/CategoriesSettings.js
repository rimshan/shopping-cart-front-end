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
  ModalHeader,
  CustomInput,
} from "reactstrap";

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";

import moment from "moment";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import Select from "react-select";
import { toastr } from "react-redux-toastr";
import AvField from "availity-reactstrap-validation/lib/AvField";

const { SearchBar } = Search;

const options = [
  { value: "Auto", label: "Auto" },
  { value: "Manual", label: "Manual" },
];

const tableData = [
  {
    number: "CAX 8824",
    model: "Honda Civic",
    reg_year: "2012",
    transmission: "Auto",
  },
  {
    number: "AAA 9900",
    model: "Bajaj 4-strock indian",
    reg_year: "2019",
    transmission: "Manual",
  },
];

const UsersStaff = (prop) => (
  <Card>
    <ToolkitProvider
      keyField="number"
      data={tableData}
      columns={prop.tableColumns}
      exportCSV
      search
    >
      {(props) => (
        <div>
          <CardHeader>
            <div className="float-right pull-right">
              <SearchBar {...props.searchProps} />
            </div>
            <CardTitle tag="h4">2 Vehicles Listed</CardTitle>
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
                sizePerPageList: [5, 10, 25, 50],
              })}
            />
          </CardBody>
        </div>
      )}
    </ToolkitProvider>
  </Card>
);

class VehicleSettings extends React.Component {
  state = {
    toastrInstance: "",
    toastrTitle: "",
    toastrMessage: "",
    values: {
      description: "",
      isActive: true,
    },
    reg_year: new Date(),
  };

  setRegYear = (date) => {
    this.setState({
      reg_year: date,
    });
  };

  toggle = () => {
    this.setState((state) => ({
      index: !state.index,
    }));
  };

  componentWillMount() {
    this.setState(() => ({
      index: false,
    }));
  }

  showToastr = () => {
    const options = {
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right",
    };

    const toastrInstance =
      this.state.toastrInstance === "error" ? toastr.error : toastr.success;

    toastrInstance(this.state.toastrTitle, this.state.toastrMessage, options);
  };

  tableColumns = [
    {
      dataField: "number",
      text: "Number",
      sort: false,
    },
    {
      dataField: "model",
      text: "Model",
      sort: false,
    },

    {
      dataField: "reg_year",
      text: "Registered Year",
      sort: false,
    },
    {
      dataField: "transmission",
      text: "Transmission",
      sort: false,
    },
    {
      dataField: "action",
      text: "Action",
      sort: false,
      formatter: this.actionFormatter,
    },
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

  handleFieldChange = (field, value) => {
    console.log(value);
    const newState = { ...this.state };
    newState.values[field] = value;
    this.setState(newState);
  };

  handleInvalidSubmit = async (event) => {
    const newState = { ...this.state };
    newState.toastrInstance = "error";
    newState.toastrTitle = "Error";
    newState.toastrMessage = "Please fill mandatory fields";
    await this.setState(newState);

    this.showToastr();
  };

  handleSubmit = async (event) => {
    const category = this.state.values;
    console.log(category);
    // this.props
    //   .createCategory(category, localStorage.getItem("organization_id"))
    //   .then((resp) => {
    //     if (resp) {
    //       if (resp.taxes.status === 201) {
    //         this.setState({
    //           toastrInstance: "success",
    //           toastrTitle: "Success",
    //           toastrMessage: "You have successfully created a category",
    //         });
    //         this.showToastr();
    //         //this.setState(ini)
    //         // window.location.reload();
    //         this.props.history.push("/settings", {
    //           activeTab: 7,
    //         });
    //       } else {
    //         this.setState({
    //           toastrInstance: "error",
    //           toastrTitle: "Error",
    //           toastrMessage: "Somthing went wrong please try again",
    //         });
    //         this.showToastr();
    //       }
    //     }
    //   });
  };

  render() {
    return (
      <Container fluid className="p-0">
        <div className=" float-right pull-right ">
          <Button onClick={() => this.toggle()} className="" color="info">
            Add New Category
          </Button>
        </div>
        <Modal
          isOpen={this.state.index}
          toggle={() => this.toggle()}
          centered
          size="md"
        >
          <ModalHeader toggle={() => this.toggle()}>Add Category</ModalHeader>
          <AvForm
            onValidSubmit={this.handleSubmit}
            onInvalidSubmit={this.handleInvalidSubmit}
          >
            <ModalBody className="text-center m-3">
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Description
                </Label>
                <Col sm={8}>
                  <AvField
                    type="text"
                    name="description"
                    value={this.state.values.description}
                    onChange={(event) =>
                      this.handleFieldChange("description", event.target.value)
                    }
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Description is required!",
                      },
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Is Active
                </Label>
                <Col sm={1} className="mt-1">
                  <CustomInput
                    type="checkbox"
                    id="isActive"
                    label=""
                    checked={this.state.values.isActive}
                    onChange={(event) =>
                      this.handleFieldChange("isActive", event.target.checked)
                    }
                  />
                </Col>
              </FormGroup>
              {/* <FormGroup row>
              <Label sm={3} className="text-sm-right">
                Reg. Year
              </Label>
              <Col sm={6}>
                <DatePickerInput
                  displayFormat="YYYY"
                  value={this.state.reg_year}
                  onChange={this.setRegYear}
                />
              </Col>
            </FormGroup> */}

              {/* <FormGroup row>
              <Label sm={3} className="text-sm-right">
                Transmission
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
            </FormGroup> */}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Add Category
              </Button>

            </ModalFooter>
          </AvForm>
        </Modal>
        <h1 className="h3 mb-3">Categories</h1>
        <UsersStaff tableColumns={this.tableColumns} />
      </Container>
    );
  }
}

export default VehicleSettings;
