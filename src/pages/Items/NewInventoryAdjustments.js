import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { organizationActions } from "../../redux/actions/organizationAction";
import { itemActions } from "../../redux/actions/itemActions";
import { inventoryAdjustmentActions } from "../../redux/actions/inventoryAdjustmentActions";
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  CustomInput,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Plus, Trash2 } from "react-feather";
import { toastr } from "react-redux-toastr";
import { async } from "validate.js";
const Quantities = [{ value: 1, label: 2 }];

const options = [
  { value: "Repair and Maintainance", label: "Repair and Maintainance" },
  {
    value: "Salaries and Employee Wages",
    label: "Salaries and Employee Wages",
  },
  { value: "Telephone Expense", label: "Telephone Expense" },
  { value: "Travel Expense", label: "Travel Expense" },
  { value: "Uncategorized", label: "Uncategorized" },
  { value: "Cost of Goods Sold", label: "Cost of Goods Sold" },
];
const customStyles = {
  control: (base, state) => ({
    ...base,
    // state.isFocused can display different borderColor if you need it
    borderColor: "red",
    // overwrittes hover style
    "&:hover": {
      borderColor: "red",
    },
  }),
};

const SectionOne = (props) => (
  <Card>
    <CardBody>
      <Form>
        <FormGroup row>
          <Label sm={2} className="text-sm-right required">
            Reference
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="refference"
              placeholder="Reference"
              onChange={(event) =>
                props.handleFieldChange("reference", event.target.value)
              }
              invalid={props.showReferenceError ? true : false}
            />
            {props.showReferenceError && (
              <span style={{ color: "red", fontSize: "12px" }}>
                Reference is required!
              </span>
            )}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right required">
            Reason
          </Label>
          <Col sm={10}>
            <CreatableSelect
              className="react-select-container"
              classNamePrefix="react-select"
              options={props.ReasonOptionList}
              placeholder="Reason"
              onChange={props.handleReasonChange}
              isSearchable
              isClearable
              styles={props.showReasonError ? customStyles : ""}
            />
            {props.showReasonError && (
              <span style={{ color: "red", fontSize: "12px" }}>
                Reason is required!
              </span>
            )}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right required">
            Location
          </Label>
          <Col sm={10}>
            <Select
              className="react-select-container"
              classNamePrefix="react-select"
              options={props.LocationOptionList}
              value={props.LocationOptionList.filter(
                (option) => option.value === props.organization_location_id
              )}
              onChange={(event) => props.handleLocationFieldChange(event.value)}
              placeholder="Location"
              styles={props.showLocationError ? customStyles : ""}
              isSearchable
            />
            {props.showLocationError && (
              <span style={{ color: "red", fontSize: "12px" }}>
                Location is required!
              </span>
            )}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right required">
            Description
          </Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="textarea"
              placeholder="Description"
              rows="4"
              onChange={(event) =>
                props.handleFieldChange("description", event.target.value)
              }
              invalid={props.showDescriptionError ? true : false}
            />
            {props.showDescriptionError && (
              <span style={{ color: "red", fontSize: "12px" }}>
                Description is required!
              </span>
            )}
          </Col>
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
);

const ItemRows = (props) => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5">Item details</CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label className="required">Item</Label>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Quantity Available</Label>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label className="required">New Quantity</Label>
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Quantity Adjusted</Label>
            </FormGroup>
          </Col>
        </Row>

        {props.values.items.map((item, index) => (
          <Row form key={item.id}>
            <Col md={3}>
              <FormGroup>
                <Select
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={props.ItemOptionList}
                  onChange={(event) =>
                    props.handleSelectItem(event.value, index)
                  }
                  isDisabled={
                    props.values.organization_location_id === null
                      ? true
                      : false
                  }
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Input disabled defaultValue={item.quantity} />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Input
                  type="number"
                  placeholder=""
                  onChange={(event) =>
                    props.handleItemQuantityChange(event.target.value, index)
                  }
                  disabled={
                    props.values.organization_location_id === null
                      ? true
                      : false
                  }
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Input
                  type="number"
                  placeholder=""
                  defaultValue={item.quantity_adjusted}
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Button
                  onClick={() => props.handleRemoveItem(index)}
                  color="danger"
                  size="sm"
                  className="mr-1  mb-0 float-right"
                  outline
                >
                  <Trash2 />
                </Button>
              </FormGroup>
            </Col>
          </Row>
        ))}

        <Row>
          <Col md={3}>
            <FormGroup>
              <Button
                color="primary"
                className="mr-1 mb-1"
                outline
                onClick={props.handleAddAnotherItem}
              >
                <Plus /> Add another Item
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>
);

