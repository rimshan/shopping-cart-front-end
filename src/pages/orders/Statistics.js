import React from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { salesOrderActions } from "../../redux/actions/salesOrderActions";

import { Col, Card, CardBody, CardHeader, Progress, Row } from "reactstrap";

class Statistics extends React.Component {
  state = {
    ordersStat: [],
  };
  componentDidMount() {
    this.getAllOrders();
  }

  getAllOrders = () => {
    this.setState({
      item_options: [],
    });
    this.props.getSalesOrderStats().then((orders, id) => {
      if (orders.orders && orders.orders.status === 200) {
        this.setState({
          ordersStat: orders.orders.data,
        });
      }
    });
  };
  render() {
    const { ordersStat } = this.state;
    return (
      <Row>
        <Col lg="6" xl="3">
          <Card className="flex-fill">
            <CardHeader>
              <h5 className="card-title mb-0">Order Count</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="12">
                  <span className=" h2 font-weight-dark">
                    {ordersStat.orderCount}{" "}
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
              <h5 className="card-title mb-0">Pending</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="12">
                  <span className=" h2 font-weight-dark">
                    {ordersStat.pendingOrderCount}{" "}
                  </span>
                  <span className="text-muted">
                    out of {ordersStat.orderCount}{" "}
                  </span>
                </Col>
              </Row>

              <Progress
                color="warning"
                value={ordersStat.pendingOrderCount / ordersStat.orderCount}
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
                    {ordersStat.completedOrderCount}{" "}
                  </span>
                  <span className="text-muted">
                    out of {ordersStat.orderCount}
                  </span>
                </Col>
              </Row>

              <Progress
                color="success"
                value={ordersStat.completedOrderCount / ordersStat.orderCount}
                className="progress-sm shadow-sm mb-1"
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" xl="3">
          <Card className="flex-fill">
            <CardHeader>
              <h5 className="card-title mb-0">Income</h5>
            </CardHeader>
            <CardBody className="my-2">
              <Row className="d-flex align-items-center mb-4">
                <Col xs="12">
                  <span className="text-muted">LKR </span>
                  <span className=" h2 font-weight-dark">
                    {Number(ordersStat.totalIncome)}{" "}
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
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};

const mapActionToProps = {
  getSalesOrderStats: salesOrderActions.getSalesOrderStats,
};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(Statistics)
);
