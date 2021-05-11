import React from "react";
import { connect } from "react-redux";
import { authActions } from "../../redux/actions/authActions";
import { lookupActions } from "../../redux/actions/lookupActions";
import { itemActions } from "../../redux/actions/itemActions";
import { manufacturerActions } from "../../redux/actions/manufacturerActions";
import { brandActions } from "../../redux/actions/brandActions";
import { categoryActions } from "../../redux/actions/categoryActions";
import { organizationActions } from "../../redux/actions/organizationAction";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import S3FileUpload from "react-s3";
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardLink,
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
  UncontrolledTooltip,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormFeedback,
  FormText,
} from "reactstrap";

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";

import { toastr } from "react-redux-toastr";

import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import "react-datepicker/dist/react-datepicker.css";
import { Plus, Trash2, HelpCircle } from "react-feather";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: "uploads",
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY_ID,
  s3Url: process.env.REACT_APP_S3_URL,
};

// const customStyles = {
//   control: (base, state) => ({
//     ...base,
//     // state.isFocused can display different borderColor if you need it
//     borderColor: "red",
//     // overwrittes hover style
//     "&:hover": {
//       //borderColor: "red"
//     }
//   })
// };

const HorizontalForm = (props) => {
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
  return (
    <Container fluid className="p-0">
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/items">Items</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Add item</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="h3 mb-3">Add item</h1>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Basic Details</CardTitle>
        </CardHeader>
        <CardBody>
          <AvGroup row>
            <Label sm={2} className="text-sm-right"></Label>
            <Col sm={6}>
              <FilePond
                allowMultiple={true}
                imagePreviewMaxHeight="200"
                onremovefile={(error, file) =>
                  props.handleItemAttachmentsRemove(file)
                }
                onaddfilestart={(file) => props.handleItemAttachments(file)}
              />
            </Col>
          </AvGroup>

          <AvGroup row>
            <Label sm={2} className="text-sm-right required">
              Item Name
            </Label>
            <Col sm={10}>
              <AvInput
                type="text"
                name="productName"
                placeholder="Item Name"
                required
                onChange={(event) =>
                  props.handleFieldChange("productName", event.target.value)
                }
              />
              <AvFeedback>Item name is required!</AvFeedback>
            </Col>
          </AvGroup>
          <AvGroup row>
            <Label sm={2} className="text-sm-right required">
              Description
            </Label>
            <Col sm={10}>
              <AvInput
                type="textarea"
                name="productDescription"
                rows="3"
                required
                onChange={(event) =>
                  props.handleFieldChange(
                    "productDescription",
                    event.target.value
                  )
                }
              />
              <AvFeedback>Description is required!</AvFeedback>
            </Col>
          </AvGroup>

          <AvGroup row>
            <Label sm={2} className="text-sm-right required">
              Price
            </Label>
            <Col sm={4}>
              <AvInput
                type="number"
                name="productPrice"
                rows="3"
                required
                onChange={(event) =>
                  props.handleFieldChange("productPrice", event.target.value)
                }
              />
              <AvFeedback>Price is required!</AvFeedback>
            </Col>
            <Label sm={2} className="text-sm-right required">
              Quantity
            </Label>
            <Col sm={4}>
              <AvInput
                type="number"
                name="productQuantity"
                rows="3"
                required
                onChange={(event) =>
                  props.handleFieldChange("productQuantity", event.target.value)
                }
              />
              <AvFeedback>Price is required!</AvFeedback>
            </Col>
          </AvGroup>

          <AvGroup row>
            <Label sm={2} className="text-sm-right required">
              Type
            </Label>
            <Col sm={4}>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                options={props.productTypesOptionList}
                onChange={props.handleTypeChange}
                name="Unit"
                styles={props.showUnitError ? customStyles : ""}
              />
              {props.showUnitError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  Type is required!
                </span>
              )}
            </Col>
            <Label sm={2} className="text-sm-right">
              Category
            </Label>
            <Col sm={4}>
              <CreatableSelect
                isClearable
                onChange={props.handleCategoryChange}
                options={props.categoriesOptionList}
              />
            </Col>
          </AvGroup>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              Manufacturer
            </Label>
            <Col sm={4}>
              <CreatableSelect
                isClearable
                onChange={props.handleManufacturerChange}
                options={props.manufacturersOptionList}
              />
            </Col>
            <Label sm={2} className="text-sm-right">
              Brand
            </Label>
            <Col sm={4}>
              <CreatableSelect
                style={{ borderColor: "#dc3545" }}
                isClearable
                onChange={props.handleBrandChange}
                options={props.brandsOptionList}
              />
            </Col>
          </FormGroup>

          {/*    

          <div>
            <CardHeader>
              <CardTitle tag="h5">Item Variants</CardTitle>
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Label sm={2} className="text-sm-right pt-sm-0"></Label>
                <Col sm={10}>
                  <CustomInput
                    type="checkbox"
                    id="returnable_item"
                    label="Returnable Item"
                    onChange={(event) =>
                      props.handleFieldChange("is_returnable", 1)
                    }
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2} className="text-sm-right pt-sm-0"></Label>
                <Col sm={10}>
                  <CustomInput
                    type="checkbox"
                    id="multiple_items"
                    label="This product has options, like sizes, colors, etc."
                    checked={props.props.isChecked}
                    onChange={props.handleChecked}
                  />
                </Col>
              </FormGroup>
              {props.props.isChecked ? (
                <div>
                  <CardTitle tag="h5">Options</CardTitle>
                  {props.item_variant_values.map((productOption, idx) => (
                    <div key={productOption.id}>
                      <FormGroup row>
                        <Label sm={2} className="text-sm-right">
                          Option {idx + 1}
                        </Label>
                        <Col sm={3}>
                          <CreatableSelect
                            className="react-select-container"
                            classNamePrefix="react-select"
                            options={props.variantsOptionList}
                            onChange={(event) =>
                              props.handleItemVariants(
                                idx,
                                event,
                                productOption
                              )
                            }
                          />
                        </Col>
                        <Label sm={2} className="text-sm-right">
                          Values
                        </Label>
                        <Col sm={3}>
                          <CreatableSelect
                            className="react-select-container"
                            classNamePrefix="react-select"
                            options={props.variantsValuesList.filter(
                              (value) =>
                                value.item_variant_id ===
                                productOption.variant_id
                            )}
                            placeholder="Select Values"
                            onChange={(event) =>
                              props.handleAddProductOptionValues(
                                idx,
                                event,
                                productOption
                              )
                            }
                            isSearchable
                            isClearable
                            isMulti
                          />
                        </Col>
                        <Col sm={2}>
                          <FormGroup>
                            <Button
                              onClick={() =>
                                props.handleRemoveProductOptions(idx)
                              }
                              color="danger"
                              size="sm"
                              className="mr-1 mb-1 float-right"
                              outline
                            >
                              <Trash2 />
                            </Button>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                    </div>
                  ))}

                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Button
                          onClick={props.handleAddProductOptions}
                          color="primary"
                          className="mr-1 mb-1"
                          outline
                        >
                          <Plus /> Add another Option
                        </Button>
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              ) : null}
            </CardBody>
          </div> */}
        </CardBody>
      </Card>
    </Container>
  );
};

