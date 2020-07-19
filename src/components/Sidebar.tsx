import React from "react";
import { Nav, NavLink } from "reactstrap";
import AppsRoundedIcon from "@material-ui/icons/AppsRounded";
import TableChartRoundedIcon from "@material-ui/icons/TableChartRounded";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import SettingsIcon from "@material-ui/icons/Settings";
import AttachmentIcon from "@material-ui/icons/Attachment";
export default function Sidebar() {
  return (
    <React.Fragment>
      <p>Contents</p>
      <Nav vertical>
        <NavLink href='/admin/domains'>
          <AppsRoundedIcon /> Domaines
        </NavLink>
      </Nav>
      <hr />
      <Nav vertical>
        <NavLink href='/admin/process'>
          <SettingsIcon /> Processus
        </NavLink>
      </Nav>
      <hr />
      <Nav vertical>
        <NavLink href='/admin/tables'>
          <TableChartRoundedIcon /> Tables
        </NavLink>
      </Nav>
      <hr />
      <p>System</p>
      <Nav vertical>
        <NavLink href='/admin/contents'>
          <AttachmentIcon /> Attachments
        </NavLink>
      </Nav>
      <hr />
      <Nav vertical>
        <NavLink href='/admin/users'>
          <PeopleAltRoundedIcon /> Users
        </NavLink>
      </Nav>
    </React.Fragment>
  );
}
