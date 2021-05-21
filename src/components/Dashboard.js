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
import { StackedBarRemotenessIssue } from "./graphs/StackedBarRemotenessIssue";
import { DateFilter } from "./searchBars/DateFilter";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";


function filterByAge(data, param) {
  return data.filter((stock) => stock.Age === param);
}

function filterByGender(data, param) {
  return data.filter((stock) => stock.Gender === param);
}

function filterByDate(data, param) {
  var data;
  data = data.filter((stock) => new Date(stock.Date) > param[0]);
  data = data.filter((stock) => new Date(stock.Date) < param[1]);
  return data;
}

export const Dashboard = () => {
  const { loading, clientData, error } = useClientData();
  const { filterLoading, filteredData, filterError } = useFilteredData();
  const [rowData, setRowData] = useState([]);
  const [filteredRowData, setFilteredRowData] = useState([]);
  const [groupedByOrg, setGroupedByOrg] = useState([]);
  const [groupedByFilteredOrg, setGroupedByFilteredOrg] = useState([]);
  const [groupedByFilteredChannel, setGroupedByFilteredChannel] = useState([]);
  const [ageFilter, setAgeFilter] = useState();
  const [genderFilter, setGenderFilter] = useState();
  const [dateFilter, setDateFilter] = useState();

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
    if (dateFilter !== undefined && dateFilter !== null) {
      console.log("datefilter: ", dateFilter[0]);
      data = filterByDate(data, dateFilter);
      fData = filterByDate(fData, dateFilter);
    }
    setRowData(data);
    setFilteredRowData(fData);
  }, [clientData, ageFilter, genderFilter, rowData.props, dateFilter]);

  useEffect(() => {
    setGroupedByOrg(groupData(rowData, "Organisation"));
    setGroupedByFilteredOrg(groupData(filteredRowData, "Organisation"));
    setGroupedByFilteredChannel(groupData(filteredRowData, "Channel"));
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
        <Grid.Column width={2}>
          <AgeFilter onSubmit={setAgeFilter} />
        </Grid.Column>
        <Grid.Column width={2}>
          <GenderFilter onSubmit={setGenderFilter} />
        </Grid.Column>
        <Grid.Column width={2}>
          <DateFilter onSubmit={setDateFilter}/>
        </Grid.Column>
        <Grid.Column width={4}></Grid.Column>
      </Grid.Row>
      <Grid.Row width={16}>
        <Grid.Column width={4}>
          <GeneralTable
            width="10%"
            rowData={rowData}
            organisations={groupedByOrg}
            filteredData={filteredRowData}
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
        <Grid.Column width={6}>
          <StackedBarRemotenessIssue clientData={filteredRowData} />
        </Grid.Column>
        <Grid.Column width={10} >
          <PresentingIssueTrends clientData={filteredRowData} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
