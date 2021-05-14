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
  const edit_item = props.edit_item;
  let file = props.file
  if(edit_item.productImageUrl !== "__isNew__"){
    file = "http://localhost:3000/uploads/" + edit_item.productImageUrl
  }
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
        <BreadcrumbItem active>Edit #{edit_item._id}</BreadcrumbItem>
      </Breadcrumb>
      <h1 className="h3 mb-3">Edit Items</h1>
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
                files={file}
                imagePreviewMaxHeight="200"
                onremovefile={(error, file) =>
                  props.handleItemAttachmentsRemove(file)
                }
                onupdatefiles={(file) => props.handleItemAttachments(file)}
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
                value={props.edit_item?.productName}
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
                value={props.edit_item?.productDescription}
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
                value={props.edit_item?.productPrice}
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
                value={props.edit_item?.productQuantity}
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
                onChange={props.handleProductTypeChange}
                value={props.productTypesOptionList?.filter(
                  (option) => option.value === edit_item.productType
                )}
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
                value={props.categoriesOptionList?.filter(
                  (option) => option.value === edit_item.productCategory
                )}
                options={props.categoriesOptionList}
                styles={props.showCategoryError ? customStyles : ""}
                />
                 {props.showCategoryError && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    Category is required!
                  </span>
                )}
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
                value={props.manufacturersOptionList?.filter(
                  (option) => option.value === edit_item.productManufacturer
                )}
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
                value={props.brandsOptionList?.filter(
                  (option) => option.value === edit_item.productBrand
                )}
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
    <Button disabled={props.submitting} type="submit" color="primary" className="mr-1 mb-1">
      Save
    </Button>

    <Button
      color="primary"
      className="mr-1 mb-1"
      outline
      onClick={() => props.props.history.push("/items")}
    >
      Cancel
    </Button>
  </div>
);

class NewItems extends React.Component {
  state = {
    file: null,
    toastrInstance: "",
    toastrTitle: "",
    toastrMessage: "",
    index: false,
    item_attachments: [{}],
    files: {},
    manufacturersOptionList: null,
    OrganizationTaxOptionList: [],
    brandsOptionList: [],
    categoriesOptionList: [],
    itemOptions: [],
    date: new Date(),
    isChecked: true,
    locations: [],
    values: this.props.location.state.item,
    touched: {
      type: false,
      category: false,
      manufacturer: false,
      brand: false
    },
    submitting: false,
    edit_item: this.props.location.state.item,
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
    // let item_attachments = this.props.location.state.item.item_attachments.map(
    //   (attachment) => ({
    //     source: attachment.attachment_link,
    //     options: {
    //       type: "local",
    //     },
    //   })
    // );

    // this.setState(() => ({
    //   item_attachments,
    // }));
    this.getItem()


    this.getBrands();
    this.getCategories();
    this.getManufacturers();
    this.getTypes()


  }

