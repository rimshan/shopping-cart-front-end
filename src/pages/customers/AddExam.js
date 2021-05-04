import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";

class CenteredModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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

  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Centered modal</CardTitle>
          <h6 className="card-subtitle text-muted">
            Vertically centered modal.
          </h6>
        </CardHeader>
        <CardBody className="text-center">
          <p>
            Use Bootstrap’s JavaScript modal plugin to add dialogs to your site
            for lightboxes, user notifications, or completely custom content.
          </p>
          <React.Fragment>
            <Button
              color={color.value}
              onClick={() => this.toggle(index)}
              className="mr-1"
            >
              {color.name}
            </Button>
            <Modal
              isOpen={this.state[index]}
              toggle={() => this.toggle(index)}
              centered
            >
              <ModalHeader toggle={() => this.toggle(index)}>
                Centered modal
              </ModalHeader>
              <ModalBody className="text-center m-3">
                <p className="mb-0">
                  Use Bootstrap’s JavaScript modal plugin to add dialogs to your
                  site for lightboxes, user notifications, or completely custom
                  content.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => this.toggle(index)}>
                  Close
                </Button>{" "}
                <Button color={color.value} onClick={() => this.toggle(index)}>
                  Save changes
                </Button>
              </ModalFooter>
            </Modal>
          </React.Fragment>
        </CardBody>
      </Card>
    );
  }
}

export default CenteredModal;
