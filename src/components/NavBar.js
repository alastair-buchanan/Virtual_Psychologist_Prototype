import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Dropdown, Image, Menu } from "semantic-ui-react";

export const NavBar = () => {
  return (
    <Menu fixed="top" inverted color={"VP blue"}>
      <Container>
        <Menu.Item header exact to="/">
          <Image size='small' height={3} fluid src="VP_Logo_text.png"/>
        </Menu.Item>
        <Menu.Item name="Dashboard" exact as={NavLink} to="/" />
        <Menu.Item name="Chart Builder" exact as={NavLink} to="/Dashboard2" />
        <Menu.Item position="right">
          <Dropdown pointing="top left" icon="user">
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