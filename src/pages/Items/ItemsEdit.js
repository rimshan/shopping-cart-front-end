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
import Toggle from "react-toggle";
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
} from "reactstrap";

import { toastr } from "react-redux-toastr";

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";

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
  bucketName: "gymapp-assets",
  dirName: "uploads",
  region: "ap-southeast-1",
  accessKeyId: "AKIAVH4CTCBHMY5C2LNZ",
  secretAccessKey: "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",
  s3Url: "https://gymapp-assets.s3.ap-southeast-1.amazonaws.com/",
};

const serverConfig = {
  load: (source, load, error, progress, abort, headers) => {
    var myRequest = new Request(source);
    fetch(myRequest).then(function (response) {
      response.blob().then(function (myBlob) {
        load(myBlob);
      });
    });
  },
};

const ItemEditForm = (props) => {
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
          <Link to="/items/all">Items</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>Edit #{props.item.item_id}</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="h3 mb-3">Edit Items</h1>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Basic Details</CardTitle>
        </CardHeader>
        <CardBody>
          <FormGroup row>
            <Label sm={2} className="text-sm-right pt-sm-0">
              Type
            </Label>
            <Col sm={4}>
              <div className="custom-controls-stacked">
                <CustomInput
                  inline
                  type="radio"
                  id="Goods"
                  name="type"
                  label="Goods"
                  className="mb-2"
                  defaultChecked
                  onChange={(event) =>
                    props.handleFieldChange("item_type_id", 1)
                  }
                />

                <CustomInput
                  inline
                  type="radio"
                  id="Service"
                  name="type"
                  label="Service"
                  className="mb-2"
                  onChange={(event) =>
                    props.handleFieldChange("item_type_id", 2)
                  }
                />
              </div>
            </Col>
          </FormGroup>
          <AvGroup row>
            <Label sm={2} className="text-sm-right"></Label>
            <Col sm={6}>
              <FilePond
                allowMultiple={true}
                files={props.item_attachments}
                imagePreviewMaxHeight="200"
                server={serverConfig}
                removefile={(error, file) =>
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
                name="name"
                defaultValue={props.item.name}
                placeholder="Item Name"
                required
                onChange={(event) =>
                  props.handleFieldChange("name", event.target.value)
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
                name="description"
                defaultValue={props.item.description}
                rows="3"
                required
                onChange={(event) =>
                  props.handleFieldChange("description", event.target.value)
                }
              />
              <AvFeedback>Discription is required!</AvFeedback>
            </Col>
          </AvGroup>

          <AvGroup row required>
            <Label sm={2} className="text-sm-right required">
              Unit
            </Label>
            <Col sm={4}>
              <Select
                className="react-select-container"
                classNamePrefix="react-select"
                options={props.unitsOptionList}
                onChange={props.handleUnitChange}
                defaultValue={props.unitsOptionList.filter(
                  (option) => option.value === props.item.unit_id
                )}
                name="Unit"
                styles={props.showUnitError ? customStyles : ""}
              />
              {props.showUnitError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  Unit is required!
                </span>
              )}
            </Col>

            <Label sm={2} className="text-sm-right">
              Tax
            </Label>
            <Col sm={4}>
              <CreatableSelect
                className="react-select-container"
                classNamePrefix="react-select"
                options={props.OrganizationTaxOptionList}
                defaultValue={props.OrganizationTaxOptionList.filter(
                  (option) => option.value === props.item.organization_tax_id
                )}
                onChange={props.handleTaxChange}
                placeholder="Select Tax"
                isSearchable
                isClearable
                name="tax"
              />
            </Col>
          </AvGroup>
          <Modal
            isOpen={props.props.tax_index}
            toggle={() => props.toggleTax()}
            centered
          >
            <ModalHeader toggle={() => props.toggleTax()}>
              Organization tax
            </ModalHeader>
            <ModalBody className="text-center m-3">
              <AvForm>
                <AvGroup row>
                  <Label sm={2} className="text-sm-right">
                    Name
                  </Label>
                  <Col sm={8}>
                    <AvInput
                      type="text"
                      name="name"
                      required
                      onChange={(event) =>
                        props.handleOrganizationTaxFieldChange(
                          "name",
                          event.target.value
                        )
                      }
                    />
                    <AvFeedback>Name is required!</AvFeedback>
                  </Col>
                </AvGroup>
                <AvGroup row>
                  <Label sm={2} className="text-sm-right">
                    Rate
                  </Label>
                  <Col sm={8}>
                    <AvInput
                      type="text"
                      name="rate"
                      required
                      onChange={(event) =>
                        props.handleOrganizationTaxFieldChange(
                          "rate",
                          event.target.value
                        )
                      }
                    />
                    <AvFeedback>Rate is required!</AvFeedback>
                  </Col>
                </AvGroup>
              </AvForm>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => props.toggleTax()}>
                Close
              </Button>{" "}
              <Button color="primary" onClick={() => props.toggleTax()}>
                Save changes
              </Button>
            </ModalFooter>
          </Modal>
          <AvGroup row>
            <Label sm={2} className="text-sm-right">
              Category
            </Label>
            <Col sm={4}>
              <CreatableSelect
                isClearable
                onChange={props.handleCategoryChange}
                options={props.categoriesOptionList}
                defaultValue={props.categoriesOptionList.filter(
                  (option) => option.value === props.item.category_id
                )}
              />
            </Col>
            <Label sm={2} className="text-sm-right">
              Weight (kg)
            </Label>
            <Col sm={4}>
              <AvInput
                type="text"
                name="weight"
                defaultValue={props.item.weight}
                placeholder="Weight (kg)"
                onChange={(event) =>
                  props.handleFieldChange("weight", event.target.value)
                }
              />
              <AvFeedback>Weight is required!</AvFeedback>
            </Col>
          </AvGroup>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              Manufacturer
            </Label>
            <Col sm={4}>
              <CreatableSelect
                {...props}
                isClearable
                onChange={props.handleManufacturerChange}
                options={props.manufacturersOptionList}
                defaultValue={props.manufacturersOptionList.filter(
                  (option) => option.value === props.item.manufacturer_id
                )}
              />
            </Col>
            <Label sm={2} className="text-sm-right">
              Brand
            </Label>
            <Col sm={4}>
              <CreatableSelect
                isClearable
                onChange={props.handleBrandChange}
                options={props.brandsOptionList}
                defaultValue={props.brandsOptionList.filter(
                  (option) => option.value === props.item.brand_id
                )}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              Dimensions (cm) (Length x Width x Height)
            </Label>
            <Col sm={4}>
              <AvInput
                type="text"
                name="dimension"
                placeholder="Dimension"
                defaultValue={props.item.dimension}
                onChange={(event) =>
                  props.handleFieldChange("dimension", event.target.value)
                }
              />
            </Col>
            <React.Fragment>
              <Label sm={2} className="text-sm-right">
                ISBN <HelpCircle size={18} id="ISBN" />
              </Label>
              <UncontrolledTooltip placement="top" target="ISBN">
              ISBN is the unique book identifier that identifies the specific title, edition, format & registrant.
              </UncontrolledTooltip>
            </React.Fragment>

            <Col sm={4}>
              <AvInput
                type="text"
                name="ISBN"
                placeholder="ISBN"
                defaultValue={props.item.isbn}
                onChange={(event) =>
                  props.handleFieldChange("isbn", event.target.value)
                }
              />
            </Col>
          </FormGroup>
          <AvGroup row>
            <React.Fragment>
              <Label sm={2} className="text-sm-right">
                UPC <HelpCircle size={18} id="UPC" />
              </Label>

              <UncontrolledTooltip placement="top" target="UPC">
              UPC is the standardized product tracking code (Barcode), that can use by any company to track trade items in stores.
              </UncontrolledTooltip>
            </React.Fragment>
            <Col sm={4}>
              <AvInput
                type="text"
                name="upc"
                defaultValue={props.item.upc}
                placeholder="UPC"
                onChange={(event) =>
                  props.handleFieldChange("upc", event.target.value)
                }
              />
            </Col>
            <React.Fragment>
              <Label sm={2} className="text-sm-right">
                MPN <HelpCircle size={18} id="MPN" />
              </Label>
              <UncontrolledTooltip placement="top" target="MPN">
              MPN is a unique number, issued by industrialists to identify individual products. 
              </UncontrolledTooltip>
            </React.Fragment>
            <Col sm={4}>
              <AvInput
                type="text"
                name="mpn"
                defaultValue={props.item.mpn}
                onChange={(event) =>
                  props.handleFieldChange("mpn", event.target.value)
                }
              />
            </Col>
          </AvGroup>
          <AvGroup row>
            <React.Fragment>
              <Label sm={2} className="text-sm-right">
                EAN <HelpCircle size={18} id="EAN" />
              </Label>
              <UncontrolledTooltip placement="top" target="EAN">
              EAN is a standard, which use to describe a barcode symbology and numbering systems in global trade to identify a retail product in a distinct manner. 
              </UncontrolledTooltip>
            </React.Fragment>

            <Col sm={4}>
              <AvInput
                type="text"
                name="ean"
                placeholder="EAN"
                defaultValue={props.item.ean}
                onChange={(event) =>
                  props.handleFieldChange("ean", event.target.value)
                }
              />
            </Col>
          </AvGroup>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              Status
            </Label>
            <Col sm={10}>
              <Toggle
                className="ml-1 row"
                defaultChecked={props.item.is_active === 1 ? true : false}
                onChange={(evt) => props.handleStatusChange(evt.target.checked)}
              />
            </Col>
          </FormGroup>

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
                    label="This product has multiple options, like different sizes or colors"
                    checked={props.props.isChecked}
                    onChange={props.handleChecked}
                  />
                </Col>
              </FormGroup>
              {props.props.isChecked ? (
                <div>
                  <CardTitle tag="h5">Options</CardTitle>
                  {props.edit_item_options.map((productOption, idx) => (
                    <div key={idx}>
                      <FormGroup row>
                        <Label sm={2} className="text-sm-right">
                          Option {idx + 1}
                        </Label>
                        <Col sm={3}>
                          <CreatableSelect
                            className="react-select-container"
                            classNamePrefix="react-select"
                            options={props.variantsOptionList}
                            defaultValue={
                              props.variantsOptionList[
                                productOption.variant_id - 1
                              ]
                            }
                            //value={productOption}
                            onChange={(event) =>
                              props.handleItemOptions(idx, event, productOption)
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
                            options={props.variantsValuesList}
                            defaultValue={productOption.values.map((value) => {
                              return props.variantsValuesList[
                                value.item_variant_value_id - 1
                              ];
                            })}
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
                              onClick={props.handleRemoveProductOptions(idx)}
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
          </div>
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
          {(props.props.productOptions[0].values !== null ||
            props.props.productOptions.length >= 2) && (
            <CardBody>
              <Row form>
                <Col md={1}>
                  <FormGroup>
                    <Label>Name</Label>
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label className="required">Selling Price</Label>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="required">Purchase Price</Label>
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
                {props.edit_items.map((productOption, id) => (
                  <div key={id}>
                    <Row form>
                      <Col md={1}>
                        <FormGroup>
                          <Input
                            //placeholder="Username"
                            defaultValue={productOption.item_option.value.map(
                              (value) => {
                                return value.value;
                              }
                            )}
                            disabled
                          />
                        </FormGroup>
                      </Col>

                      <Col md={3}>
                        <AvGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              LKR
                            </InputGroupAddon>
                            <AvInput
                              name={"selling_price" + id}
                              defaultValue={productOption.selling_price}
                              onChange={(event) =>
                                props.handleItemValues(
                                  id,
                                  event.target,
                                  productOption,
                                  "selling_price"
                                )
                              }
                              required
                            />
                            <InputGroupAddon addonType="prepend">
                              .00
                            </InputGroupAddon>
                            <AvFeedback>Selling price is required!</AvFeedback>
                          </InputGroup>
                        </AvGroup>
                      </Col>
                      <Col md={3}>
                        <AvGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              LKR
                            </InputGroupAddon>
                            <AvInput
                              name={"purchase_price" + id}
                              defaultValue={productOption.purchase_price}
                              onChange={(event) =>
                                props.handleItemValues(
                                  id,
                                  event.target,
                                  productOption,
                                  "purchase_price"
                                )
                              }
                              required
                            />
                            <InputGroupAddon addonType="prepend">
                              .00
                            </InputGroupAddon>
                            <AvFeedback>Purchase price is required!</AvFeedback>
                          </InputGroup>
                        </AvGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>
                          {productOption.item_quantities ? (
                            <React.Fragment>
                              <CardLink>
                                <Button
                                  onClick={() => props.toggle()}
                                  color="primary"
                                  className="mr-1 mb-1"
                                  outline
                                >
                                  {productOption.total_quantity
                                    ? productOption.total_quantity
                                    : 0}{" "}
                                  in {props.props.locations.length} locations
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
                                                  type="text"
                                                  defaultValue={props.props.edit_item.item_details
                                                    .map((itemDetail, index) =>
                                                      location.id ===
                                                        itemDetail.organization_location_id &&
                                                      productOption.item_option_id ===
                                                        itemDetail.item_option_id
                                                        ? itemDetail.quantity
                                                        : null
                                                    )
                                                    .join("")}
                                                  name={
                                                    "quantity" + location.id
                                                  }
                                                  required
                                                  onChange={(event) =>
                                                    props.handleEditLocation(
                                                      id,
                                                      location_index,
                                                      event.target,
                                                      productOption,
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
                                          id,
                                          productOption
                                        )
                                      }
                                    >
                                      Save changes
                                    </Button>
                                  </ModalFooter>
                                </Form>
                              </Modal>
                            </React.Fragment>
                          ) : (
                            <AvGroup>
                              <AvInput
                                type="number"
                                name={"quantity" + id}
                                defaultValue={productOption.quantity}
                                onChange={(event) =>
                                  props.handleItemValues(
                                    id,
                                    event.target,
                                    productOption,
                                    "quantity"
                                  )
                                }
                                required
                              />
                              <AvFeedback>
                                Opening Stock is required!
                              </AvFeedback>
                            </AvGroup>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md={1}>
                        <AvGroup>
                          <AvInput
                            type="number"
                            name={"reorder_level" + id}
                            defaultValue={productOption.reorder_level}
                            onChange={(event) =>
                              props.handleItemValues(
                                id,
                                event.target,
                                productOption,
                                "reorder_level"
                              )
                            }
                            // max={(value = "quantity" + idx + id)}
                            validate={
                              {
                                // max: { value: value.total_locations }
                              }
                            }
                            // required
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
                              name={"locations" + id}
                              label="All Locations"
                              defaultChecked={true}
                              onChange={(event) =>
                                props.handleItemAllLocation(
                                  id,
                                  event,
                                  productOption
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
                ))}
              </div>
            </CardBody>
          )}
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle tag="h5">Items</CardTitle>
          </CardHeader>
          {(props.props.productOptions[0].values !== null ||
            props.props.productOptions.length >= 2) && (
            <CardBody>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label className="required">Selling Price</Label>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label className="required">Purchase Price</Label>
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
                {props.edit_items.map((productOption, id) => (
                  <div key={id}>
                    <Row form>
                      <Col md={3}>
                        <AvGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              LKR
                            </InputGroupAddon>
                            <AvInput
                              name={"selling_price" + id}
                              defaultValue={productOption.selling_price}
                              onChange={(event) =>
                                props.handleItemValues(
                                  id,
                                  event.target,
                                  productOption,
                                  "selling_price"
                                )
                              }
                              required
                            />
                            <InputGroupAddon addonType="prepend">
                              .00
                            </InputGroupAddon>
                            <AvFeedback>Selling price is required!</AvFeedback>
                          </InputGroup>
                        </AvGroup>
                      </Col>
                      <Col md={3}>
                        <AvGroup>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              LKR
                            </InputGroupAddon>
                            <AvInput
                              name={"purchase_price" + id}
                              defaultValue={productOption.purchase_price}
                              onChange={(event) =>
                                props.handleItemValues(
                                  id,
                                  event.target,
                                  productOption,
                                  "purchase_price"
                                )
                              }
                              required
                            />
                            <InputGroupAddon addonType="prepend">
                              .00
                            </InputGroupAddon>
                            <AvFeedback>Purchase price is required!</AvFeedback>
                          </InputGroup>
                        </AvGroup>
                      </Col>
                      <Col md={1}>
                        <AvGroup>
                          <InputGroup className="mb-3">
                            <AvInput
                              name={"sku" + id}
                              defaultValue={productOption.sku}
                              onChange={(event) =>
                                props.handleItemValues(
                                  id,
                                  event.target,
                                  productOption,
                                  "sku"
                                )
                              }
                              required
                            />
                            <AvFeedback>SKU price is required!</AvFeedback>
                          </InputGroup>
                        </AvGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>
                          {productOption.item_quantities ? (
                            <React.Fragment>
                              <CardLink>
                                <Button
                                  onClick={() => props.toggle()}
                                  color="primary"
                                  className="mr-1 mb-1"
                                  outline
                                >
                                  {productOption.total_quantity
                                    ? productOption.total_quantity
                                    : 0}{" "}
                                  in {props.props.locations.length} locations
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
                                                  type="text"
                                                  defaultValue={props.props.edit_item.item_details
                                                    .map((itemDetail, index) =>
                                                      location.id ===
                                                        itemDetail.organization_location_id &&
                                                      productOption.item_option_id ===
                                                        itemDetail.item_option_id
                                                        ? itemDetail.quantity
                                                        : null
                                                    )
                                                    .join("")}
                                                  name={
                                                    "quantity" + location.id
                                                  }
                                                  required
                                                  onChange={(event) =>
                                                    props.handleEditLocation(
                                                      id,
                                                      location_index,
                                                      event.target,
                                                      productOption,
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
                                          id,
                                          productOption
                                        )
                                      }
                                    >
                                      Save changes
                                    </Button>
                                  </ModalFooter>
                                </Form>
                              </Modal>
                            </React.Fragment>
                          ) : (
                            <AvGroup>
                              <AvInput
                                type="number"
                                name={"quantity" + id}
                                defaultValue={productOption.quantity}
                                onChange={(event) =>
                                  props.handleItemValues(
                                    id,
                                    event.target,
                                    productOption,
                                    "quantity"
                                  )
                                }
                                required
                              />
                              <AvFeedback>
                                Opening Stock is required!
                              </AvFeedback>
                            </AvGroup>
                          )}
                        </FormGroup>
                      </Col>

                      <Col md={1}>
                        <AvGroup>
                          <AvInput
                            type="number"
                            name={"reorder_level" + id}
                            defaultValue={productOption.reorder_level}
                            onChange={(event) =>
                              props.handleItemValues(
                                id,
                                event.target,
                                productOption,
                                "reorder_level"
                              )
                            }
                            // max={(value = "quantity" + idx + id)}
                            validate={
                              {
                                // max: { value: value.total_locations }
                              }
                            }
                            // required
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
                              name={"locations" + id}
                              label="All Locations"
                              defaultChecked={true}
                              onChange={(event) =>
                                props.handleItemAllLocation(
                                  id,
                                  event,
                                  productOption
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
                ))}
              </div>
            </CardBody>
          )}
        </Card>
      )}
    </React.Fragment>
  );
};

const ActionPanel = (props) => (
  <div>
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
    toastrInstance: "",
    toastrTitle: "",
    toastrMessage: "",
    index: false,
    tax_index: false,
    quantity: "",
    organization_tax: {
      name: null,
      rate: null,
    },
    item_attachments: [{}],
    optionDefaultValue: {
      value: this.props.location.state.item.option,
      label: this.props.location.state.item.option,
    },
    defaultValue: {
      id: this.props.location.state.item.item_option_id,
      value: this.props.location.state.item.value,
      label: this.props.location.state.item.value,
      selling_price: this.props.location.state.item.selling_price,
      purchase_price: this.props.location.state.item.purchase_price,
      reorder_level: this.props.location.state.item.reorder_level,
      locations: this.props.location.state.item.locations,
    },
    item: this.props.location.state.item,
    item_options: [],
    manufacturer: null,
    variantsOption: [],
    files: [],
    brand: null,
    category: null,
    countries: "",
    industries: "",
    unitsOptionList: [],
    variantsOptionList: null,
    variantsValuesList: [],
    manufacturersOptionList: null,
    OrganizationTaxOptionList: [],
    brandsOptionList: [],
    categoriesOptionList: [],
    itemOptions: [],
    IndustryOptionList: "",
    date: new Date(),
    expected_delivery_date: new Date(),
    isChecked: true,
    productOptionValues: null,
    productOptions: [
      {
        option: this.props.location.state.item.option,
        values: [
          {
            id: this.props.location.state.item.item_option_id,
            value: this.props.location.state.item.value,
            selling_price: this.props.location.state.item.selling_price,
            purchase_price: this.props.location.state.item.purchase_price,
            reorder_level: this.props.location.state.item.reorder_level,
            locations: this.props.location.state.item.locations,
          },
        ],
      },
    ],
    locations: [],
    values: this.props.location.state.item,
    touched: {
      unit: false,
    },
    value: [
      {
        item_variant_id: 1,
        item_variant_value: "Size",
        item_variant_value_id: 1,
        value: "S",
      },
      {
        item_variant_id: 2,
        item_variant_value: "Color",
        item_variant_value_id: 2,
        value: "Red",
      },
    ],
    edit_item: this.props.location.state.item.item_details,
    Item_option_with_values: [],
    edit_item_options: [],
    edit_items: [],
    edit_item_option_values: [],
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

  toggleTax = () => {
    this.setState((state) => ({
      tax_index: !state.tax_index,
    }));
  };

  async componentDidMount() {
    let item_attachments = this.props.location.state.item.item_attachments.map(
      (attachment) => ({
        source: attachment.attachment_link,
        options: {
          type: "local",
        },
      })
    );

    this.setState(() => ({
      item_attachments,
    }));
    this.getOrganizationTaxes();
    this.getUnits();
    this.getVariantOptions();
    this.getVariantValues();
    this.getOrganizationLocations();

    this.getBrands();
    this.getCategories();
    this.getManufacturers();

    const map4 = this.state.edit_item.reduce((map4, itemDetail) => {
      if (map4[itemDetail.item_option_id]) {
        map4[itemDetail.item_option_id].total_quantity += Number(
          itemDetail.quantity
        );
        if (
          map4[itemDetail.item_option_id].quantityChecker !==
          Number(itemDetail.quantity)
        ) {
          map4[itemDetail.item_option_id].status = true;
        }
      } else {
        map4[itemDetail.item_option_id] = {
          ...itemDetail,
          total_quantity: Number(itemDetail.quantity),
          quantityChecker: Number(itemDetail.quantity),
          status: false,
        };
      }
      return map4;
    }, {});

    const array = Object.keys(map4).map((id) => {
      const { quantityChecker, status, total_quantity, ...rest } = map4[id];
      return {
        ...rest,
        item_quantities: status,
        total_quantity: total_quantity,
      };
    });

    this.setState({
      edit_items: array,
    });

    this.state.edit_item.forEach((value) => {
      if (value.item_option_id) {
        value.item_option.value.forEach((val) => {
          this.state.Item_option_with_values.push(val);
        });
      } else {
        this.setState({
          isChecked: false,
        });
      }
    });

    const map = new Map();
    const edit_item_options = this.state.edit_item_options;
    for (const item of this.state.Item_option_with_values) {
      if (!map.has(item.item_variant_value)) {
        map.set(item.item_variant_value, true);
        edit_item_options.push({
          option: item.item_variant_value,
          variant_id: item.item_variant_id,
          values: [],
        });
        this.setState({
          edit_item_options: edit_item_options,
        });
      }
    }
    for (const item of this.state.Item_option_with_values) {
      if (!map.has(item.value)) {
        map.set(item.value, true);
        edit_item_options.forEach((option) => {
          if (option.option === item.item_variant_value) {
            option.values = option.values.concat(item);
          }
        });
        this.setState({
          edit_item_options: edit_item_options,
        });
      }
    }
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
      if (locations.locations) {
        this.setState({
          locations: locations.locations.data.data,
        });
      }
    });
    let orgLocations = [];
    this.state.locations.forEach((location) => {
      orgLocations = orgLocations.concat([
        {
          organization_location_id: location.id,
          details: {
            selling_price: null,
            purchase_price: null,
            quantity: null,
            reorder_level: null,
            sku: null,
          },
        },
      ]);
    });
  };

  getUnits = () => {
    this.props.units().then((units) => {
      if (units.units) {
        let UnitList = units.units.data.data.map((data) => ({
          value: data.id,
          label: data.name,
        }));
        this.setState({
          unitsOptionList: UnitList,
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
        }));
        this.setState({
          variantsValuesList: VariantsList,
        });
      }
    });
  };

  getManufacturers = async () => {
    this.props
      .manufacturers(localStorage.getItem("organization_id"))
      .then((manufacturers) => {
        if (manufacturers.manufacturers) {
          let manufacturersList = manufacturers.manufacturers.data.data.map(
            (data) => ({
              value: data.id,
              label: data.name,
            })
          );
          this.setState({
            manufacturersOptionList: manufacturersList,
          });
        }
      });
  };

  getBrands = () => {
    this.props
      .brands(localStorage.getItem("organization_id"))
      .then((brands) => {
        if (brands.brands) {
          let brandsList = brands.brands.data.data.map((data) => ({
            value: data.id,
            label: data.name,
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
        let categoriesList = categories.categories.data.data.map((data) => ({
          value: data.id,
          label: data.name,
        }));
        this.setState({
          categoriesOptionList: categoriesList,
        });
      }
    });
  };

  handleManufacturerChange = (newValue) => {
    if (newValue !== null && newValue.__isNew__) {
      this.setState({
        manufacturer: newValue,
      });
    } else if (newValue !== null) {
      const newState = { ...this.state };
      newState.edit_item.manufacturer_id = newValue.value;
      this.setState(newState);
    } else if (newValue === null) {
      const newState = { ...this.state };
      newState.manufacturer = null;
      newState.edit_item.manufacturer_id = "";
      this.setState(newState);
    }
  };

  handleBrandChange = (newValue) => {
    if (newValue !== null && newValue.__isNew__) {
      this.setState({
        brand: newValue,
      });
    } else if (newValue !== null) {
      const newState = { ...this.state };
      newState.edit_item.brand_id = newValue.value;
      this.setState(newState);
    } else if (newValue === null) {
      const newState = { ...this.state };
      newState.brand = null;
      newState.edit_item.brand_id = "";
      this.setState(newState);
    }
  };

  handleCategoryChange = (newValue) => {
    if (newValue !== null && newValue.__isNew__) {
      this.setState({
        category: newValue,
      });
    } else if (newValue !== null) {
      const newState = { ...this.state };
      newState.edit_item.category_id = newValue.value;
      this.setState(newState);
    } else if (newValue === null) {
      const newState = { ...this.state };
      newState.category = null;
      newState.edit_item.category_id = "";
      this.setState(newState);
    }
  };

  handleOrganizationTaxFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.organization_tax[field] = value;

    this.setState(newState);
  };

  handleTaxChange = (newValue) => {
    if (newValue !== null && newValue.__isNew__) {
      this.toggleTax();
    } else if (newValue === null) {
      const newState = { ...this.state };
      newState.organization_tax.name = null;
      newState.organization_tax.rate = null;
      newState.edit_item.organization_tax_id = "";
      this.setState(newState);
    } else if (newValue !== null) {
      const newState = { ...this.state };
      newState.edit_item.organization_tax_id = newValue.value;
      this.setState(newState);
    }
  };

  handleItemAttachments = async (fileItem) => {
    if (fileItem.file.__proto__.constructor.name === "File") {
      S3FileUpload.uploadFile(fileItem.file, config)
        .then((data) => {
          let attachment = {
            attachment_link: data.location,
          };
          const newState = { ...this.state };
          newState.values.attachments = [
            ...newState.values.attachments,
            attachment,
          ];

          newState.item_attachments = [
            ...newState.item_attachments,
            {
              source: data.location,
              options: {
                type: "local",
                file: fileItem.file,
              },
            },
          ];
          this.setState(newState);
        })
        .catch((err) => console.error(err));
    }
  };

  handleItemAttachmentsRemove = (fileItem) => {
    let filename = `https://gymapp-assets.s3.amazonaws.com/uploads/${fileItem.filename}`;

    const newState = { ...this.state };

    newState.item_attachments = this.state.item_attachments.filter(
      (attachment) => attachment.source !== filename
    );

    newState.values.attachments = this.state.values.attachments.filter(
      (attachment) => attachment.attachment_link !== filename
    );
    this.setState(newState);

    S3FileUpload.deleteFile(fileItem.file, config)
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.edit_item[field] = value;

    this.setState(newState);
  };

  handleStatusChange = (value) => {
    const newState = { ...this.state };
    if (value) {
      newState.edit_item.is_active = 1;
      this.setState(newState);
    } else {
      newState.edit_item.is_active = 0;
      this.setState(newState);
    }
  };

  handleUnitChange = (selectedOption) => {
    const newState = { ...this.state };
    newState.edit_item["unit_id"] = selectedOption.value;

    this.setState(newState);
  };

  handleChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  handleItemOptions = (idx, selectedOption, productOption) => {
    const productOptions = [...this.state.productOptions];

    if (selectedOption !== null && selectedOption.__isNew__) {
      if (this.state.variantsOption.length !== 0) {
        const variantsOption = [...this.state.variantsOption];
        variantsOption.forEach((option) => {
          if (option.productOption.values === productOption.values) {
            option.name = selectedOption.value;
            this.setState({
              variantsOption: variantsOption,
            });
          } else {
            this.setState({
              variantsOption: this.state.variantsOption.concat([
                { name: selectedOption.value, productOption: productOption },
              ]),
            });
          }
        });
      } else {
        this.setState({
          variantsOption: this.state.variantsOption.concat([
            { name: selectedOption.value, productOption: productOption },
          ]),
        });
      }
    } else {
      productOptions.forEach((product_option) => {
        if (product_option.option === productOption.option) {
          product_option.option = selectedOption.value;
        }
      });
      this.setState({
        itemOptions: this.state.itemOptions.concat([
          { option: selectedOption.value },
        ]),
        productOptions: productOptions,
      });
    }
  };

  handleOneItemOptions = (selectedOption) => {
    const productOptions = [...this.state.productOptions];
    productOptions[0].option = selectedOption.value;
    this.setState({
      itemOptions: this.state.itemOptions.concat([
        { option: selectedOption.value },
      ]),
      productOptions: productOptions,
    });
  };

  handleAddProductOptions = () => {
    this.setState({
      productOptions: this.state.productOptions.concat([
        { option: "", values: [] },
      ]),
    });
  };

  handleAddProductOptionValues = async (idx, selectedOption, productOption) => {
    const productOptions = [...this.state.productOptions];

    productOptions.forEach((option) => {
      if (option.values === productOption.values) {
        option.values = selectedOption;
      }
    });
    this.setState({
      productOptions: productOptions,
    });
  };

  handleAddOneProductOptionValues = async (selectedOption) => {
    const productOptions = [...this.state.productOptions];
    productOptions[0].values = selectedOption;
    this.setState({
      productOptions: productOptions,
    });
  };

  handleItemValues = (idx, selectedOption, productOption, field) => {
    const edit_item = { ...this.state.edit_item };
    edit_item.item_details.map((itemDetail) => {
      if (itemDetail.item_option_id === productOption.item_option_id) {
        itemDetail[field] = selectedOption.value;
      }
    });
    this.setState({
      edit_item: edit_item,
    });
  };

  handleItemQuantity = (idx, selectedOption, productOption, field) => {
    const productOptions = [...this.state.productOptions];
    productOptions.forEach((option) => {
      if (option.values === productOption.values) {
        if (
          option.values[idx].locations &&
          option.values[idx].locations[0].item_option_id
        ) {
          option.values[idx].locations.forEach((location) => {
            location.quantity = selectedOption.value;
          });
        } else {
          option.values[idx].locations = [];
          this.state.locations.forEach((location) => {
            option.values[idx].locations.push({
              id: location.id,
              quantity: selectedOption.value,
            });
          });
        }
        const totalLocations = option.values[idx].locations.reduce(
          (total, location) => total + parseInt(location.quantity, 10),
          0
        );
        option.values[idx].total_locations = totalLocations;
      }
    });
    this.setState({
      productOptions: productOptions,
    });
  };

  handleItemAllLocation = (idx, value, productOption) => {
    const edit_items = [...this.state.edit_items];
    edit_items.map((itemDetail) => {
      if (itemDetail.item_option_id === productOption.item_option_id) {
        itemDetail.item_quantities = !itemDetail.item_quantities;
      }
    });
    this.setState({
      edit_items: edit_items,
    });
  };

  handleEditLocation = (
    idx,
    location_index,
    selectedOption,
    productOption,
    location_id
  ) => {
    const edit_item = { ...this.state.edit_item };
    edit_item.item_details.map((itemDetail) => {
      if (
        itemDetail.item_option_id === productOption.item_option_id &&
        itemDetail.organization_location_id === location_id
      ) {
        itemDetail.quantity = selectedOption.value;
      }
    });
    this.setState({
      edit_item: edit_item,
    });

    // const productOptions = [...this.state.productOptions];
    // productOptions.forEach(option => {
    //   if (option.values === productOption.values) {
    //     if (
    //       option.values[idx].locations &&
    //       option.values[idx].locations[0].item_option_id
    //     ) {
    //       option.values[idx].locations[location_index].quantity =
    //         selectedOption.value;
    //     } else if (
    //       option.values[idx].locations &&
    //       !option.values[idx].locations[0].item_option_id
    //     ) {
    //       option.values[idx].locations[location_index] = {
    //         id: location_id,
    //         quantity: selectedOption.value
    //       };
    //     } else {
    //       option.values[idx].locations = [];
    //       option.values[idx].locations[location_index] = {
    //         id: location_id,
    //         quantity: selectedOption.value
    //       };
    //     }
    //   }
    // });
    // this.setState({
    //   productOptions: productOptions
    // });
  };

  handleRemoveProductOptions = (idx) => () => {
    this.setState({
      productOptions: this.state.productOptions.filter(
        (s, sidx) => idx !== sidx
      ),
    });
    this.setState({
      itemOptions: this.state.itemOptions.filter((s, sidx) => idx !== sidx),
    });
  };

  handleEditLocationSubmit = (idx, productOption) => {
    const map4 = this.state.edit_item.item_details.reduce(
      (map4, itemDetail) => {
        if (map4[itemDetail.item_option_id]) {
          map4[itemDetail.item_option_id].total_quantity += Number(
            itemDetail.quantity
          );
          if (
            map4[itemDetail.item_option_id].quantityChecker !==
            Number(itemDetail.quantity)
          ) {
            map4[itemDetail.item_option_id].status = true;
          }
        } else {
          map4[itemDetail.item_option_id] = {
            ...itemDetail,
            total_quantity: Number(itemDetail.quantity),
            quantityChecker: Number(itemDetail.quantity),
            status: false,
          };
        }
        return map4;
      },
      {}
    );

    const array = Object.keys(map4).map((id) => {
      const { quantityChecker, status, total_quantity, ...rest } = map4[id];
      return {
        ...rest,
        item_quantities: status,
        total_quantity: total_quantity,
      };
    });
    this.setState({
      edit_items: array,
    });

    this.toggle();
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
    } = this.state;
    const organization_id = localStorage.getItem("organization_id");

    const newState = { ...this.state };
    newState.touched.unit = true;
    this.setState(newState);
    const showUnitError = touched.unit && values.unit_id === "";

    if (showUnitError === false) {
      if (this.state.locations.length !== 0) {
        const newState = { ...this.state };
        newState.values.item_options = newState.productOptions;
        this.setState(newState);
        if (manufacturer !== null) {
          await this.props
            .createManufacturer(manufacturer.value, organization_id)
            .then((manufacturer) => {
              const newState = { ...this.state };
              newState.edit_item.manufacturer_id = manufacturer.data.data.id;
              this.setState(newState);
            });
        }
        if (brand !== null) {
          await this.props
            .createBrand(brand.value, organization_id)
            .then((brand) => {
              const newState = { ...this.state };
              newState.edit_item.brand_id = brand.data.data.id;
              this.setState(newState);
            });
        }
        if (category !== null) {
          await this.props.createCategory(category.value).then((category) => {
            const newState = { ...this.state };
            newState.edit_item.category_id = category.data.data.id;
            this.setState(newState);
          });
        }
        if (organization_tax.name !== null) {
          await this.props
            .createOrganizationTaxes(
              organization_tax,
              localStorage.getItem("organization_id")
            )
            .then((tax) => {
              const newState = { ...this.state };
              newState.edit_item.organization_tax_id = tax.taxes.data.data.id;
              this.setState(newState);
            });
        }

        if (variantsOption.length !== 0) {
          const newState = { ...this.state };
          await variantsOption.forEach((option) => {
            this.props
              .createItemOption(
                option.name,
                localStorage.getItem("organization_id")
              )
              .then((itemOption) => {
                newState.edit_item.item_options.forEach((productOption) => {
                  if (productOption === option.productOption) {
                    productOption.option = itemOption.data.data.id;
                  }
                });

                this.setState(newState);
              });
          });
        }
        this.props
          .updateItem(this.state.edit_item, this.state.item.id)
          .then((item) => {
            if (item) {
              if (item.status === 201) {
                this.setState({
                  toastrInstance: "success",
                  toastrTitle: "Success",
                  toastrMessage: "You have successfully updated the item",
                });
                this.showToastr();
                this.props.history.push("/items/all");
              }
            }
          });
      } else {
        const newState = { ...this.state };
        newState.toastrInstance = "error";
        newState.toastrTitle = "Error";
        newState.toastrMessage = "Please add organization locations";
        this.setState(newState);

        this.showToastr();
      }
    } else {
      const newState = { ...this.state };
      newState.touched.unit = true;
      newState.toastrInstance = "error";
      newState.toastrTitle = "Error";
      newState.toastrMessage = "Please fill mandatory fields";
      this.setState(newState);

      this.showToastr();
    }
  };
  render() {
    const {
      touched,
      values,
      manufacturer,
      brand,
      category,
      organization_tax,
    } = this.state;
    const showManufactureError =
      touched.manufacturer && !manufacturer && values.manufacturer_id === "";
    const showBrandError = touched.brand && !brand && values.brand_id === "";
    const showCategoryError =
      touched.categories && !category && values.category_id === "";
    const showUnitError = touched.unit && values.unit_id === "";
    const showTaxError =
      touched.tax && !organization_tax.rate && values.unit_id === "";
    return (
      <Container>
        {this.state.manufacturersOptionList !== null &&
          this.state.variantsOptionList !== null && (
            <AvForm
              onValidSubmit={this.handleSubmit}
              onInvalidSubmit={this.handleInvalidSubmit}
              model={this.state.edit_item}
            >
              <ItemEditForm
                props={this.state}
                item={this.state.item}
                edit_item={this.state.edit_item}
                handleChecked={this.handleChecked}
                handleAddProductOptions={this.handleAddProductOptions}
                handleRemoveProductOptions={this.handleRemoveProductOptions}
                handleSubmit={this.handleSubmit}
                unitsOptionList={this.state.unitsOptionList}
                variantsOptionList={this.state.variantsOptionList}
                variantsValuesList={this.state.variantsValuesList}
                manufacturersOptionList={this.state.manufacturersOptionList}
                brandsOptionList={this.state.brandsOptionList}
                categoriesOptionList={this.state.categoriesOptionList}
                handleFieldChange={this.handleFieldChange}
                handleStatusChange={this.handleStatusChange}
                handleAddProductOptionValues={this.handleAddProductOptionValues}
                handleItemOptions={this.handleItemOptions}
                handleOneItemOptions={this.handleOneItemOptions}
                handleAddOneProductOptionValues={
                  this.handleAddOneProductOptionValues
                }
                handleUnitChange={this.handleUnitChange}
                handleItemAttachments={this.handleItemAttachments}
                handleItemAttachmentsRemove={this.handleItemAttachmentsRemove}
                handleManufacturerChange={this.handleManufacturerChange}
                handleBrandChange={this.handleBrandChange}
                handleCategoryChange={this.handleCategoryChange}
                getManufacturers={this.getManufacturers}
                defaultValue={this.state.defaultValue}
                item_attachments={this.state.item_attachments}
                OrganizationTaxOptionList={this.state.OrganizationTaxOptionList}
                toggleTax={this.toggleTax}
                handleTaxChange={this.handleTaxChange}
                showBrandError={showBrandError}
                showCategoryError={showCategoryError}
                showManufactureError={showManufactureError}
                showTaxError={showTaxError}
                showUnitError={showUnitError}
                handleOrganizationTaxFieldChange={
                  this.handleOrganizationTaxFieldChange
                }
                edit_item_options={this.state.edit_item_options}
              />

              <ItemRows
                props={this.state}
                edit_items={this.state.edit_items}
                item={this.state.item}
                toggle={this.toggle}
                handleItemValues={this.handleItemValues}
                handleItemQuantity={this.handleItemQuantity}
                handleEditLocation={this.handleEditLocation}
                handleItemAllLocation={this.handleItemAllLocation}
                handleEditLocationSubmit={this.handleEditLocationSubmit}
              />
              <ActionPanel props={this.props} />
            </AvForm>
          )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  updateItem: itemActions.updateItem,
  units: lookupActions.getUnits,
  countries: lookupActions.getCountries,
  item_options: itemActions.getItemOptions,
  item_values: itemActions.getItemValues,
  getUser: authActions.getuser,
  locations: organizationActions.getOrganizationLocations,
  createManufacturer: manufacturerActions.create,
  createBrand: brandActions.create,
  createCategory: categoryActions.create,
  manufacturers: manufacturerActions.getManufacturers,
  brands: brandActions.getBrands,
  categories: categoryActions.getCategories,
  organizationTaxes: organizationActions.getOrganizationTaxes,
  createItemOption: itemActions.createItemOption,
  createOrganizationTaxes: organizationActions.createOrganizationTaxes,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(NewItems));