const ItemRows = (props) => {
  return (
    <React.Fragment>
      {props.props.isChecked ? (
        <Card>
          <CardHeader>
            <CardTitle tag="h5">Items</CardTitle>
          </CardHeader>
          {(props.props.item_options[0] ||
            props.props.item_options.length >= 1) && (
            <CardBody>
              <Row form>
                <Col md={1}>
                  <FormGroup>
                    <Label>Name</Label>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <Label className="required">
                      Selling Price {" ("}
                      {/* {JSON.parse(localStorage.getItem("user")).currency_code} */}
                      {")"}
                    </Label>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label className="required">
                      Purchase Price {" ("}
                      {/* {JSON.parse(localStorage.getItem("user")).currency_code} */}
                      {")"}
                    </Label>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <Label className="required">SKU</Label>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <Label className="required">Opening Stock</Label>
                  </FormGroup>
                </Col>
                <Col md={1}>
                  <FormGroup>
                    <Label className="required">Reorder Level</Label>
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <Label className="required">Locations</Label>
                  </FormGroup>
                </Col>
              </Row>

              <div>
                {props.props.item_options.map((values, idx) =>
                  values.value ? (
                    <div
                      key={values.value.map((val) => {
                        return val.value;
                      })}
                    >
                      <Row form>
                        <Col md={1}>
                          <FormGroup>
                            <Input
                              type="text"
                              name={"name" + values.value}
                              // placeholder="Username"
                              defaultValue={values.value.map((val) => {
                                return val.value;
                              })}
                              disabled
                            />
                          </FormGroup>
                        </Col>

                        <Col md={2}>
                          <AvGroup>
                            <InputGroup className="mb-3">
                              <AvInput
                                type="number"
                                name={
                                  "selling_price" +
                                  values.value.map((val) => {
                                    return val.value;
                                  })
                                }
                                onChange={(event) =>
                                  props.handleItemValues(
                                    idx,
                                    event.target,
                                    values,
                                    "selling_price"
                                  )
                                }
                                required
                              />
                              <InputGroupAddon addonType="prepend">
                                .00
                              </InputGroupAddon>
                              <AvFeedback>
                                Selling price is required!
                              </AvFeedback>
                            </InputGroup>
                          </AvGroup>
                        </Col>
                        <Col md={2}>
                          <AvGroup>
                            <InputGroup className="mb-3">
                              <AvInput
                                type="number"
                                name={
                                  "purchase_price" +
                                  values.value.map((val) => {
                                    return val.value;
                                  })
                                }
                                onChange={(event) =>
                                  props.handleItemValues(
                                    idx,
                                    event.target,
                                    values,
                                    "purchase_price"
                                  )
                                }
                                required
                              />
                              <InputGroupAddon addonType="prepend">
                                .00
                              </InputGroupAddon>
                              <AvFeedback>
                                Purchase price is required!
                              </AvFeedback>
                            </InputGroup>
                          </AvGroup>
                        </Col>
                        <Col md={2}>
                          <AvGroup>
                            <AvInput
                              type="text"
                              name={
                                "sku" +
                                values.value.map((val) => {
                                  return val.value;
                                })
                              }
                              onChange={(event) =>
                                props.handleItemValues(
                                  idx,
                                  event.target,
                                  values,
                                  "sku"
                                )
                              }
                              required
                            />
                            <AvFeedback>SKU is required!</AvFeedback>
                          </AvGroup>
                        </Col>

                        <Col md={2}>
                          <FormGroup>
                            {values.is_all_locations ? (
                              <AvGroup>
                                <AvInput
                                  type="number"
                                  defaultValue="0"
                                  name={
                                    "quantity" +
                                    values.value.map((val) => {
                                      return val.value;
                                    })
                                  }
                                  onChange={(event) =>
                                    props.handleItemValues(
                                      idx,
                                      event.target,
                                      values,
                                      "quantity"
                                    )
                                  }
                                  required
                                />
                                <AvFeedback>
                                  Opening Stock is required!
                                </AvFeedback>
                              </AvGroup>
                            ) : (
                              <React.Fragment>
                                <CardLink>
                                  <Button
                                    onClick={() => props.toggle()}
                                    color="primary"
                                    className="mr-1 mb-1"
                                    outline
                                  >
                                    {values.total_quantity
                                      ? values.total_quantity
                                      : 0}{" "}
                                    in {props.locations.length} locations
                                  </Button>
                                </CardLink>
                                <Modal
                                  isOpen={props.props.index}
                                  toggle={() => props.toggle()}
                                  centered
                                >
                                  <ModalHeader toggle={() => props.toggle()}>
                                    Edit Locations
                                  </ModalHeader>
                                  <Form>
                                    <ModalBody className="text-center m-3">
                                      <Row form>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label className="float-left">
                                              Location Name
                                            </Label>
                                          </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                          <FormGroup>
                                            <Label className="float-left">
                                              Opening Stock
                                            </Label>
                                          </FormGroup>
                                        </Col>

                                        {props.props.locations.map(
                                          (location, location_index) => (
                                            <React.Fragment
                                              key={location_index}
                                            >
                                              <Col md={6}>
                                                <FormGroup>
                                                  <Input
                                                    type="text"
                                                    name="date"
                                                    defaultValue={location.name}
                                                    disabled
                                                  />
                                                </FormGroup>
                                              </Col>
                                              <Col md={6}>
                                                <FormGroup>
                                                  <Input
                                                    type="number"
                                                    defaultValue={
                                                      values
                                                        .organization_locations[
                                                        location_index
                                                      ].details.quantity
                                                    }
                                                    name={
                                                      "quantity" + location.id
                                                    }
                                                    required
                                                    onChange={(event) =>
                                                      props.handleEditLocation(
                                                        idx,
                                                        location_index,
                                                        event.target,
                                                        values,
                                                        location.id
                                                      )
                                                    }
                                                  />
                                                </FormGroup>
                                              </Col>
                                            </React.Fragment>
                                          )
                                        )}
                                      </Row>
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button
                                        color="secondary"
                                        onClick={() => props.toggle()}
                                      >
                                        Close
                                      </Button>{" "}
                                      <Button
                                        // type="submit"
                                        color="primary"
                                        onClick={() =>
                                          props.handleEditLocationSubmit(
                                            idx,
                                            values
                                          )
                                        }
                                      >
                                        Save changes
                                      </Button>
                                    </ModalFooter>
                                  </Form>
                                </Modal>
                              </React.Fragment>
                            )}
                          </FormGroup>
                        </Col>

                        <Col md={1}>
                          <AvGroup>
                            <AvInput
                              type="number"
                              name={
                                "reorder_level" +
                                values.value.map((val) => {
                                  return val.value;
                                })
                              }
                              defaultValue="0"
                              onChange={(event) =>
                                props.handleItemValues(
                                  idx,
                                  event.target,
                                  values,
                                  "reorder_level"
                                )
                              }
                              // max={(value = "quantity" + idx + id)}
                              validate={
                                {
                                  // max: { value: value.total_locations }
                                }
                              }
                              required
                            />
                            {/* <AvFeedback>Reorder level is required!</AvFeedback> */}
                          </AvGroup>
                        </Col>

                        <Col md={2}>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                id="exampleCustomCheckbox"
                                name={
                                  "locations" +
                                  values.value.map((val) => {
                                    return val.value;
                                  })
                                }
                                label="All Locations"
                                defaultChecked={true}
                                onChange={(event) =>
                                  props.handleItemAllLocation(
                                    idx,
                                    event,
                                    values
                                  )
                                }
                                disabled={props.props.locations.length <= 1}
                              />
                              All Locations
                            </Label>
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  ) : null
                )}
              </div>
            </CardBody>
          )}
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle tag="h5">Item</CardTitle>
          </CardHeader>
          <CardBody>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label className="required">
                    Selling Price{" ("}
                    {/* {JSON.parse(localStorage.getItem("user")).currency_code} */}
                    {")"}
                  </Label>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="required">
                    Purchase Price {" ("}
                    {/* {JSON.parse(localStorage.getItem("user")).currency_code} */}
                    {")"}
                  </Label>
                </FormGroup>
              </Col>

              <Col md={1}>
                <FormGroup>
                  <Label className="required">SKU</Label>
                </FormGroup>
              </Col>

              <Col md={2}>
                <FormGroup>
                  <Label className="required">Opening Stock</Label>
                </FormGroup>
              </Col>
              <Col md={1}>
                <FormGroup>
                  <Label className="required">Reorder Level</Label>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label className="required">Locations</Label>
                </FormGroup>
              </Col>
            </Row>

            <div>
              <Row form>
                <Col md={3}>
                  <AvGroup>
                    <InputGroup className="mb-3">
                      <AvInput
                        type="number"
                        name="selling_price"
                        onChange={(event) =>
                          props.handleOneItemValue(
                            event.target,

                            "selling_price"
                          )
                        }
                        required
                      />
                      <InputGroupAddon addonType="prepend">.00</InputGroupAddon>
                      <AvFeedback>Selling price is required!</AvFeedback>
                    </InputGroup>
                  </AvGroup>
                </Col>
                <Col md={3}>
                  <AvGroup>
                    <InputGroup className="mb-3">
                      <AvInput
                        type="number"
                        name="purchase_price"
                        onChange={(event) =>
                          props.handleOneItemValue(
                            event.target,

                            "purchase_price"
                          )
                        }
                        required
                      />
                      <InputGroupAddon addonType="prepend">.00</InputGroupAddon>
                      <AvFeedback>Purchase price is required!</AvFeedback>
                    </InputGroup>
                  </AvGroup>
                </Col>
                <Col md={1}>
                  <AvGroup>
                    <AvInput
                      type="text"
                      name="sku"
                      onChange={(event) =>
                        props.handleOneItemValue(
                          event.target,

                          "sku"
                        )
                      }
                      required
                    />
                    <AvFeedback>SKU is required!</AvFeedback>
                  </AvGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    {props.props.is_all_locations ? (
                      <AvGroup>
                        <AvInput
                          type="number"
                          defaultValue="0"
                          name="quantity"
                          onChange={(event) =>
                            props.handleOneItemValue(
                              event.target,

                              "quantity"
                            )
                          }
                          required
                        />
                        <AvFeedback>Opening Stock is required!</AvFeedback>
                      </AvGroup>
                    ) : (
                      <React.Fragment>
                        <CardLink>
                          <Button
                            onClick={() => props.toggle()}
                            color="primary"
                            className="mr-1 mb-1"
                            outline
                          >
                            {props.props.item_option.total_quantity
                              ? props.props.item_option.total_quantity
                              : 0}{" "}
                            in {props.locations.length} locations
                          </Button>
                        </CardLink>
                        <Modal
                          isOpen={props.props.index}
                          toggle={() => props.toggle()}
                          centered
                        >
                          <ModalHeader toggle={() => props.toggle()}>
                            Edit Locations
                          </ModalHeader>
                          <Form>
                            <ModalBody className="text-center m-3">
                              <Row form>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label className="float-left">
                                      Location Name
                                    </Label>
                                  </FormGroup>
                                </Col>
                                <Col md={6}>
                                  <FormGroup>
                                    <Label className="float-left">
                                      Opening Stock
                                    </Label>
                                  </FormGroup>
                                </Col>

                                {props.props.locations.map(
                                  (location, location_index) => (
                                    <React.Fragment key={location_index}>
                                      <Col md={6}>
                                        <FormGroup>
                                          <Input
                                            type="text"
                                            name="date"
                                            defaultValue={location.name}
                                            disabled
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col md={6}>
                                        <FormGroup>
                                          <Input
                                            type="number"
                                            defaultValue={
                                              props.props.item_option[
                                                location_index
                                              ].details.quantity
                                            }
                                            name={"quantity" + location.id}
                                            required
                                            onChange={(event) =>
                                              props.handleOneItemEditLocation(
                                                location.id,
                                                event.target
                                              )
                                            }
                                          />
                                        </FormGroup>
                                      </Col>
                                    </React.Fragment>
                                  )
                                )}
                              </Row>
                            </ModalBody>
                            <ModalFooter>
                              <Button
                                color="secondary"
                                onClick={() => props.toggle()}
                              >
                                Close
                              </Button>{" "}
                              <Button
                                // type="submit"
                                color="primary"
                                onClick={() =>
                                  props.handleOneItemLocationsubmit()
                                }
                              >
                                Save changes
                              </Button>
                            </ModalFooter>
                          </Form>
                        </Modal>
                      </React.Fragment>
                    )}
                  </FormGroup>
                </Col>

                <Col md={1}>
                  <AvGroup>
                    <AvInput
                      type="number"
                      name="reorder_level"
                      //defaultValue="0"
                      onChange={(event) =>
                        props.handleOneItemValue(
                          event.target,

                          "reorder_level"
                        )
                      }
                      // max={(value = "quantity" + idx + id)}
                      validate={
                        {
                          // max: { value: value.total_locations }
                        }
                      }
                      required
                    />
                    {/* <AvFeedback>Reorder level is required!</AvFeedback> */}
                  </AvGroup>
                </Col>

                <Col md={2}>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        id="exampleCustomCheckbox"
                        name="locations"
                        label="All Locations"
                        defaultChecked={true}
                        onChange={(event) => props.handleOneItemAllLocation()}
                        disabled={props.props.locations.length <= 1}
                      />
                      All Locations
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      )}
    </React.Fragment>
  );
};

