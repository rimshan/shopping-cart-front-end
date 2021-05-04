import React from "react";
import { Link } from "react-router-dom";

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

import Timeline from "../../components/Timeline";
import TimelineItem from "../../components/TimelineItem";

const Appointments = () => (
  <Card className="flex-fill w-100">
    <CardHeader>
      <div className="card-actions float-right">
        <UncontrolledDropdown>
          <DropdownToggle tag="a">
            <MoreHorizontal />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardTitle tag="h5" className="mb-0">
        Timeline
      </CardTitle>
    </CardHeader>
    {/* <div className="p-4 bg-light">
      <h2>You have a meeting today!</h2>
      <p className="mb-0 text-sm">
        Your next meeting is in 2 hours. Check your{" "}
        <Link to="/dashboard/default">schedule</Link> to see the details.
      </p>
    </div> */}
    <CardBody className="d-flex">
      <Timeline>
        <TimelineItem>
          <strong>Signed out</strong>
          <span className="float-right align-right text-muted text-sm mb-0">
            30m ago
          </span>
          <p className="pl-2">Nam pretium turpis et arcu. Duis arcu tortor</p>
        </TimelineItem>
        <TimelineItem>
          <strong>Created invoice #1234</strong>
          <span className="float-right text-muted text-sm">2h ago</span>
          <p className="pl-2">Sed aliquam ultrices mauris. Integer ante arcu</p>
        </TimelineItem>
        <TimelineItem>
          <strong>Discard invoice #7234</strong>
          <span className="float-right text-muted text-sm">3h ago</span>
          <p className="pl-2">
            Curabitur ligula sapien, tincidunt non, euismod vitae.
          </p>
        </TimelineItem>
        <TimelineItem>
          <strong>Signed in</strong>
          <span className="float-right text-muted text-sm">30m ago</span>
          <p className="pl-2">Nam pretium turpis et arcu. Duis arcu tortor</p>
        </TimelineItem>
      </Timeline>
    </CardBody>
  </Card>
);

export default Appointments;
