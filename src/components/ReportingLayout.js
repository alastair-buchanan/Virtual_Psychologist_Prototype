import React, { Fragment } from "react";
import { Grid } from "semantic-ui-react";
import { ChartMenu } from "./ChartMenu";
import { Dashboard } from "./Dashboard";

export const ReportingLayout = () => {
  return (
      <Grid columns={1}>
        <Grid.Column width={3}>
          <ChartMenu />
        </Grid.Column>
        <Grid.Column width={13}>
          <Dashboard />
        </Grid.Column>
      </Grid>
  );
};
