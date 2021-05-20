import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { useClientData, useFilteredData } from "../api/Api";
import { GeneralTable } from "./tables/GeneralTable";
import { ReusableRechart } from "./graphs/ReusableRechart";
import { ReusablePieChart } from "./graphs/ReusablePieChart";
import { GroupedByChannelPie } from "./graphs/GroupedByChannelPie";
import { ReusableStackedBar } from "./graphs/ReusableStackedBar";
import { BarIssuePerOrg } from "./graphs/BarIssuePerOrg";
import { AgeFilter } from "./searchBars/AgeFilter";
import { PresentingIssueTrends } from "./graphs/PresentingIssueTrends";
import { GenderFilter } from "./searchBars/GenderFilter";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";


function filterByAge(data, param) {
  return data.filter((stock) => stock.Age === param);
}

function filterByGender(data, param) {
  return data.filter((stock) => stock.Gender === param);
}

export const Dashboard = () => {
  const { loading, clientData, error } = useClientData();
  const { filterLoading, filteredData, filterError } = useFilteredData();
  const [rowData, setRowData] = useState([]);
  const [filteredRowData, setFilteredRowData] = useState([]);
  const [groupedByOrg, setGroupedByOrg] = useState([]);
  const [groupedByChannel, setGroupedByChannel] = useState([]);
  const [groupedByIssue, setGroupedByIssue] = useState([]);
  const [groupedByDate, setGroupedByDate] = useState([]);
  const [groupedByFilteredOrg, setGroupedByFilteredOrg] = useState([]);
  const [groupedByFilteredChannel, setGroupedByFilteredChannel] = useState([]);
  const [groupedByFilteredIssue, setGroupedByFilteredIssue] = useState([]);
  const [groupedByFilteredDate, setGroupedByFilteredDate] = useState([]);
  const [ageFilter, setAgeFilter] = useState();
  const [genderFilter, setGenderFilter] = useState();

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
    let fData = filteredData;
    if (ageFilter !== null) {
      data = filterByAge(data, ageFilter);
      fData = filterByAge(fData, ageFilter);
    }
    if (genderFilter !== null) {
      data = filterByGender(data, genderFilter);
      fData = filterByGender(fData, genderFilter);
    }
    setRowData(data);
    setFilteredRowData(fData);
    console.log("rowdata by date", rowData);
  }, [clientData, ageFilter, genderFilter, rowData.props]);

  useEffect(() => {
    setGroupedByOrg(groupData(rowData, "Organisation"));
    setGroupedByIssue(groupData(rowData, "Problem_Category"));
    setGroupedByChannel(groupData(rowData, "Channel"));
    setGroupedByDate(groupData(rowData, "Date"));
    setGroupedByFilteredOrg(groupData(filteredRowData, "Organisation"));
    setGroupedByFilteredIssue(groupData(filteredRowData, "Problem_Category"));
    setGroupedByFilteredChannel(groupData(filteredRowData, "Channel"));
    setGroupedByFilteredDate(groupData(filteredRowData, "Date"));
  }, [rowData, filteredRowData, clientData]);

  if (loading || filterLoading) {
    return <div>loading</div>;
  }
  if (error || filterError) {
    return <div>console.error();</div>;
  }
  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={4}>
          <AgeFilter onSubmit={setAgeFilter} />
        </Grid.Column>
        <Grid.Column width={4}>
          <GenderFilter  onSubmit={setGenderFilter} />
        </Grid.Column>
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
          <ReusableRechart rowData={groupedByFilteredOrg} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ReusablePieChart rowData={groupedByFilteredOrg} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <GroupedByChannelPie rowData={groupedByFilteredChannel} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ReusableStackedBar clientData={filteredRowData} />
        </Grid.Column>
        <Grid.Column width={6}>
          <BarIssuePerOrg clientData={filteredRowData} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row >
        <Grid.Column width={10} >
          <PresentingIssueTrends clientData={filteredRowData} />
        </Grid.Column>
        <Grid.Column width={6}>
          <BarIssuePerOrg clientData={filteredRowData} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