const ActionPanel = (props) => (
  <div className="mb-4">
    <Button type="submit" color="primary" className="mr-1 mb-1">
      Save
    </Button>

    <Button
      color="primary"
      className="mr-1 mb-1"
      outline
      onClick={() => props.props.history.push("/items/all")}
    >
      Cancel
    </Button>
  </div>
);

class NewItems extends React.Component {
  state = {
    is_all_locations: true,
    manufacturer: null,
    variantsOption: [],
    files: [],
    index: false,
    tax_index: false,
    organization_tax: {
      name: null,
      rate: null,
    },
    brand: null,
    category: null,
    countries: "",
    industries: "",
    productTypesOptionList: [],
    variantsOptionList: [],
    variantsValuesList: [],
    manufacturersOptionList: [],
    OrganizationTaxOptionList: [],
    brandsOptionList: [],
    categoriesOptionList: [],
    itemOptions: [],
    IndustryOptionList: "",
    date: new Date(),
    expected_delivery_date: new Date(),
    isChecked: false,
    productOptionValues: null,
    item_variant_values: [{ id: 1, variant_id: "", values: [] }],
    locations: [],
    item_option: [],
    item_options: [],
    values: {},
    touched: {
      unit: false,
    },
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

  toggle = () => {
    this.setState((state) => ({
      index: !state.index,
    }));
  };

  modalSave = () => {
    this.setState((state) => ({
      index: !state.index,
    }));
  };

  toggleTax = () => {
    this.setState((state) => ({
      tax_index: !state.tax_index,
    }));
  };

  componentDidMount() {
    this.getTypes();
    // this.getVariantOptions();
    // this.getVariantValues();
    // this.getOrganizationLocations();
    // this.getOrganizationTaxes();
    this.getManufacturers();
    this.getBrands();
    this.getCategories();
  }

  getOrganizationTaxes = () => {
    this.props.organizationTaxes().then((taxes) => {
      if (taxes.taxes) {
        let UnitList = taxes.taxes.data.data.map((data) => ({
          value: data.id,
          label: data.name + " - " + data.rate,
        }));
        this.setState({
          OrganizationTaxOptionList: UnitList,
        });
      }
    });
  };

  getOrganizationLocations = () => {
    this.props.locations().then((locations) => {
      if (locations.locations && locations.locations.status === 201) {
        this.setState({
          locations: locations.locations.data.data,
        });

        let orgLocations = [];
        this.state.locations.forEach((location) => {
          orgLocations = orgLocations.concat([
            {
              organization_location_id: location.id,
              details: {
                selling_price: null,
                purchase_price: null,
                quantity: 0,
                reorder_level: null,
                sku: null,
              },
            },
          ]);
        });

        this.setState({
          item_option: orgLocations,
        });
      }
    });
  };

  getTypes = () => {
    this.props.getProductTypes().then((types) => {
      console.log(types);
      if (types.productTypes) {
        console.log(types);
        let TypeList = types.productTypes.data.map((data) => ({
          value: data._id,
          label: data.productType,
        }));
        this.setState({
          productTypesOptionList: TypeList,
        });
      }
    });
  };

  getVariantOptions = () => {
    this.props
      .item_options(localStorage.getItem("organization_id"))
      .then((item_options) => {
        if (item_options.item_options) {
          let VariantsList = item_options.item_options.data.data.map(
            (data) => ({
              value: data.id,
              label: data.name,
            })
          );
          this.setState({
            variantsOptionList: VariantsList,
          });
        }
      });
  };

  getVariantValues = () => {
    this.props.item_values().then((item_values) => {
      if (item_values.item_values) {
        let VariantsList = item_values.item_values.data.data.map((data) => ({
          value: data.value,
          label: data.value,
          variant_id_value_id: data.id,
          item_variant_id: data.item_variant_id,
        }));
        this.setState({
          variantsValuesList: VariantsList,
        });
      }
    });
  };

  getManufacturers = () => {
    this.props.manufacturers().then((manufacturers) => {
      if (manufacturers.manufacturers) {
        console.log(manufacturers);
        let manufacturersList = manufacturers.manufacturers.data.map(
          (data) => ({
            value: data._id,
            label: data.manufacturerName,
          })
        );
        this.setState({
          manufacturersOptionList: manufacturersList,
        });
      }
    });
  };

  getBrands = () => {
    this.props.brands().then((brands) => {
      if (brands.brands) {
        let brandsList = brands.brands.data.map((data) => ({
          value: data._id,
          label: data.brandName,
        }));
        this.setState({
          brandsOptionList: brandsList,
        });
      }
    });
  };

  getCategories = () => {
    this.props.categories().then((categories) => {
      if (categories.categories) {
        let categoriesList = categories.categories.data.map((data) => ({
          value: data._id,
          label: data.categoryType,
        }));
        this.setState({
          categoriesOptionList: categoriesList,
        });
      }
    });
  };

  handleManufacturerChange = (newValue) => {
    if (newValue !== null && newValue.__isNew__) {
      const newState = { ...this.state };
      newState.values.productManufacturer = newValue.value;
      this.setState(newState);
    } else if (newValue !== null) {
      const newState = { ...this.state };
      newState.values.productManufacturer = newValue.value;
      this.setState(newState);
    } else if (newValue === null) {
      const newState = { ...this.state };
      newState.manufacturer = null;
      newState.values.productManufacturer = "";
      this.setState(newState);
    }
  };

  handleBrandChange = (newValue) => {
    if (newValue !== null && newValue.__isNew__) {
      const newState = { ...this.state };
      newState.values.productBrand = newValue.value;
      this.setState(newState);
    } else if (newValue !== null) {
      const newState = { ...this.state };
      newState.values.productBrand = newValue.value;
      this.setState(newState);
    } else if (newValue === null) {
      const newState = { ...this.state };
      newState.brand = null;
      newState.values.productBrand = "";
      this.setState(newState);
    }
  };

  handleTaxChange = (newValue) => {
    if (newValue !== null && newValue.__isNew__) {
      this.toggleTax();
    } else if (newValue === null) {
      const newState = { ...this.state };
      newState.organization_tax.name = null;
      newState.organization_tax.rate = null;
      newState.values.organization_tax_id = "";
      this.setState(newState);
    } else if (newValue !== null) {
      const newState = { ...this.state };
      newState.values.organization_tax_id = newValue.value;
      this.setState(newState);
    }
  };

  handleCategoryChange = (newValue) => {
    if (newValue !== null && newValue.__isNew__) {
      const newState = { ...this.state };
      newState.values.productCategory = newValue;
      this.setState(newState);
    } else if (newValue !== null) {
      const newState = { ...this.state };
      newState.values.productCategory = newValue.value;
      this.setState(newState);
    } else if (newValue === null) {
      const newState = { ...this.state };
      newState.category = null;
      newState.values.productCategory = "";
      this.setState(newState);
    }
  };

  handleItemAttachments = async (fileItem) => {
    S3FileUpload.uploadFile(fileItem.file, config)
      .then((data) => {
        let attachment = {};
        if (this.state.values.attachments.length === 0) {
          attachment = {
            attachment_link: data.location,
            is_primary: true,
          };
        } else {
          attachment = {
            attachment_link: data.location,
          };
        }

        const newState = { ...this.state };
        newState.values.attachments = [
          ...newState.values.attachments,
          attachment,
        ];
        this.setState(newState);
      })
      .catch((err) => console.error(err));
  };

  handleItemAttachmentsRemove = (fileItem) => {
    let filename = `https://gymapp-assets.s3.amazonaws.com/uploads/${fileItem.filename}`;

    const newState = { ...this.state };

    newState.values.attachments = this.state.values.attachments.filter(
      (attachment) => attachment.attachment_link !== filename
    );
    this.setState(newState);
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.values[field] = value;

    this.setState(newState);
  };

  handleOrganizationTaxFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.organization_tax[field] = value;

    this.setState(newState);
  };

