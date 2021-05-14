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
import AvField from "availity-reactstrap-validation/lib/AvField";

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
                allowMultiple={false}
                imagePreviewMaxHeight="200"
                onremovefile={(error, file) =>
                  props.handleItemAttachmentsRemove(file)
                }
                onaddfilestart={(file) => props.handleItemAttachments(file)}
              />
            </Col>
          </AvGroup>

          <FormGroup row>
            <Label sm={2} className="text-sm-right required">
              Item Name
            </Label>
            <Col sm={10}>
              <AvField
                type="text"
                name="productName"
                placeholder="Enter Item Name"
                required
                onChange={(event) =>
                  props.handleFieldChange("productName", event.target.value)
                }
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Item name is required!",
                  }
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} className="text-sm-right required">
              Description
            </Label>
            <Col sm={10}>
              <AvField
                type="textarea"
                name="productDescription"
                rows="3"
                required
                placeholder="Enter Description"
                onChange={(event) =>
                  props.handleFieldChange(
                    "productDescription",
                    event.target.value
                  )
                }
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Description is required!",
                  }
                }}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} className="text-sm-right required">
              Price
            </Label>
            <Col sm={4}>
              <AvField
                type="number"
                name="productPrice"
                rows="3"
                required
                placeholder="Enter Price"
                onChange={(event) =>
                  props.handleFieldChange("productPrice", event.target.value)
                }
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Price is required!",
                  }
                }}
              />
            </Col>
            <Label sm={2} className="text-sm-right required">
              Quantity
            </Label>
            <Col sm={4}>
              <AvField
                type="number"
                name="productQuantity"
                rows="3"
                placeholder="Enter Quantity"
                required
                onChange={(event) =>
                  props.handleFieldChange("productQuantity", event.target.value)
                }
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Quantity is required!",
                  }
                }}
              />
       
            </Col>
          </FormGroup>

          <FormGroup row>
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
                styles={props.showTypeError ? customStyles : ""}
              />
              {props.showTypeError && (
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
                styles={props.showCategoryError ? customStyles : ""}
              />
               {props.showCategoryError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  Category is required!
                </span>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} className="text-sm-right">
              Manufacturer
            </Label>
            <Col sm={4}>
              <CreatableSelect
                isClearable
                onChange={props.handleManufacturerChange}
                options={props.manufacturersOptionList}
                styles={props.showManufactureError ? customStyles : ""}
              />
               {props.showManufactureError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  Manufacturer is required!
                </span>
              )}
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
                styles={props.showBrandError ? customStyles : ""}
              />
               {props.showBrandError && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  Brand is required!
                </span>
              )}
            </Col>
          </FormGroup>
        </CardBody>
      </Card>
    </Container>
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
      disabled={props.submitting}
      outline
      onClick={() => props.props.history.push("/items")}
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
    values: {
      attachments: []
    },
    touched: {
      type: false,
      category: false,
      manufacturer: false,
      brand: false
    },
    submitting: false
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
    this.getManufacturers();
    this.getBrands();
    this.getCategories();
  }


  getTypes = () => {
    this.props.getProductTypes().then((types) => {
      if (types.productTypes) {
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




  getManufacturers = () => {
    this.props.manufacturers().then((manufacturers) => {
      if (manufacturers.manufacturers) {
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
      newState.values.productManufacturer = newValue;
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
      newState.values.productBrand = newValue;
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
    const newState = this.state
    newState.values.attachments.push(fileItem.file);
    this.setState(newState)

  };

  handleItemAttachmentsRemove = (fileItem) => {
    const newState = this.state;
    let itemIndex = this.state.values.attachments.findIndex(function (c) {
      return c == fileItem.file;
    });

    if (itemIndex !== -1) {
      newState.values.attachments.splice(itemIndex, 1);
      this.setState(newState);
    }
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.values[field] = value;

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
    newState.submitting =  false;
    newState.touched.type = true;
    newState.touched.brand = true;
    newState.touched.manufacturer = true;
    newState.touched.category = true;
    newState.toastrInstance = "error";
    newState.toastrTitle = "Error";
    newState.toastrMessage = "Please fill mandatory fields";
    this.setState(newState);

    this.showToastr();
  };

  handleSubmit = async () => {
    const {
      values,
    } = this.state;
    this.setState({
      submitting: true
    })
    if(values.productType && values.productCategory && values.productManufacturer && values.productBrand){

      var bodyFormData = new FormData
      bodyFormData.append('productName', values.productName)
      bodyFormData.append('productDescription', values.productDescription)
      bodyFormData.append('productPrice', values.productPrice)
      bodyFormData.append('productCategory', values.productCategory)
      bodyFormData.append('productType', values.productType)
      bodyFormData.append('productBrand', values.productBrand)
      bodyFormData.append('productQuantity', values.productQuantity)
      bodyFormData.append('productManufacturer', values.productManufacturer)
      bodyFormData.append('file', values.attachments[0])

      this.props.createNewItem(bodyFormData).then((item) => {
        if (item) {
          if (item.status === 200) {
            this.setState({
              submitting:false,
              toastrInstance: "success",
              toastrTitle: "Success",
            
              toastrMessage: "You have successfully created a item",
            });
            this.showToastr();
            this.props.history.push("/items");
          }else{
            this.setState({
              submitting:false,
              toastrInstance: "error",
              toastrTitle: "Error",
              toastrMessage: "Something went wrong please try again",
            });
            this.showToastr();
          }
        }
      });
  
    }else{
      this.handleInvalidSubmit()
    }
  };

  render() {
    const { touched, values, submitting } = this.state;
    const showTypeError = touched.type && !values.productType;
    const showCategoryError = touched.category && !values.productCategory;
    const showManufactureError = touched.manufacturer && !values.productManufacturer;
    const showBrandError = touched.brand && !values.productBrand;
    return (
      <Container>
        <AvForm
          onValidSubmit={this.handleSubmit}
          onInvalidSubmit={this.handleInvalidSubmit}
        >
          <HorizontalForm
            props={this.state}
            productTypesOptionList={this.state.productTypesOptionList}
            manufacturersOptionList={this.state.manufacturersOptionList}
            brandsOptionList={this.state.brandsOptionList}
            categoriesOptionList={this.state.categoriesOptionList}
            handleChecked={this.handleChecked}
            handleSubmit={this.handleSubmit}
            handleFieldChange={this.handleFieldChange}
            handleTypeChange={this.handleTypeChange}
            handleItemAttachments={this.handleItemAttachments}
            handleItemAttachmentsRemove={this.handleItemAttachmentsRemove}
            handleManufacturerChange={this.handleManufacturerChange}
            handleBrandChange={this.handleBrandChange}
            handleCategoryChange={this.handleCategoryChange}
            toggleTax={this.toggleTax}
            showTypeError={showTypeError}
            showCategoryError={showCategoryError}
            showManufactureError={showManufactureError}
            showBrandError={showBrandError}
          />
          <ActionPanel props={this.props} submitting={submitting}/>
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