const ActionPanel = (props) => (
  <Form>
    <Button
      color="primary"
      className="mr-1 mb-1"
      outline
      onClick={() => props.handleSubmit(1)}
      disabled={
        props.values.items.length === 0 ||
        props.values.items[0].item_detail_id === null
          ? true
          : false
      }
    >
      Save as Draft
    </Button>
    <Button
      color="primary"
      className="mr-1 mb-1"
      onClick={() => props.handleSubmit(2)}
      disabled={
        props.values.items.length === 0 ||
        props.values.items[0].item_detail_id === null
          ? true
          : false
      }
    >
      Submit
    </Button>

    <Button color="primary" className="mr-1 mb-1" outline>
      Cancel
    </Button>
  </Form>
);

class NewInventoryAdjustment extends React.Component {
  state = {
    date: new Date(),
    expected_delivery_date: new Date(),
    locationConfirmationToggle: false,
    LocationOptionList: [],
    ItemOptionList: [],
    OrganizationItemOptionList: [],
    ReasonOptionList: [],
    organization_location_temp_id: null,
    values: {
      contact_id: null,
      organization_id: localStorage.getItem("organization_id"),
      reference: null,
      organization_location_id: null,
      user_id: null,
      inventory_adjustment_reason_id: null,
      description: null,
      items: [
        {
          id: 1,
          item_detail_id: null,
          inventory_id: null,
          reorder_level: null,
          quantity: null,
          new_quantity: null,
          quantity_adjusted: null,
        },
      ],
    },
    touched: {
      contact_id: false,
      reference: false,
      organization_location_id: false,
      user_id: false,
      inventory_adjustment_reason_id: false,
      description: false,
    },
  };

  setDate = (date) => {
    this.setState({
      date: date,
    });
  };

  setExpectedDeliveryDate = (date) => {
    this.setState({
      expected_delivery_date: date,
    });
  };

