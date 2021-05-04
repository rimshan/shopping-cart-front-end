import React from "react";
import { Col, Card, CardBody, CardHeader, Progress, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Statistics = () => (
  <Row>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-primary float-right">Today</span> */}
          <h5 className="card-title mb-0">Revenue</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-2">
            <Col xs="12">
              {/* <h2 className="d-flex align-items-center mb-0 font-weight-light">
                $37.500
              </h2> */}
              <span className="text-muted">LKR </span>
              <span className=" h2 font-weight-dark">90, 352</span>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col xs="12">
              {/* <h2 className="d-flex align-items-center mb-0 font-weight-light">
                $37.500
              </h2> */}
              <span className="text-success">
                <FontAwesomeIcon icon={faCaretUp} className="text-success" />{" "}
                23%{" "}
              </span>
              <span className="text-muted">higher than last week</span>
            </Col>
          </Row>
          {/* 
          <Progress
            color="primary"
            value={88}
            className="progress-sm shadow-sm mb-1"
          /> */}
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-warning float-right">Annual</span> */}
          <h5 className="card-title mb-0">Project Revenue</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-2">
            <Col xs="12">
              {/* <h2 className="d-flex align-items-center mb-0 font-weight-light">
                $37.500
              </h2> */}
              <span className="text-muted">LKR </span>
              <span className=" h2 font-weight-dark">10, 552</span>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col xs="12">
              {/* <h2 className="d-flex align-items-center mb-0 font-weight-light">
                $37.500
              </h2> */}
              <span className="text-success">
                <FontAwesomeIcon icon={faCaretUp} className="text-success" />{" "}
                23%{" "}
              </span>
              <span className="text-muted">higher than last week</span>
            </Col>
          </Row>

          {/* <Progress
            color="warning"
            value={10}
            className="progress-sm shadow-sm mb-1"
          /> */}
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-info float-right">Monthly</span> */}
          <h5 className="card-title mb-0">Avg. Week Revenue</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-2">
            <Col xs="12">
              {/* <h2 className="d-flex align-items-center mb-0 font-weight-light">
                $37.500
              </h2> */}
              <span className="text-muted">LKR </span>
              <span className=" h2 font-weight-dark">6, 321</span>
            </Col>
          </Row>

          <Row className="d-flex align-items-center">
            <Col xs="12">
              {/* <h2 className="d-flex align-items-center mb-0 font-weight-light">
                $37.500
              </h2> */}
              <span className="text-danger">
                <FontAwesomeIcon icon={faCaretDown} className="text-danger" />{" "}
                36%{" "}
              </span>
              <span className="text-muted">less than last week</span>
            </Col>
          </Row>

          {/* <Progress
            color="info"
            value={43}
            className="progress-sm shadow-sm mb-1"
          /> */}
        </CardBody>
      </Card>
    </Col>
    <Col lg="6" xl="3">
      <Card className="flex-fill">
        <CardHeader>
          {/* <span className="badge badge-success float-right">Yearly</span> */}
          <h5 className="card-title mb-0">Growth</h5>
        </CardHeader>
        <CardBody className="my-2">
          <Row className="d-flex align-items-center mb-2">
            <Col xs="12">
              {/* <h2 className="d-flex align-items-center mb-0 font-weight-light">
                $37.500
              </h2> */}

              <span className=" h2 font-weight-dark">8%</span>
            </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col xs="12">
              {/* <h2 className="d-flex align-items-center mb-0 font-weight-light">
                $37.500
              </h2> */}
              <span className="text-danger">
                <FontAwesomeIcon icon={faCaretDown} className="text-danger" />{" "}
                2%{" "}
              </span>
              <span className="text-muted">less than last week</span>
            </Col>
          </Row>

          {/* <Progress
            color="success"
            value={57}
            className="progress-sm shadow-sm mb-1"
          /> */}
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default Statistics;
