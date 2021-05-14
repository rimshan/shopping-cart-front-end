import React from "react";

import Statistics from "./Statistics";
import TrialTable from "./OrderTable";
import { Container } from "reactstrap";

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      trial_date: new Date(),
      trial_time: new Date(),
      customer: {},
    };
  }

  componentWillMount() {
    this.setState(() => ({
      index: false,
      selectCustomerModal: false,
      addExamModal: false,
      closeAll: false,
    }));
  }

  render() {
    return (
      <Container fluid className="p-0">
        <h1 className="h3 mb-3 mr-4">Orders </h1>
        <Statistics />
        <TrialTable />
      </Container>
    );
  }
}

export default Orders;
