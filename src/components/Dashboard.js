import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { useClientData } from "../api/Api";
import { GeneralTable } from "./tables/GeneralTable";
import { ReusableRechart } from "./graphs/ReusableRechart";
import { ReusablePieChart } from "./graphs/ReusablePieChart";
import { GroupedByChannelPie } from "./graphs/GroupedByChannelPie";
import { ReusableStackedBar } from "./graphs/ReusableStackedBar";
import { BarIssuePerOrg } from "./graphs/BarIssuePerOrg";
import { AgeFilter } from "./searchBars/AgeFilter";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function filterByAge(data, param) {
  return data.filter((stock) => stock.Age === param);
}

export const Dashboard = () => {
  const { loading, clientData, error } = useClientData();
  const [rowData, setRowData] = useState([]);
  const [groupedByOrg, setGroupedByOrg] = useState([]);
  const [groupedByChannel, setGroupedByChannel] = useState([]);
  const [groupedByIssue, setGroupedByIssue] = useState([]);
  const [ageFilter, setAgeFilter] = useState();

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
    let data = clientData;
    if (ageFilter !== null) {
      data = filterByAge(data, ageFilter);
    }
    setRowData(data);
    console.log("rowdata by date", rowData);
  }, [clientData, ageFilter, rowData.props]);

  useEffect(() => {
    setGroupedByOrg(groupData(rowData, "Organisation"));
    setGroupedByIssue(groupData(rowData, "Problem_Category"));
    setGroupedByChannel(groupData(rowData, "Channel"));
  }, [rowData, clientData]);

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>console.error();</div>;
  }
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={4}>
          <AgeFilter onSubmit={setAgeFilter} />
        </Grid.Column>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={4}></Grid.Column>
        <Grid.Column width={4}></Grid.Column>
      </Grid.Row>
      <Grid.Row width={16}>
        <Grid.Column width={4}>
          <GeneralTable
            width="10%"
            rowData={rowData}
            organisations={groupedByOrg}
            issues={groupedByIssue}
            channels={groupedByChannel}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <ReusableRechart rowData={groupedByOrg} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ReusablePieChart rowData={groupedByOrg} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <GroupedByChannelPie rowData={groupedByChannel} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ReusableStackedBar clientData={rowData} />
        </Grid.Column>
        <Grid.Column width={6}>
          <BarIssuePerOrg clientData={rowData} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
