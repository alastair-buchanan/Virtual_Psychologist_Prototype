import React from "react";
import { NavLink } from "react-router-dom";

import { Button, Container, Dropdown, Menu } from "semantic-ui-react";

export const NavBar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header exact to="/">
          <img src="logo192.png" alt="logo" style={{ marginRight: 10 }} />
          Online Psychologist Reporting Tool
        </Menu.Item>
        <Menu.Item name="Dashboard 1" as={NavLink} to="/Dashboard1" />
        <Menu.Item name="Dashboard 2" as={NavLink} to="/Dashboard2" />
        <Menu.Item position="right">
          <Dropdown pointing="top left" text="user">
            <Dropdown.Menu>
              <Dropdown.Item text="My profile" icon="user" />
              <Dropdown.Item text="Logout" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};