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
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

import { toastr } from "react-redux-toastr";

const SectionOne = (props) => (
  <Card>
    <CardBody>
      <Form>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Reference
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="refference"
              defaultValue={props.adjustment && props.adjustment.reference}
              disabled
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Reason
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="reason"
              defaultValue={
                props.adjustment &&
                props.adjustment.adjustment_reason &&
                props.adjustment.adjustment_reason.name
              }
              disabled
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Location
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="lcoation"
              defaultValue={
                props.adjustment.inventory &&
                props.adjustment.inventory.organization_location &&
                props.adjustment.inventory.organization_location.name
              }
              disabled
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Description
          </Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="textarea"
              rows="4"
              disabled
              value={props.adjustment && props.adjustment.description}
            />
          </Col>
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
);

const ItemRows = (props) => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5">Item detail</CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label>Item</Label>
            </FormGroup>
            <FormGroup>
              <Input
                disabled
                defaultValue={
                  props.inventory.item_details.item_option
                    ? props.inventory.item_details.item.name +
                      " (" +
                      props.inventory.item_details.item_option.value.map(
                        (value) => value.value
                      ) +
                      " )"
                    : props.inventory.item_details.item.name
                }
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Quantity Available</Label>
            </FormGroup>
            <FormGroup>
              <Input
                disabled
                defaultValue={
                  props.inventory.quantity_on_hand
                    ? props.inventory.quantity_on_hand
                    : ""
                }
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>New Quantity</Label>
            </FormGroup>
            <FormGroup>
              <Input
                disabled
                defaultValue={
                  props.inventory.quantity_on_hand
                    ? parseInt(props.inventory.quantity_on_hand) +
                      parseInt(props.adjustment.quantity_adjusted)
                    : ""
                }
              />
            </FormGroup>
          </Col>
          <Col md={2}>
            <FormGroup>
              <Label>Quantity Adjusted</Label>
            </FormGroup>
            <FormGroup>
              <Input
                disabled
                defaultValue={
                  props.adjustment.quantity_adjusted
                    ? props.adjustment.quantity_adjusted
                    : ""
                }
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>
);

const ActionPanel = (props) => (
  <Form>
    {props.adjustment.adjustment_status_lookup_id === 1 && (
      <Button
        color="primary"
        className="mr-1 mb-1"
        onClick={() => props.handleSubmit()}
      >
        Convert to adjustment
      </Button>
    )}
  </Form>
);

class InventoryAdjustmentView extends React.Component {
  state = {
    date: new Date(),
    expected_delivery_date: new Date(),
    adjustment: {
      inventory: {
        item_details: {
          quantity: "",
          item: {
            name: "",
          },
        },
      },
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
    this.getInventoryAdjustment(this.props.match.params.id);
  }

  getInventoryAdjustment = (id) => {
    this.props.getInventoryAdjustment(id).then((adjustment) => {
      if (adjustment.adjustment) {
        if (adjustment.adjustment.status === 201) {
          this.setState({
            adjustment: adjustment.adjustment.data.data,
          });
        }
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

  handleSubmit = async () => {
    const item_detail = this.state.adjustment;
    const id = this.state.adjustment.id;

    this.props.update(item_detail, id).then((adjustment) => {
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
  };

  render() {
    const { adjustment } = this.state;
    return (
      <Container fluid className="p-0">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/items">Items</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/items/inventory-adjustments">Inventory Adjustments</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{this.props.location.state.id}</BreadcrumbItem>
        </Breadcrumb>
        <h1 className="h3 mb-3">
          Inventory Adjustment #{this.props.location.state.id}
        </h1>
        <SectionOne adjustment={adjustment} />
        <ItemRows inventory={adjustment.inventory} adjustment={adjustment} />
        <ActionPanel handleSubmit={this.handleSubmit} adjustment={adjustment} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  getInventoryAdjustment: inventoryAdjustmentActions.getInventoryAdjustment,
  update: inventoryAdjustmentActions.update,
};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(InventoryAdjustmentView)
);
