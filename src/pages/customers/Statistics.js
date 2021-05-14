import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../../redux/actions/userActions";

import { Col, Card, CardBody, CardHeader, Progress, Row } from "reactstrap";

class Statistics extends React.Component {
  state = {
    customerStat: [],
  };

  componentDidMount() {
    this.getCustomer();
  }

  getCustomer = () => {
    this.props
      .getCustomerByID(this.props.location.state.row._id)
      .then((customer, id) => {
        if (customer.customer && customer.customer.status === 200) {
          this.setState({
            customerStat: customer.customer.data,
          });
        }
      });
  };
  render() {
    const { customerStat } = this.state;
    return (
      <Row>
        <Col lg="6" xl="3">
          <Card className="flex-fill">
            <CardHeader>
              <h5 className="card-title mb-0">Total Orders</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="12">
                  <span className=" h2 font-weight-dark">
                    {customerStat.totalOfOrders}{" "}
                  </span>
                </Col>
              </Row>
              <Progress
                  color="info"
                  value={0}
                  className="progress-sm shadow-sm mb-1"
                />
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="flex-fill">
            <CardHeader>
              <h5 className="card-title mb-0">Pending Orders</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="12">
                  <span className=" h2 font-weight-dark">
                    {customerStat.pendingStatusCount}{" "}
                  </span>
                  <span className="text-muted">
                    out of {customerStat.totalOfOrders}{" "}
                  </span>
                </Col>
              </Row>

              <Progress
                color="warning"
                value={
                  customerStat.pendingStatusCount / customerStat.totalOfOrders
                }
                className="progress-sm shadow-sm mb-1"
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="flex-fill">
            <CardHeader>
              <h5 className="card-title mb-0">Approved</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="12">
                  <span className=" h2 font-weight-dark">
                    {customerStat.approvedStatusCount}{" "}
                  </span>
                  <span className="text-muted">
                    out of {customerStat.totalOfOrders}{" "}
                  </span>
                </Col>
              </Row>

              <Progress
                color="info"
                value={
                  customerStat.approvedStatusCount / customerStat.totalOfOrders
                }
                className="progress-sm shadow-sm mb-1"
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="flex-fill">
            <CardHeader>
              <h5 className="card-title mb-0">Completed</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="12">
                  <span className=" h2 font-weight-dark">
                    {customerStat.completedStatusCount}{" "}
                  </span>
                  <span className="text-muted">
                    out of {customerStat.totalOfOrders}{" "}
                  </span>
                </Col>
              </Row>

              <Progress
                color="success"
                value={
                  customerStat.completedStatusCount / customerStat.totalOfOrders
                }
                className="progress-sm shadow-sm mb-1"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  getCustomerByID: userActions.getuserByID,
};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(Statistics)
);
