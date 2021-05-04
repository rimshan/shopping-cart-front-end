import React from "react";
import { Col, Card, CardBody, CardHeader, Progress, Row } from "reactstrap";

const Statistics = () => (
  <Row>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-primary float-right">Today</span> */}
          <h5 className="card-title mb-0">Total completion</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="12">
              {/* <h2 className="d-flex align-items-center mb-0 font-weight-light">
                $37.500
              </h2> */}
              <span className=" h2 font-weight-dark">20 </span>
              <span className="text-muted">out of 100</span>
            </Col>
            {/* <Col xs="4" className="text-right">
              <span className="text-muted">57%</span>
            </Col> */}
          </Row>

          <Progress
            color="primary"
            value={57}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-warning float-right">Annual</span> */}
          <h5 className="card-title mb-0">Exams</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="12">
              <span className=" h2 font-weight-dark">2 </span>
              <span className="text-muted">out of 2</span>
            </Col>
          </Row>

          <Progress
            color="warning"
            value={100}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-info float-right">Monthly</span> */}
          <h5 className="card-title mb-0">Lessons</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="12">
              <span className=" h2 font-weight-dark">8 </span>
              <span className="text-muted">out of 24</span>
            </Col>
          </Row>

          <Progress
            color="info"
            value={32}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-success float-right">Yearly</span> */}
          <h5 className="card-title mb-0">Revenue</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-4">
            <Col xs="12">
              <span className=" h2 font-weight-dark">12000 </span>
              <span className="text-muted">out of 18000</span>
            </Col>
          </Row>

          <Progress
            color="success"
            value={65}
            className="progress-sm shadow-sm mb-1"
          />
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default Statistics;
