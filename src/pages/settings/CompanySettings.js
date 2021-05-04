import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

import moment from "moment";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

const Company = props => (
  <Card>
    <CardBody>
      <Form>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Company Name
          </Label>
          <Col sm={6}>
            <Input type="text" name="name" placeholder="Enter Name" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Address
          </Label>
          <Col sm={6}>
            <Input
              type="text"
              name="address"
              placeholder="Enter Address Here"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Logo
          </Label>
          <Col sm={2}>{props.imagePreview}</Col>
          <Col sm={4}>
            <Input onChange={props.fileChangedHandler} type="file" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Start Date
          </Label>
          <Col sm={6}>
            <DatePickerInput
              value={props.state.start_date}
              onChange={props.setStartDate}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Reg Number
          </Label>
          <Col sm={6}>
            <Input type="text" name="reg_no" placeholder="Enter Reg Number" />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={{ size: 6, offset: 2 }}>
            <Button color="primary">Save Details</Button>
          </Col>
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
);

class CompanySettings extends React.Component {
  state = {
    start_date: new Date()
  };

  setStartDate = date => {
    this.setState({
      start_date: date
    });
  };

  fileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });

    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  render() {
    let $imagePreview = (
      <div className="previewText image-container">
        Upload Comopany Logo Here
      </div>
    );
    if (this.state.imagePreviewUrl) {
      $imagePreview = (
        <div className="image-container">
          <img src={this.state.imagePreviewUrl} alt="icon" width="100" />{" "}
        </div>
      );
    }
    return (
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Company</h1>
        <Company
          state={this.state}
          setStartDate={this.setStartDate}
          imagePreview={$imagePreview}
          fileChangedHandler={this.fileChangedHandler}
        />
      </Container>
    );
  }
}

export default CompanySettings;
