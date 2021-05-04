import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

import moment from "moment";
import { DatePickerInput } from "rc-datepicker";
import "rc-datepicker/lib/style.css";

const GeneralDetails = props => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        General Details
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Name
          </Label>
          <Col sm={6}>
            <Input type="name" name="name" placeholder="Enter Name" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Email Address
          </Label>
          <Col sm={6}>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email Address"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Profile Picture
          </Label>
          <Col sm={2}>{props.imagePreview}</Col>
          <Col sm={4}>
            <Input onChange={props.fileChangedHandler} type="file" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Birthday
          </Label>
          <Col sm={6}>
            <DatePickerInput
              value={props.state.birth_date}
              onChange={props.setBirthDate}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            NIC
          </Label>
          <Col sm={6}>
            <Input type="nic" name="nic" placeholder="Enter NIC" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Mobile Number
          </Label>
          <Col sm={6}>
            <Input
              type="mobile"
              name="mobile"
              placeholder="Enter Mobile Number"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{ size: 6, offset: 2 }}>
            <Button color="primary">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </CardBody>
  </Card>
);

const Security = props => (
  <Card>
    <CardHeader>
      <CardTitle tag="h5" className="mb-0">
        Security
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <FormGroup row>
          <Label sm={2} className="text-sm-right">
            Password
          </Label>
          <Col sm={10}>
            <Button outline color="primary" onClick={() => props.toggle()}>
              Change Password
            </Button>
          </Col>
        </FormGroup>
      </Form>
      <Modal
        isOpen={props.state.index}
        toggle={() => props.toggle()}
        centered
        size="md"
      >
        <ModalHeader toggle={() => props.toggle()}>Change Password</ModalHeader>
        <ModalBody className="text-center m-3">
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              Old Password
            </Label>
            <Col sm={6}>
              <Input type="password" name="name" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              New Password
            </Label>
            <Col sm={6}>
              <Input type="password" name="name" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3} className="text-sm-right">
              Re Enter
            </Label>
            <Col sm={6}>
              <Input type="password" name="name" />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.toggle()}>
            Update Password
          </Button>
        </ModalFooter>
      </Modal>
    </CardBody>
  </Card>
);

class AccountSettings extends React.Component {
  state = {
    birth_date: new Date()
  };

  setBirthDate = date => {
    this.setState({
      birth_date: date
    });
  };

  toggle = () => {
    this.setState(state => ({
      index: !state.index
    }));
  };

  componentWillMount() {
    this.setState(() => ({
      index: false
    }));
  }

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
        Upload Profile phote Here
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
        <h1 className="h3 mb-3">Account</h1>
        <GeneralDetails
          imagePreview={$imagePreview}
          fileChangedHandler={this.fileChangedHandler}
          setBirthDate={this.setBirthDate}
          state={this.state}
        />
        <Security toggle={this.toggle} state={this.state} />
      </Container>
    );
  }
}

export default AccountSettings;
