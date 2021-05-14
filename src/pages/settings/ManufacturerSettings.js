import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { manufacturerActions } from "../../redux/actions/manufacturerActions";
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
import { Edit2, Trash2 } from "react-feather";
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


const UsersStaff = (prop) => (
  <Card>
    <ToolkitProvider
      keyField="_id"
      data={prop.tableData}
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
            <CardTitle tag="h4">{prop.tableData.length} Manufacturers Listed</CardTitle>
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

class ManufacturerSettings extends React.Component {
  state = {
    toastrInstance: "",
    toastrTitle: "",
    toastrMessage: "",
    values: {
      manufacturerName: "",
      isActive: true,
    },
    reg_year: new Date(),
    manufacturers:[],
    edit_manufacturer:{}
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

  
  editToggle = () => {
    this.setState((state) => ({
      editToggle: !state.editToggle,
    }));
  };

  componentWillMount() {
    this.setState(() => ({
      index: false,
    }));
  }

  componentDidMount() {
    this.getManufacturers();
  }

  getManufacturers = () => {
    this.props.getManufacturers().then((manufacturers) => {
      if (manufacturers.manufacturers && manufacturers.manufacturers.status == 200) {
        this.setState({
          manufacturers: manufacturers.manufacturers.data,
          total: manufacturers.manufacturers.data.length,
          totalManufacturers: manufacturers.manufacturers.data.length,
        });
      }
    });
  };

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
      dataField: "manufacturerName",
      text: "Manufacturer",
      sort: false,
    },
    {
      dataField: "status",
      text: "Status",
      formatter: this.statusFormatter,
      sort: false,
    },
    {
      dataField: "action",
      text: "Action",
      sort: false,
      formatter: this.actionFormatter.bind(this),
    },
  ];

  statusFormatter(cell, row) {
    if (row) {
      if (cell === 1) {
        return (
          <span className="badge badge-danger ml-0 mr-1 mb-1">Inactive</span>
        );   
      } else {
        return <span className="badge badge-success ml-0 mr-1 mb-1">Active</span>;
      }
    }
  }

  actionFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div>
        <Button
            onClick={()=> this.editManufacturer(row)}
          color="outline"
          className="mt-n1"
        >
          <Edit2 className="align-middle ml-1" size={18} />
        </Button>
        <Button
          onClick={()=> this.deleteItem(row._id)}
          color="outline"
          className="mt-n1 "
        >
          <Trash2 className="align-middle ml-1" size={18} />
        </Button>
      </div>
    );
  }

  editManufacturer = (row) =>{
    const newState = this.state
    newState.edit_manufacturer = row
    newState.editToggle = true
    this.setState(newState)
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.values[field] = value;
    this.setState(newState);
  };

  deleteItem =(id) => {
    this.setState((state) => ({
      deleteToggle: !state.deleteToggle,
      deleteID: id
    }));
  }

  deleteToggle = () => {
    this.setState((state) => ({
      deleteToggle: !state.deleteToggle,
    }));
  };

  confirmDeleteItem = () =>{
    this.props.deleteManufacturer(this.state.deleteID).then((item) => {
      if (item.status === 200) {
        this.setState({
          toastrInstance: "success",
          toastrTitle: "Success",
          toastrMessage: "You have successfully deleted a item",
        });
        this.deleteToggle()
        this.showToastr();
        window.location.reload();
        this.props.history.push("/settings", {
          activeTab: 7,
        });
       
      }else{
        this.setState({
          toastrInstance: "error",
          toastrTitle: "Error",
          toastrMessage: "Something went wrong please try again",
        });
        this.showToastr();
      }
    });
  }

  handleUpdateFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.edit_manufacturer[field] = value;
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
    console.log(this.state)
    this.props
      .createManufacturer(this.state.values)
      .then((resp) => {
        if (resp) {
          console.log(resp)
          if (resp.status === 200) {
            this.setState({
              index: false,
              toastrInstance: "success",
              toastrTitle: "Success",
              toastrMessage: "You have successfully created a manufacturer",
            });
            this.showToastr();
            this.props.history.push("/settings", {
              activeTab: 7,
            });
            window.location.reload();
          } else {
            this.setState({
              toastrInstance: "error",
              toastrTitle: "Error",
              toastrMessage: "Somthing went wrong please try again",
            });
            this.showToastr();
          }
        }
      });
  };

  handleUpdate = async (event) => {
    console.log(this.state)
    this.props
      .updateManufacturer(this.state.edit_manufacturer, this.state.edit_manufacturer._id)
      .then((resp) => {
        if (resp) {
          console.log(resp)
          if (resp.status === 200) {
            this.setState({
              editToggle: false,
              toastrInstance: "success",
              toastrTitle: "Success",
              toastrMessage: "You have successfully updated a manufacturer",
            });
            this.getManufacturers()
            this.showToastr();
            window.location.reload();
            this.props.history.push("/settings", {
              activeTab: 7,
            });
          } else {
            this.setState({
              toastrInstance: "error",
              toastrTitle: "Error",
              toastrMessage: "Somthing went wrong please try again",
            });
            this.showToastr();
          }
        }
      });
  };

  render() {
    return (
      <Container fluid className="p-0">
        <div className=" float-right pull-right ">
          <Button onClick={() => this.toggle()} className="" color="info">
            Add New Manufacturer
          </Button>
        </div>
        <Modal
          isOpen={this.state.index}
          toggle={() => this.toggle()}
          centered
          size="md"
        >
          <ModalHeader toggle={() => this.toggle()}>Add Manufacturer</ModalHeader>
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
                    name="manufacturerName"
                    value={this.state.values.manufacturerName}
                    onChange={(event) =>
                      this.handleFieldChange("manufacturerName", event.target.value)
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
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Add Manufacturer
              </Button>

            </ModalFooter>
          </AvForm>
        </Modal>

        <Modal
          isOpen={this.state.editToggle}
          toggle={() => this.editToggle()}
          centered
          size="md"
        >
          <ModalHeader toggle={() => this.editToggle()}>Edit Manufacturer</ModalHeader>
          <AvForm
            onValidSubmit={this.handleUpdate}
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
                    name="manufacturerName"
                    value={this.state.edit_manufacturer?.manufacturerName}
                    onChange={(event) =>
                      this.handleUpdateFieldChange("manufacturerName", event.target.value)
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
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
               Save
              </Button>

            </ModalFooter>
          </AvForm>
        </Modal>

        <Modal
          isOpen={this.state.deleteToggle}
          toggle={() => this.deleteToggle()}
          centered
          size="md"
        >
          <ModalHeader toggle={() => this.deleteToggle()}>Alert</ModalHeader>

          <ModalBody className="text-center m-3">
            <p className="mb-0">Are you sure you want to delete this manufacturer?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.confirmDeleteItem()}>
              Yes
            </Button>
            <Button color="secondary" onClick={() => this.deleteToggle()}>
              No
            </Button>{" "}
          </ModalFooter>
        </Modal>
        <h1 className="h3 mb-3">Manufacturers</h1>
        <UsersStaff tableColumns={this.tableColumns}  tableData={this.state.manufacturers}/>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  createManufacturer: manufacturerActions.create,
  getManufacturers: manufacturerActions.getManufacturers,
  updateManufacturer: manufacturerActions.update,
  deleteManufacturer : manufacturerActions.deleteManufacturer
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(ManufacturerSettings));

