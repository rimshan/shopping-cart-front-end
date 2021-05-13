import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
  Button
} from "reactstrap";

class BasicTable extends React.Component {
  render() {
    const customer = this.props.customer;
    return (
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Customer Details</CardTitle>
        </CardHeader>
        <Table>
          <thead></thead>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{customer.firstName} {customer.lastName && customer.lastName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{customer.email}</td>
            </tr>
            <tr>
              <th>Number</th>
              <td>{customer.contactNumber}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{customer.userAddress}</td>
            </tr>
          </tbody>
        </Table>
      </Card>
    );
  }
}

export default BasicTable;
