import React from "react";

import CustomerTable from "./CustomerTable";
import { Container } from "reactstrap";

import "rc-datepicker/lib/style.css";

class Customer extends React.Component {
  state = {
    startDate: "st",
    endDate: "",
  };

  setStartDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  setEndDate = (date) => {
    this.setState({
      endDate: date,
    });
  };
  render() {
    return (
      <Container fluid className="p-0">
        <h1 className="pt-1 h3 mb-3">Customers</h1>
        <CustomerTable />
      </Container>
    );
  }
}

export default Customer;
