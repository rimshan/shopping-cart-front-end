import React from "react";
import { Col, Card, CardBody, CardHeader, Progress, Row } from "reactstrap";

const Statistics = () => (
  <Row>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-primary float-right">Today</span> */}
          <h5 className="card-title mb-0">Passed</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="12">
              {/* <h2 className="d-flex align-items-center mb-0 font-weight-light">
                $37.500
              </h2> */}
              <span className=" h2 font-weight-dark">88 </span>
              <span className="text-muted">out of 100</span>
            </Col>
            {/* <Col xs="4" className="text-right">
              <span className="text-muted">57%</span>
            </Col> */}
          </Row>

          <Progress
            color="primary"
            value={88}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-warning float-right">Annual</span> */}
          <h5 className="card-title mb-0">Failed</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="12">
              <span className=" h2 font-weight-dark">10 </span>
              <span className="text-muted">out of 100</span>
            </Col>
          </Row>

          <Progress
            color="warning"
            value={10}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-info float-right">Monthly</span> */}
          <h5 className="card-title mb-0">Written</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="12">
              <span className=" h2 font-weight-dark">43 </span>
              <span className="text-muted">out of 100</span>
            </Col>
          </Row>

          <Progress
            color="info"
            value={43}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-success float-right">Yearly</span> */}
          <h5 className="card-title mb-0">Medical</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="12">
              <span className=" h2 font-weight-dark">57 </span>
              <span className="text-muted">out of 100</span>
            </Col>
          </Row>

          <Progress
            color="success"
            value={57}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default Statistics;
