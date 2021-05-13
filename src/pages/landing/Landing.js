import React from "react";
import { Link,  withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { itemActions } from "../../redux/actions/itemActions";
import { userActions } from "../../redux/actions/userActions";
import { salesOrderActions } from "../../redux/actions/salesOrderActions";
import { authActions } from "../../redux/actions/authActions";
import { enableClassicTheme } from "../../redux/actions/themeActions";
import Select from "react-select";
import classnames from "classnames";

import unsplash1 from "../../assets/img/photos/unsplash-1.jpg";


import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Label,
  Spinner,
} from "reactstrap";

import {
  AvForm,
} from "availity-reactstrap-validation";
import AvField from "availity-reactstrap-validation/lib/AvField";
import {
  Box,
  Trash2,
} from "react-feather";
import { toastr } from "react-redux-toastr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCartArrowDown,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";


const options = [
  { value: 1, label: "Cash On Delivery" },
  { value: 2, label: "Paypal" },
];

const Navigation = (props) => (
  <Navbar dark expand className="navbar-landing">
    <NavbarBrand href="/">
      <Box title="Space Code" />
      Space Code
    </NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem className="d-none d-md-inline-block">
        <Button
          onClick={() => props.toggleCart()}
          color="info"
          className="ml-2"
        >
          <FontAwesomeIcon icon={faCartArrowDown} />
        </Button>
      </NavItem>
      <NavItem className="d-none d-md-inline-block">
        <Button
          href="auth/sign-in"
          rel="noopener noreferrer"
          color="warning"
          className="ml-2"
        >
          Sign In
        </Button>
      </NavItem>
    </Nav>
  </Navbar>
);