  handleTypeChange = (selectedOption) => {
    const newState = { ...this.state };
    newState.values["productType"] = selectedOption.value;
    this.setState(newState);
  };

  handleChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  handleInvalidSubmit = () => {
    const newState = { ...this.state };
    newState.touched.unit = true;
    newState.toastrInstance = "error";
    newState.toastrTitle = "Error";
    newState.toastrMessage = "Please fill mandatory fields";
    this.setState(newState);

    this.showToastr();
  };

  handleSubmit = async () => {
    const {
      manufacturer,
      brand,
      category,
      organization_tax,
      touched,
      values,
      variantsOption,
      isChecked,
      item_options,
    } = this.state;

    console.log(values);
    const organization_id = localStorage.getItem("organization_id");
    let item_values = [];
    const newState = { ...this.state };
    newState.touched.unit = true;
    this.setState(newState);
    const showUnitError = touched.unit && values.unit_id === "";

    this.props.createNewItem(this.state.values).then((item) => {
      if (item) {
        console.log(item)
        if (item.status === 200) {
          this.setState({
            toastrInstance: "success",
            toastrTitle: "Success",
            toastrMessage: "You have successfully created a item",
          });
          this.showToastr();
          this.props.history.push("/items/all");
        }
      }
    });

    // if (isChecked && item_options.length !== 0) {
    //   if (showUnitError === false) {
    //     if (this.state.locations.length !== 0) {
    //       const newState = { ...this.state };
    //       if (this.state.isChecked) {
    //         newState.values.item_options = newState.item_options;
    //         this.setState(newState);

    //         if (variantsOption.length !== 0) {
    //           const newState = { ...this.state };
    //           this.props.createItemOption(
    //             variantsOption,
    //             localStorage.getItem("organization_id")
    //           );
    //         } else {
    //           this.props.createItemVariantValues(
    //             this.state.item_variant_values
    //           );
    //         }
    //       } else {
    //         newState.values.item_option = newState.item_option;
    //         this.setState(newState);
    //       }

    //       if (manufacturer !== null) {
    //         await this.props
    //           .createManufacturer(manufacturer.value, organization_id)
    //           .then((manufacturer) => {
    //             const newState = { ...this.state };
    //             newState.values.manufacturer_id = manufacturer.data.data.id;
    //             this.setState(newState);
    //           });
    //       }
    //       if (brand !== null) {
    //         await this.props
    //           .createBrand(brand.value, organization_id)
    //           .then((brand) => {
    //             const newState = { ...this.state };
    //             newState.values.brand_id = brand.data.data.id;
    //             this.setState(newState);
    //           });
    //       }
    //       if (category !== null) {
    //         await this.props.createCategory(category.value).then((category) => {
    //           const newState = { ...this.state };
    //           newState.values.category_id = category.data.data.id;
    //           this.setState(newState);
    //         });
    //       }
    //       if (organization_tax.name !== null) {
    //         await this.props
    //           .createOrganizationTaxes(
    //             organization_tax,
    //             localStorage.getItem("organization_id")
    //           )
    //           .then((tax) => {
    //             const newState = { ...this.state };
    //             newState.values.organization_tax_id = tax.taxes.data.data.id;
    //             this.setState(newState);
    //           });
    //       }

    //       this.props.createNewItem(this.state.values).then((item) => {
    //         if (item) {
    //           if (item.status === 201) {
    //             this.setState({
    //               toastrInstance: "success",
    //               toastrTitle: "Success",
    //               toastrMessage: "You have successfully created a item",
    //             });
    //             this.showToastr();
    //             this.props.history.push("/items/all");
    //           }
    //         }
    //       });
    //     } else {
    //       const newState = { ...this.state };
    //       newState.toastrInstance = "error";
    //       newState.toastrTitle = "Error";
    //       newState.toastrMessage = "Please add organization locations";
    //       this.setState(newState);

    //       this.showToastr();
    //     }
    //   } else {
    //     const newState = { ...this.state };
    //     newState.touched.unit = true;
    //     newState.toastrInstance = "error";
    //     newState.toastrTitle = "Error";
    //     newState.toastrMessage = "Please fill mandatory fields";
    //     this.setState(newState);

    //     this.showToastr();
    //   }
    // } else {
    //   const newState = { ...this.state };
    //   newState.touched.unit = true;
    //   newState.toastrInstance = "error";
    //   newState.toastrTitle = "Error";
    //   newState.toastrMessage = "Please add item option(s) and value(s)";
    //   this.setState(newState);

    //   this.showToastr();
    // }
  };
  render() {
    const { touched, values } = this.state;
    const showUnitError = touched.unit && values.unit_id === "";
    return (
      <Container>
        <AvForm
          onValidSubmit={this.handleSubmit}
          onInvalidSubmit={this.handleInvalidSubmit}
        >
          <HorizontalForm
            props={this.state}
            item_variant_values={this.state.item_variant_values}
            handleChecked={this.handleChecked}
            handleAddProductOptions={this.handleAddProductOptions}
            handleRemoveProductOptions={this.handleRemoveProductOptions}
            handleSubmit={this.handleSubmit}
            productTypesOptionList={this.state.productTypesOptionList}
            OrganizationTaxOptionList={this.state.OrganizationTaxOptionList}
            variantsOptionList={this.state.variantsOptionList}
            variantsValuesList={this.state.variantsValuesList}
            manufacturersOptionList={this.state.manufacturersOptionList}
            brandsOptionList={this.state.brandsOptionList}
            categoriesOptionList={this.state.categoriesOptionList}
            handleFieldChange={this.handleFieldChange}
            handleAddProductOptionValues={this.handleAddProductOptionValues}
            handleItemVariants={this.handleItemVariants}
            handleOneItemOptions={this.handleOneItemOptions}
            handleAddOneProductOptionValues={
              this.handleAddOneProductOptionValues
            }
            handleTypeChange={this.handleTypeChange}
            handleItemAttachments={this.handleItemAttachments}
            handleItemAttachmentsRemove={this.handleItemAttachmentsRemove}
            handleManufacturerChange={this.handleManufacturerChange}
            handleBrandChange={this.handleBrandChange}
            handleCategoryChange={this.handleCategoryChange}
            handleTaxChange={this.handleTaxChange}
            handleOrganizationTaxFieldChange={
              this.handleOrganizationTaxFieldChange
            }
            toggleTax={this.toggleTax}
            showUnitError={showUnitError}
          />

          {/* <ItemRows
            props={this.state}
            locations={this.state.locations}
            toggle={this.toggle}
            handleItemValues={this.handleItemValues}
            handleOneItemValue={this.handleOneItemValue}
            handleItemQuantity={this.handleItemQuantity}
            handleEditLocation={this.handleEditLocation}
            handleOneItemEditLocation={this.handleOneItemEditLocation}
            handleItemAllLocation={this.handleItemAllLocation}
            handleOneItemAllLocation={this.handleOneItemAllLocation}
            handleEditLocationSubmit={this.handleEditLocationSubmit}
            handleOneItemLocationsubmit={this.handleOneItemLocationsubmit}
          /> */}

          <ActionPanel props={this.props} />
        </AvForm>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  createNewItem: itemActions.createNewItem,
  getProductTypes: lookupActions.getProductTypes,
  countries: lookupActions.getCountries,
  item_options: itemActions.getItemOptions,
  item_values: itemActions.getItemValues,
  getUser: authActions.getuser,
  locations: organizationActions.getOrganizationLocations,
  organizationTaxes: organizationActions.getOrganizationTaxes,
  createOrganizationTaxes: organizationActions.createOrganizationTaxes,
  createManufacturer: manufacturerActions.create,
  createBrand: brandActions.create,
  createCategory: categoryActions.create,
  manufacturers: manufacturerActions.getManufacturers,
  brands: brandActions.getBrands,
  categories: categoryActions.getCategories,
  createItemOption: itemActions.createItemOption,
  createItemVariantValues: itemActions.createItemVariantValues,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(NewItems));
