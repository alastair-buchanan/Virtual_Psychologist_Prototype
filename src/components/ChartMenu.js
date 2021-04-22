import React from "react";
import { Button, Grid, Menu } from "semantic-ui-react";

export const ChartMenu = () => {
  return (
    <Grid>
      <Grid.Column>
        <Menu fluid vertical tabular>
          <Menu.Item>
            <Button>Create chart</Button>
          </Menu.Item>
          <Menu.Item>
            <Button>Create chart</Button>
          </Menu.Item>
          <Menu.Item>
            <Button>Create chart</Button>
          </Menu.Item>
          <Menu.Item>
            <Button>Create chart</Button>
          </Menu.Item>
        </Menu>
      </Grid.Column>
    </Grid>
  );
};