  getItem = () =>{
    this.props.getItem(this.props.location.state.item._id).then((item) => {
      if (item.item) {
        this.setState({
          edit_item: item.item.data,
        });
      }
    });
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



  getManufacturers = async () => {
    this.props
      .manufacturers(localStorage.getItem("organization_id"))
      .then((manufacturers) => {
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
    this.props
      .brands(localStorage.getItem("organization_id"))
      .then((brands) => {
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
      newState.edit_item.productManufacturer = newValue;
      this.setState(newState);
    } else if (newValue !== null) {
      const newState = { ...this.state };
      newState.edit_item.productManufacturer = newValue.value;
      this.setState(newState);
    } else if (newValue === null) {
      const newState = { ...this.state };
      newState.manufacturer = null;
      newState.edit_item.productManufacturer = "";
      this.setState(newState);
    }
    
  };

  handleBrandChange = (newValue) => {
    if (newValue !== null && newValue.__isNew__) {
      const newState = { ...this.state };
      newState.edit_item.productBrand = newValue;
      this.setState(newState);
    } else if (newValue !== null) {
      const newState = { ...this.state };
      newState.edit_item.productBrand = newValue.value;
      this.setState(newState);
    } else if (newValue === null) {
      const newState = { ...this.state };
      newState.brand = null;
      newState.edit_item.productBrand = "";
      this.setState(newState);
    }
  };

  handleCategoryChange = (newValue) => {
    if (newValue !== null && newValue.__isNew__) {
      const newState = { ...this.state };
      newState.edit_item.productCategory = newValue;
      this.setState(newState);
    } else if (newValue !== null) {
      const newState = { ...this.state };
      newState.edit_item.productCategory = newValue.value;
      this.setState(newState);
    } else if (newValue === null) {
      const newState = { ...this.state };
      newState.category = null;
      newState.edit_item.productCategory = "";
      this.setState(newState);
    }
  };



  handleItemAttachments = async (fileItem) => {
    console.log(fileItem)
    const newState = this.state
    newState.file = fileItem[0];
    this.setState(newState)
    console.log(this.state.file)
  };

  handleItemAttachmentsRemove = (fileItem) => {
    const newState = this.state;
      newState.edit_item.productImageUrl = "__isNew__";
      newState.file = null;
      this.setState(newState);
      console.log(this.state)
    
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

  handleProductTypeChange = (selectedOption) => {
    const newState = { ...this.state };
    newState.edit_item["productType"] = selectedOption.value;

    this.setState(newState);
  };

  handleChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };




  handleInvalidSubmit = () => {
    const newState = { ...this.state };
    newState.submitting = false
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
      touched,
      values,
      edit_item,
      file,
      submitting
    } = this.state;

    const newState = { ...this.state };
    newState.touched.unit = true;
    newState.submitting  =true;
    this.setState(newState);
    console.log(file)
    if((edit_item.productImageUrl != "__isNew__" || file)){
      if(edit_item.productType && edit_item.productCategory && edit_item.productManufacturer && edit_item.productBrand){
        var bodyFormData = new FormData
        bodyFormData.append('productName', edit_item.productName)
        bodyFormData.append('productDescription', edit_item.productDescription)
        bodyFormData.append('productPrice', edit_item.productPrice)
        bodyFormData.append('productCategory', edit_item.productCategory)
        bodyFormData.append('productType', edit_item.productType)
        bodyFormData.append('productBrand', edit_item.productBrand)
        bodyFormData.append('productQuantity', edit_item.productQuantity)
        bodyFormData.append('productManufacturer', edit_item.productManufacturer)
        bodyFormData.append('productImageUrl', edit_item.productImageUrl)
        bodyFormData.append('file', file?.file)

    
        this.props
        .updateItem(bodyFormData, this.state.edit_item._id)
        .then((item) => {
          if (item) {
            if (item.status === 200) {
              this.setState({
                submitting: false,
                toastrInstance: "success",
                toastrTitle: "Success",
                toastrMessage: "You have successfully updated the item",
              });
              this.showToastr();
              this.props.history.push("/items");
            }else{
              this.setState({
                submitting: false,
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
    }else{
      this.setState({
        submitting: false,
        toastrInstance: "error",
        toastrTitle: "Error",
        toastrMessage: "Please add an attachment",
      });
      this.showToastr();
    }
   
 
  };
  render() {
    const {
      touched,
      edit_item,
      submitting
    } = this.state;
    const showTypeError = touched.type && !edit_item.productType;
    const showCategoryError = touched.category && !edit_item.productCategory;
    const showManufactureError = touched.manufacturer && !edit_item.productManufacturer;
    const showBrandError = touched.brand && !edit_item.productBrand;
    return (
      <Container>

            <AvForm
              onValidSubmit={this.handleSubmit}
              onInvalidSubmit={this.handleInvalidSubmit}
              model={this.state.edit_item}
            >
              <ItemEditForm
              file={this.state.file}
                props={this.state}
                item={this.state.item}
                edit_item={this.state.edit_item}
                handleChecked={this.handleChecked}
                handleSubmit={this.handleSubmit}
                productTypesOptionList={this.state.productTypesOptionList}
                manufacturersOptionList={this.state.manufacturersOptionList}
                brandsOptionList={this.state.brandsOptionList}
                categoriesOptionList={this.state.categoriesOptionList}
                handleFieldChange={this.handleFieldChange}
                handleStatusChange={this.handleStatusChange}
                handleProductTypeChange={this.handleProductTypeChange}
                handleItemAttachments={this.handleItemAttachments}
                handleItemAttachmentsRemove={this.handleItemAttachmentsRemove}
                handleManufacturerChange={this.handleManufacturerChange}
                handleBrandChange={this.handleBrandChange}
                handleCategoryChange={this.handleCategoryChange}
                item_attachments={this.state.item_attachments}
                showBrandError={showBrandError}
                showCategoryError={showCategoryError}
                showManufactureError={showManufactureError}
                showTypeError={showTypeError}
              />

              <ActionPanel props={this.props} submitting={submitting} />
            </AvForm>

      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  getItem: itemActions.getItem,
  updateItem: itemActions.updateItem,
  getProductTypes: lookupActions.getProductTypes,
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