  componentDidMount() {
    this.getOrganizationLocations();
    this.getItemDetails();
    this.getInventoryAdjustmentReasons();
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

  getOrganizationLocations = () => {
    this.props.getOrganizationLocations().then((locations) => {
      if (locations.locations && locations.locations.status === 201) {
        let LocationList = locations.locations.data.data.map((data) => ({
          value: data.id,
          label: data.name,
        }));
        this.setState({
          LocationOptionList: LocationList,
        });
      }
    });
  };

  getInventoryAdjustmentReasons = () => {
    this.props.getInventoryAdjustmentReasons().then((reasons) => {
      if (reasons.reasons && reasons.reasons.status === 201) {
        let ReasonList = reasons.reasons.data.data.map((data) => ({
          value: data.id,
          label: data.name,
        }));
        this.setState({
          ReasonOptionList: ReasonList,
        });
      }
    });
  };

  getItemDetails = () => {
    this.props.getItemDetails().then((item_details) => {
      if (
        item_details.item_details &&
        item_details.item_details.status === 201
      ) {
        let ItemList = item_details.item_details.data.data.map((data) =>
          data.item_option
            ? {
                value: data,
                label:
                  data.item.name +
                  " (" +
                  data.item_option.value.map((value) => value.value) +
                  ")",
              }
            : { value: data, label: data.item.name }
        );
        this.setState({
          ItemOptionList: ItemList,
        });
      }
    });
  };

  handleAddAnotherItem = () => {
    const newState = { ...this.state };
    newState.values.items = newState.values.items.concat([
      {
        id:
          newState.values.items.length !== 0
            ? newState.values.items[newState.values.items.length - 1].id + 1
            : 1,
        item_detail_id: null,
        reorder_level: null,
        quantity: null,
        new_quantity: null,
        quantity_adjusted: null,
      },
    ]);
    this.setState(newState);
  };

  handleRemoveItem = (index) => {
    const newState = { ...this.state };
    newState.values.items.splice(index, 1);
    this.setState(newState);
  };

  handleSelectItem = (value, arrayIndex) => {
    const newState = { ...this.state };
    const inventory = value.inventory.find(
      (i) =>
        i.organization_location_id === newState.values.organization_location_id
    );
    newState.values.items[arrayIndex] = {
      ...newState.values.items[arrayIndex],
      item_detail_id: value.id,
      inventory_id: inventory.id,
      quantity: inventory.quantity_on_hand,
      reorder_level: value.reorder_level,
    };
    this.setState(newState);
  };

  handleReasonChange = (value) => {
    const newState = { ...this.state };
    if (value) {
      if (value.__isNew__) {
        newState.values.inventory_adjustment_reason_id = value;
      } else {
        newState.values.inventory_adjustment_reason_id = value.value;
      }
    } else {
      newState.values.inventory_adjustment_reason_id = value;
    }

    this.setState(newState);
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.values[field] = value;
    this.setState(newState);
  };

  handleItemQuantityChange = (value, arrayIndex) => {
    const newState = { ...this.state };
    newState.values.items[arrayIndex].new_quantity = value;
    newState.values.items[arrayIndex].quantity_adjusted = value
      ? -(parseInt(newState.values.items[arrayIndex].quantity) - value)
      : null;
    this.setState(newState);
  };

  handleLocationFieldChange = (value) => {
    const newState = { ...this.state };
    if (newState.values.organization_location_id === null) {
      newState.values.organization_location_id = value;
      this.handleItemOptionList(value);
    } else {
      newState.organization_location_temp_id = value;
      newState.locationConfirmationToggle = true;
    }
    this.setState(newState);
  };

  handleChangeLocation = (value) => {
    const newState = { ...this.state };
    if (value) {
      newState.values.organization_location_id =
        newState.organization_location_temp_id;
      newState.values.items = [
        {
          id: 1000,
          item_detail_id: null,
          reorder_level: null,
          quantity: null,
          new_quantity: null,
          quantity_adjusted: null,
        },
      ];
      newState.locationConfirmationToggle = false;
      this.handleItemOptionList(newState.organization_location_temp_id);
    } else {
      newState.locationConfirmationToggle = false;
    }
    this.setState(newState);
  };

  handleItemOptionList = async (id) => {
    var itemOptions = [];
    await this.state.ItemOptionList.map((item) => {
      if (
        item.value.inventory.some(
          (inventory) => inventory.organization_location_id === id
        )
      ) {
        itemOptions.push(item);
      }
    });
    this.setState({ OrganizationItemOptionList: itemOptions });
  };

  handleQuantityEmptyMessege = async () => {
    const newState = { ...this.state };
    newState.toastrInstance = "error";
    newState.toastrTitle = "Error";
    newState.toastrMessage = "Please fill new quantity field(s)";
    await this.setState(newState);

    this.showToastr();
  };

  handleSubmit = async (status_lookup_id) => {
    const newState = { ...this.state };
    newState.values.adjustment_status_lookup_id = status_lookup_id;
    this.setState(newState);
    if (this.state.values.items.length !== 0) {
      if (this.state.values.items.some((item) => item.new_quantity === null)) {
        this.handleQuantityEmptyMessege();
      } else {
        if (
          this.state.values.reference &&
          this.state.values.inventory_adjustment_reason_id &&
          this.state.values.organization_location_id &&
          this.state.values.description
        ) {
          this.props.create(this.state.values).then((adjustment) => {
            if (adjustment) {
              if (adjustment.adjustment.status === 201) {
                this.setState({
                  toastrInstance: "success",
                  toastrTitle: "Success",
                  toastrMessage: "You have successfully created a Location",
                });
                this.showToastr();
                //this.setState(ini)
                // window.location.reload();
                this.props.history.push("/items/inventory-adjustments", {
                  activeTab: 4,
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
        } else {
          const newState = { ...this.state };
          newState.touched.organization_location_id = true;
          newState.touched.reference = true;
          newState.touched.organization_location_id = true;
          newState.touched.description = true;
          newState.touched.inventory_adjustment_reason_id = true;
          newState.toastrInstance = "error";
          newState.toastrTitle = "Error";
          newState.toastrMessage = "Please fill mandatory fields";
          await this.setState(newState);

          this.showToastr();
        }
      }
    } else {
      const newState = { ...this.state };
      newState.touched.user_id = true;
      newState.toastrInstance = "error";
      newState.toastrTitle = "Error";
      newState.toastrMessage = "Please select an item";
      await this.setState(newState);

      this.showToastr();
    }
  };

  render() {
    const {
      LocationOptionList,
      OrganizationItemOptionList,
      values,
      ReasonOptionList,
      touched,
    } = this.state;
    const showReferenceError = touched.reference && values.reference === null;
    const showReasonError =
      touched.inventory_adjustment_reason_id &&
      values.inventory_adjustment_reason_id === null;
    const showDescriptionError =
      touched.description && values.description === null;
    const showLocationError =
      touched.organization_location_id &&
      values.organization_location_id === null;
    return (
      <Container fluid className="p-0">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/items">Items</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/items/inventory-adjustments">Inventory Adjustment</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>New Adjustment</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="h3 mb-3">New Adjustment</h1>
        <SectionOne
          handleFieldChange={this.handleFieldChange}
          ReasonOptionList={ReasonOptionList}
          LocationOptionList={LocationOptionList}
          handleReasonChange={this.handleReasonChange}
          handleLocationFieldChange={this.handleLocationFieldChange}
          organization_location_id={values.organization_location_id}
          showReferenceError={showReferenceError}
          showReasonError={showReasonError}
          showDescriptionError={showDescriptionError}
          showLocationError={showLocationError}
        />
        <ItemRows
          values={values}
          ItemOptionList={OrganizationItemOptionList}
          handleSelectItem={this.handleSelectItem}
          handleAddAnotherItem={this.handleAddAnotherItem}
          handleRemoveItem={this.handleRemoveItem}
          handleItemQuantityChange={this.handleItemQuantityChange}
        />
        <ActionPanel handleSubmit={this.handleSubmit} values={values} />
        <Modal
          isOpen={this.state.locationConfirmationToggle}
          toggle={() => this.handleChangeLocation(false)}
          centered
          size="md"
        >
          <ModalHeader toggle={() => this.handleChangeLocation(false)}>
            Alert
          </ModalHeader>

          <ModalBody className="text-center m-3">
            <p className="mb-0">
              Changing the location will reset the item adjustments. Are you
              sure to proceed ?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              onClick={() => this.handleChangeLocation(true)}
            >
              Yes
            </Button>
            <Button
              color="secondary"
              onClick={() => this.handleChangeLocation(false)}
            >
              No
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  getOrganizationLocations: organizationActions.getOrganizationLocations,
  getItemDetails: itemActions.getItemDetails,
  getInventoryAdjustmentReasons:
    inventoryAdjustmentActions.getInventoryAdjustmentReasons,
  create: inventoryAdjustmentActions.create,
};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(NewInventoryAdjustment)
);