const Features = (props) => {
  return (
    <section className="py-6">
      <Container>
        <Row>
          <Col md="10" className="mx-auto text-center">
            <div className="mb-3">
              <h2>Features</h2>
              <p className="text-muted">
                A responsive dashboard built for everyone who wants to create
                webapps on top of Bootstrap.
              </p>
            </div>

            <Row>
              {props.items?.map((item, index) => (
                <Col key={index} md="6" lg="4">
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src={unsplash1}
                      alt="Card image cap"
                    />
                    <CardHeader>
                      <CardTitle tag="h5" className="mb-0">
                        {item.productName}
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <CardText>{item.productDescription}</CardText>
                      <CardText>LKR {item.productPrice}</CardText>
                      <Button
                        onClick={() => props.addToCart(item)}
                        color="primary"
                      >
                        ADD TO CART
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Footer = () => (
  <section className="py-5">
    <Container className="text-center">
      <h2 className="mb-0">
        Trusted by over 2500+ customers world wide{" "}
        <Button
          color="primary"
          size="lg"
          href="https://themes.getbootstrap.com/product/appstack-react-admin-dashboard-template/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="align-middle">
            <FontAwesomeIcon icon={faShoppingCart} className="text-white" />{" "}
          </span>
          <span className="align-middle">Purchase</span>
        </Button>
      </h2>
    </Container>
  </section>
);

class Landing extends React.Component {
  state = {
    items: [],
    item_options: [],
    total: null,
    totalCustomers: null,
    locations: null,
    cart: {
      firstName: "",
      lastName: "",
      customerId: "",
      customerAddress: "",
      customerEmail: "",
      orderTotal: 0,
      orderCurrency: "LKR",
      orderPaymentMethod: "Cash On Delivery",
      orderItems: [],
    },
    loading: false,
    values: {
      email: "",
      password: "",
    },
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(enableClassicTheme());
  }

  componentDidMount() {
    this.getAllItems();
  }

  showToastr = () => {
    const options = {
      timeOut: 5000,
      showCloseButton: true,
      progressBar: true,
      position: "top-right",
    };

    const toastrInstance =
      this.state.toastrInstance === "error"
        ? toastr.error
        : this.state.toastrInstance === "info"
        ? toastr.info
        : toastr.success;

    toastrInstance(this.state.toastrTitle, this.state.toastrMessage, options);
  };

  toggleCart = () => {
    this.setState((state) => ({
      orderModel: !state.orderModel,
    }));
  };

  toggleLogin = () => {
    this.setState((state) => ({
      loginModel: !state.loginModel,
    }));
  };

  toggleCheckout = () => {
    this.setState((state) => ({
      checkoutModel: !state.checkoutModel,
    }));
  };

  getAllItems = () => {
    this.setState({
      item_options: [],
    });
    this.props.items().then((items, id) => {
      if (items.items && items.items.status === 200) {
        this.setState({
          items: items.items.data,
          total: items.items.data.length,
          totalitems: items.items.data.length,
        });
      }
    });
  };

  addToCart = async (item) => {
    let access_token = localStorage.getItem("access_token");
    if (access_token && access_token !== "undefined") {
      const newState = this.state;
      let itemIndex = this.state.cart.orderItems.findIndex(function (c) {
        return c.productId == item._id;
      });

      if (itemIndex !== -1) {
        newState.toastrInstance = "info";
        newState.toastrTitle = "Info";
        newState.toastrMessage = "Item already added";
        this.setState(newState);

        setTimeout(
          function () {
            this.showToastr();
          }.bind(this),
          100
        );
      } else {
        const orderItem = {
          productId: item._id,
          productName: item.productName,
          productPrice: item.productPrice,
          productQty: 1,
        };
        const newState = { ...this.state };
        newState.cart.orderItems.push(orderItem);
        newState.toastrInstance = "success";
        newState.toastrTitle = "Success";
        newState.toastrMessage = "Item added to cart successfully";
        this.setState(newState);

        setTimeout(
          function () {
            this.showToastr();
            this.calSubTotal();
          }.bind(this),
          100
        );
      }
    } else {
      this.setState((state) => ({
        loginModel: !state.loginModel,
      }));
    }
  };

  handlePaymentTypeChange = (selectedOption) => {
    const newState = { ...this.state };
    newState.cart.orderPaymentMethod = selectedOption.label;
    this.setState(newState);
  };

  handleAddressChange = (value) => {
    const newState = { ...this.state };
    newState.cart.customerAddress = value;
    this.setState(newState);
  };

  IncrementItem = (productID) => {
    const newState = this.state;
    let itemIndex = this.state.cart.orderItems.findIndex(function (c) {
      return c.productId == productID;
    });

    newState.cart.orderItems[itemIndex].productQty =
      newState.cart.orderItems[itemIndex].productQty + 1;

    this.setState(newState);

    setTimeout(
      function () {
        this.calSubTotal();
      }.bind(this),
      100
    );
  };

  DecreaseItem = (productID) => {
    const newState = this.state;
    let itemIndex = this.state.cart.orderItems.findIndex(function (c) {
      return c.productId == productID;
    });

    if (newState.cart.orderItems[itemIndex].productQty > 1) {
      newState.cart.orderItems[itemIndex].productQty =
        newState.cart.orderItems[itemIndex].productQty - 1;

      this.setState(newState);
      setTimeout(
        function () {
          this.calSubTotal();
        }.bind(this),
        100
      );
    }
  };

  deleteItem = (productID) => {
    const newState = this.state;
    let itemIndex = this.state.cart.orderItems.findIndex(function (c) {
      return c.productId == productID;
    });

    if (itemIndex !== -1) {
      newState.cart.orderItems.splice(itemIndex, 1);
      this.setState(newState);
    }
  };

  calSubTotal = () => {
    let sub = 0;
    this.state.cart.orderItems.map((item, index) => {
      sub = sub + Number(item.productPrice) * Number(item.productQty);
    });
    const newState = this.state;
    newState.cart.orderTotal = sub;
    this.setState(newState);
  };

  checkout = () => {
    let access_token = localStorage.getItem("access_token");
    let user = localStorage.getItem("user");
    if (
      access_token &&
      access_token !== "undefined" &&
      user &&
      user !== "undefined"
    ) {
      user  = JSON.parse(user)
      const newState = { ...this.state };
      newState.loading = false;
      newState.cart.firstName = user.firstName;
      newState.cart.lastName = user.lastName;
      newState.cart.customerId = user._id;
      newState.cart.customerAddress = user.userAddress;
      newState.cart.customerEmail = user.email;
      newState.checkoutModel = !newState.checkoutModel;
      this.setState(newState);
    } else {
      this.setState((state) => ({
        loginModel: !state.loginModel,
      }));
    }
  };

  completeCheckout = () => {
    this.props.creatOrder(this.state.cart).then((order) => {
      if (order) {
        if (order.status === 200) {
          this.setState({
            toastrInstance: "success",
            toastrTitle: "Success",
            toastrMessage: "Order Created Successfully!!",
          });
          this.showToastr();
          this.resetForm();
        }else{
          this.setState({
            toastrInstance: "error",
            toastrTitle: "Error",
            toastrMessage: "Something went wrong please try again",
          });
          this.showToastr();
        }
      }
    });
  };

  resetForm = () =>{
    const newState = this.state
    newState.checkoutModel = false;
    newState.orderModel = false
    newState.cart.orderItems = []
    this.setState(newState)
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.values[field] = value;
    this.setState(newState);
  };

  handleInvalidSubmit = (event, errors, values) => {
    const newState = { ...this.state };
    newState.toastrInstance = "error";
    newState.toastrTitle = "";
    newState.toastrMessage = "Email and Password are required";
    this.setState(newState);

    this.showToastr();
  };

  handleSubmit = () => {
    this.setState({
      loading: true,
    });

    const { email, password } = this.state.values;
    this.props.login(email, password).then((user) => {
      if (user) {
        if (user.status === 200) {
          this.props.getUser().then((user) => {
            if (user.user && user.user.status == 200) {
              const loggedUser = user.user.data;
              const newState = { ...this.state };
              newState.loading = false;
              newState.cart.firstName = loggedUser.firstName;
              newState.cart.lastName = loggedUser.lastName;
              newState.cart.customerId = loggedUser._id;
              newState.cart.customerAddress = loggedUser.userAddress;
              newState.cart.customerEmail = loggedUser.email;
              newState.loginModel = !newState.loginModel;
              this.setState(newState);
            } else {
              this.setState({ loading: false });
              const newState = { ...this.state };
              newState.toastrInstance = "error";
              newState.toastrTitle = "Error";
              newState.toastrMessage = user.data.error;
              this.setState(newState);

              this.showToastr();
            }
          });
        } else {
          this.setState({ loading: false });
          const newState = { ...this.state };
          newState.toastrInstance = "error";
          newState.toastrTitle = "Error";
          newState.toastrMessage = user.data.error;
          this.setState(newState);

          this.showToastr();
        }
      }
    });
  };

  render() {
    const { items, cart, loading } = this.state;
    return (
      <React.Fragment>
        <Navigation toggleCart={this.toggleCart} />
        <Features items={items} addToCart={this.addToCart} />
        <Footer />

        <Modal
          isOpen={this.state.orderModel}
          toggle={() => this.toggleCart()}
          centered
          size="lg"
        >
          <ModalHeader toggle={() => this.toggleCart()}>
            Shopping Cart
          </ModalHeader>
          <ModalBody className=" m-3">
            {cart.orderItems.length == 0 ? (
              <h2 className="text-center"> You cart is empty! </h2>
            ) : (
              <div>
                {" "}
                <h3>Cart Items</h3>
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Product Name</th>
                      <th>Product Pirce</th>
                      <th>Quantity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.orderItems?.map((item, index) => {
                      return (
                        <tr key={item.productId}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.productName}</td>
                          <td>{item.productPrice}</td>
                          <td>
                            <Button
                              onClick={() => this.DecreaseItem(item.productId)}
                              color="info"
                              className="mr-2"
                              size="sm"
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </Button>
                            {item.productQty}{" "}
                            <Button
                              onClick={() => this.IncrementItem(item.productId)}
                              color="info"
                              className="ml-2"
                              size="sm"
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </Button>
                          </td>
                          <td>
                            <Button
                              onClick={() => this.deleteItem(item.productId)}
                              color="outline danger"
                              className="mt-n1 "
                            >
                              <Trash2 className="align-middle ml-1" size={18} />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <span className="h4 text-right">
                  Sub Total: LKR {cart.orderTotal?.toFixed(2)}
                </span>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleCart()}>
              Close
            </Button>{" "}
            <Button
              disabled={cart.orderItems.length == 0}
              color="primary"
              onClick={() => this.checkout()}
            >
              Proceed To Checkout
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.loginModel}
          toggle={() => this.toggleLogin()}
          centered
          size="md"
        >
          <ModalHeader toggle={() => this.toggleLogin()}>
            Welcome! Please Login to continue.
          </ModalHeader>
          <ModalBody className=" m-3">
            <div className="m-sm-4">
              <AvForm
                onValidSubmit={this.handleSubmit}
                onInvalidSubmit={this.handleInvalidSubmit}
              >
                <FormGroup>
                  <Label>Email</Label>
                  <AvField
                    bsSize="lg"
                    type="email"
                    name="email"
                    value={""}
                    placeholder="Enter your email"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Email is required!",
                      },
                      email: {
                        errorMessage: "Email is not vaid",
                      },
                    }}
                    onChange={(event) =>
                      this.handleFieldChange("email", event.target.value)
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Password</Label>
                  <AvField
                    bsSize="lg"
                    type="password"
                    name="password"
                    value={""}
                    placeholder="Enter your password"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Password is required!",
                      },
                    }}
                    onChange={(event) =>
                      this.handleFieldChange("password", event.target.value)
                    }
                  />

                  <small>
                    <Link to="/auth/forgot-password">Forgot password?</Link>
                  </small>
                </FormGroup>
                <div className="text-center mt-3">
                  <Button
                    disabled={loading ? true : false}
                    color="primary"
                    type="submit"
                    size="lg"
                  >
                    {loading ? (
                      <Spinner color="dark" className="mr-2" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </AvForm>
            </div>
            <FormGroup>
              <Label>New member ?</Label>{" "}
              <Link to="/auth/sign-up">Sign up</Link>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleLogin()}>
              Close
            </Button>{" "}
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.checkoutModel}
          toggle={() => this.toggleCheckout()}
          centered
          size="lg"
        >
          <ModalHeader toggle={() => this.toggleCheckout()}>
            Checkout
          </ModalHeader>
          <AvForm
            onValidSubmit={this.completeCheckout}
            onInvalidSubmit={this.handleInvalidSubmit}
          >
            <ModalBody className=" m-3">
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  First Name
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="ref_no"
                    value={cart.firstName}
                    placeholder="First Name"
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Last Name
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="ref_no"
                    value={cart.lastName}
                    placeholder="Last Name"
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Email
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="ref_no"
                    value={cart.customerEmail}
                    placeholder="Email"
                    readOnly
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Address
                </Label>
                <Col sm={8}>
                  <AvField
                    type="text"
                    name="ref_no"
                    placeholder="Address"
                    value={cart.customerAddress}
                    onChange={(event) =>
                      this.handleAddressChange(event.target.value)
                    }
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Address is required!",
                      },
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={3} className="text-sm-right">
                  Payment Method
                </Label>
                <Col sm={8}>
                  <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={options}
                    value={options?.filter(
                      (option) => option.label === cart.orderPaymentMethod
                    )}
                    onChange={this.handlePaymentTypeChange}
                    name="PaymentMethod"
                  />
                </Col>
              </FormGroup>
              <h3>Order Items</h3>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Product Pirce</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.orderItems?.map((item, index) => {
                    return (
                      <tr key={item.productId}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.productName}</td>
                        <td> {item.productPrice}</td>
                        <td>{item.productQty}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <span className="h4 text-right">
                Sub Total: LKR {cart.orderTotal.toFixed(2)}
              </span>
            </ModalBody>
            <ModalFooter>
              <Button
                type="button"
                color="secondary"
                onClick={() => this.toggleCheckout()}
              >
                Close
              </Button>{" "}
              <Button
                type="submit"
                color="success"
                
              >
                Complete Checkout and Pay
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  items: itemActions.getAllItems,
 creatOrder: salesOrderActions.create,
  getCustomerOrders: userActions.getuserOrders,
  updtateOrder: salesOrderActions.update,
  getCustomerByID: userActions.getuserByID,
  dispatch: enableClassicTheme,
  login: authActions.login,
  getUser: authActions.getuser,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Landing));
