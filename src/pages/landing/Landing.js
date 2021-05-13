import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { itemActions } from "../../redux/actions/itemActions";
import { userActions } from "../../redux/actions/userActions";
import { salesOrderActions } from "../../redux/actions/salesOrderActions";
import {
  organizationAction,
  organizationActions,
} from "../../redux/actions/organizationAction";
import { enableClassicTheme } from "../../redux/actions/themeActions";

import classnames from "classnames";

import unsplash1 from "../../assets/img/photos/unsplash-1.jpg";
import unsplash2 from "../../assets/img/photos/unsplash-2.jpg";
import unsplash3 from "../../assets/img/photos/unsplash-3.jpg";

import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  CardLink,
  CardText,
  CardTitle,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Row,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

import {
  Box,
  Chrome,
  Code,
  Download,
  Mail,
  Sliders,
  Smartphone,
} from "react-feather";
import { toastr } from "react-redux-toastr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faShoppingCart,
  faCheck,
  faExclamation,
  faGlobeAmericas,
  faInfo,
  faTimes,
  faCartArrowDown,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

import screenshotDashboardDefaultLarge from "../../assets/img/screenshots/dashboard-default-large.png";
import screenshotDashboardAnalyticsLarge from "../../assets/img/screenshots/dashboard-analytics-large.png";

import screenshotDashboardDefault from "../../assets/img/screenshots/dashboard-default.png";
import screenshotDashboardAnalytics from "../../assets/img/screenshots/dashboard-analytics.png";
import screenshotDashboardEcommerce from "../../assets/img/screenshots/dashboard-e-commerce.png";
import screenshotDashboardSocial from "../../assets/img/screenshots/dashboard-social.png";
import screenshotDashboardCrypto from "../../assets/img/screenshots/dashboard-crypto.png";
import screenshotComingSoon from "../../assets/img/screenshots/coming-soon.png";

import screenshotThemeClassic from "../../assets/img/screenshots/theme-classic.png";
import screenshotThemeModern from "../../assets/img/screenshots/theme-modern.png";
import screenshotThemeCorporate from "../../assets/img/screenshots/theme-corporate.png";

import brandBootstrap from "../../assets/img/brands/bootstrap.svg";
import brandSass from "../../assets/img/brands/sass.svg";
import brandWebpack from "../../assets/img/brands/webpack.svg";
import brandNpm from "../../assets/img/brands/npm.svg";
import brandReact from "../../assets/img/brands/react.svg";
import brandRedux from "../../assets/img/brands/redux.svg";

const Navigation = (props) => (
  <Navbar dark expand className="navbar-landing">
    <NavbarBrand href="/">
      <Box title="Space Code" />
      Space Code
    </NavbarBrand>
    <Nav className="ml-auto" navbar>
      {/* <NavItem className="d-none d-md-inline-block">
        <NavLink href="/dashboard/default" target="_blank" active>
          Preview
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/docs/introduction" target="_blank" active>
          Docs
        </NavLink>
      </NavItem> */}
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

// const Dashboards = () => (
//   <section className="py-6 bg-white">
//     <Container>
//       <Row>
//         <Col md="12" className="mx-auto text-center">
//           <div className="mb-3">
//             <h2>Multiple dashboards</h2>
//             <p className="text-muted">
//               The package includes 5 unique dashboard pages.
//             </p>
//           </div>

//           <Row>
//             <Col md="6" lg="4" className="py-3">
//               <Link to="/dashboard/default" target="_blank">
//                 <Card className="mb-2 shadow-lg cursor-pointer">
//                   <CardImg
//                     top
//                     src={screenshotDashboardDefault}
//                     alt="Default Dashboard"
//                   />
//                 </Card>
//               </Link>
//               <h4>Default</h4>
//             </Col>
//             <Col md="6" lg="4" className="py-3">
//               <Link to="/dashboard/analytics" target="_blank">
//                 <Card className="mb-2 shadow-lg cursor-pointer">
//                   <CardImg
//                     top
//                     src={screenshotDashboardAnalytics}
//                     alt="Analytics Dashboard"
//                   />
//                 </Card>
//               </Link>
//               <h4>Analytics</h4>
//             </Col>
//             <Col md="6" lg="4" className="py-3">
//               <Link to="/dashboard/e-commerce" target="_blank">
//                 <Card className="mb-2 shadow-lg cursor-pointer">
//                   <CardImg
//                     top
//                     src={screenshotDashboardEcommerce}
//                     alt="E-commerce Dashboard"
//                   />
//                 </Card>
//               </Link>
//               <h4>E-commerce</h4>
//             </Col>
//             <Col md="6" lg="4" className="py-3">
//               <Link to="/dashboard/social" target="_blank">
//                 <Card className="mb-2 shadow-lg cursor-pointer">
//                   <CardImg
//                     top
//                     src={screenshotDashboardSocial}
//                     alt="Social Dashboard"
//                   />
//                 </Card>
//               </Link>
//               <h4>Social</h4>
//             </Col>
//             <Col md="6" lg="4" className="py-3">
//               <Link to="/dashboard/crypto" target="_blank">
//                 <Card className="mb-2 shadow-lg cursor-pointer">
//                   <CardImg
//                     top
//                     src={screenshotDashboardCrypto}
//                     alt="Crypto Dashboard"
//                   />
//                 </Card>
//               </Link>
//               <h4>
//                 Crypto{" "}
//                 <sup>
//                   <Badge color="primary" tag="small">
//                     New
//                   </Badge>
//                 </sup>
//               </h4>
//             </Col>
//             <Col md="6" lg="4" className="py-3">
//               <Card className="mb-2 shadow-lg">
//                 <CardImg top src={screenshotComingSoon} alt="Coming soon" />
//               </Card>
//               <h4>More coming soon</h4>
//             </Col>
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   </section>
// );

const Features = (props) => {
  console.log(props);
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
    subTotal: 0,
    items: [],
    item_options: [],
    total: null,
    totalCustomers: null,
    locations: null,
    cart: {
      orderItems: [],
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
      this.state.toastrInstance === "error" ? toastr.error : toastr.success;

    toastrInstance(this.state.toastrTitle, this.state.toastrMessage, options);
  };

  toggleCart = () => {
    this.setState((state) => ({
      orderModel: !state.orderModel,
    }));
  };

  getAllItems = () => {
    this.setState({
      item_options: [],
    });
    this.props.items().then((items, id) => {
      console.log(items);
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
        this.calSubTotal()
      }.bind(this),
      100
    );

    console.log(this.state.cart);
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

  calSubTotal = () => {
    let sub = 0;
    this.state.cart.orderItems.map((item, index) => {
      sub = sub + Number(item.productPrice) * Number(item.productQty);
    });
    this.setState({
      subTotal: sub,
    });
  };

  render() {
    const { items, cart, subTotal } = this.state;
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
                        </tr>
                      );
                    })}
                   
                  </tbody>
                </Table>
                <span className="h4 text-right">Sub Total: LKR {subTotal.toFixed(2)}</span>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.toggleCart()}>
              Close
            </Button>{" "}
            {/* <Button color="primary" onClick={() => this.updtateOrder()}>
              Save
            </Button> */}
          </ModalFooter>
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
  // getitems: salesOrderActions.getSalesOrders,
  getCustomerOrders: userActions.getuserOrders,
  updtateOrder: salesOrderActions.update,
  getCustomerByID: userActions.getuserByID,
  getOrganizationLocations: organizationActions.getOrganizationLocations,
  dispatch: enableClassicTheme,
};

export default withRouter(connect(mapStateToProps, mapActionToProps)(Landing));
