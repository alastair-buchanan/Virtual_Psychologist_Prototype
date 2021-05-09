import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { useClientData } from "../api/Api";
import { GeneralTable } from "./tables/GeneralTable";
import { ReusableRechart } from "./graphs/ReusableRechart";
import { ReusablePieChart } from "./graphs/ReusablePieChart";
import { GroupedByChannelPie } from "./graphs/GroupedByChannelPie";
import { ReusableStackedBar } from "./graphs/ReusableStackedBar";
import { BarIssuePerOrg } from "./graphs/BarIssuePerOrg";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function countOrganisations(dataSet) {
  return Object.keys(dataSet).map((element) => ({
    Organisation: element,
    Count: dataSet[element].length,
  }));
}

function countChannels(dataSet) {
  return Object.keys(dataSet).map((element) => ({
    Channel: element,
    Count: dataSet[element].length,
  }));
}

export const Dashboard = () => {
  const { loading, clientData, error } = useClientData();
  const [rowData, setRowData] = useState([]);
  const [groupedByOrg, setGroupedByOrg] = useState([]);
  const [groupedByChannel, setGroupedByChannel] = useState([]);
  const [chartOne, setChartOne] = useState();
  const [chartTwo, setChartTwo] = useState();

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
    console.log("rowData: ", rowData);
  }, [rowData, clientData]);

  useEffect(() => {
    setGroupedByChannel(groupData(clientData, "Channel"));
    console.log("groupedByChannel data", groupedByChannel);
  }, [rowData, clientData]);

  useEffect(() => {
    if (groupedByOrg !== null && groupedByOrg !== undefined) {
      setChartOne(countOrganisations(groupedByOrg));
    }
    console.log("chartOne data", chartOne);
  }, [groupedByOrg]);

  useEffect(() => {
    if (groupedByChannel !== null && groupedByChannel !== undefined) {
      setChartTwo(countChannels(groupedByChannel));
    }
    console.log("chartOne data", chartOne);
  }, [groupedByChannel]);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>console.error();</div>;
  }
  return (
    <Grid celled="internally">
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
          <GroupedByChannelPie rowData={chartTwo} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ReusableStackedBar clientData={clientData} />
        </Grid.Column>
        <Grid.Column width={6}>
          <BarIssuePerOrg clientData={clientData} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
