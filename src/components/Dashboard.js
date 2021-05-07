import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import GridLayout from "react-grid-layout";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgChartsReact } from "ag-charts-react";
import { Grid } from "semantic-ui-react";
import { useClientData } from "../api/Api";
import { GeneralTable } from "./tables/GeneralTable";
import { ReusableRechart } from "./graphs/ReusableRechart";
import { ReusablePieChart } from "./graphs/ReusablePieChart";

function countVariables(dataSet) {
  return Object.keys(dataSet).map((element) => ({
    Organisation: element,
    Count: dataSet[element].length,
  }));
}

export const Dashboard = () => {
  const { loading, clientData, error } = useClientData();
  const [rowData, setRowData] = useState([]);
  const [groupedByOrg, setGroupedByOrg] = useState([]);
  const [chartOne, setChartOne] = useState();

  function groupData(dataSet, property) {
    return dataSet.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  useEffect(() => {
    setRowData(clientData);
  }, [clientData]);

  useEffect(() => {
    setGroupedByOrg(groupData(clientData, "Organisation"));
    console.log("groupedByOrg data", groupedByOrg);
  }, [rowData, clientData]);

  useEffect(() => {
    if (groupedByOrg !== null && groupedByOrg !== undefined) {
      setChartOne(countVariables(groupedByOrg));
    }
    console.log("chartOne data", chartOne);
  }, [groupedByOrg]);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>console.error();</div>;
  }
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <GeneralTable width="10%" rowData={rowData} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ReusableRechart rowData={chartOne} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ReusablePieChart rowData={chartOne} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <GeneralTable width="10%" rowData={rowData} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ReusableRechart rowData={chartOne} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ReusableRechart rowData={chartOne} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
