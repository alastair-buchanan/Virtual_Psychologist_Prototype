import React, { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { useClientData, useFilteredData } from "../api/Api";
import { GeneralTable } from "./tables/GeneralTable";
import { ReusablePieChart } from "./graphs/ReusablePieChart";
import { GroupedByChannelPie } from "./graphs/GroupedByChannelPie";
import { ReusableStackedBar } from "./graphs/BarCaseChannelAge";
import { BarIssuePerOrg } from "./graphs/BarIssuePerOrg";
import { AgeFilter } from "./searchBars/AgeFilter";
import { PresentingIssueTrends } from "./graphs/PresentingIssueTrends";
import { GenderFilter } from "./searchBars/GenderFilter";
import { StackedBarRemotenessIssue } from "./graphs/StackedBarRemotenessIssue";
import { DateFilter } from "./searchBars/DateFilter";
import { CSVLink } from "react-csv";
import { BarIssueDay } from "./graphs/BarIssueDay";
import { DayFilter } from "./searchBars/DayFilter";
import { OrganisationFilter } from "./searchBars/OrganisationFilter";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { BusinessUnitFilter } from "./searchBars/BusinessUnitFilter";

function filterByAge(data, param) {
  return data.filter((stock) => stock.Age === param);
}

function filterByGender(data, param) {
  return data.filter((stock) => stock.Gender === param);
}

function filterByDate(data, param) {
  var newData;
  newData = data.filter((stock) => new Date(stock.Date) > param[0]);
  newData = data.filter((stock) => new Date(stock.Date) < param[1]);
  return newData;
}

function filterByCountry(data, param) {
  return data.filter((stock) => stock.Day === param);
}

function filterByOrganisation(data, param) {
  return data.filter((stock) => stock.Organisation === param);
}

function filterByBusinessUnit(data, param) {
  return data.filter((stock) => stock.Business_Unit === param);
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
  const [countryFilter, setCountryFilter] = useState();
  const [organisationFilter, setOrganisationFilter] = useState();
  const [businessUnitFilter, setBusinessUnitFilter] = useState();

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
      data = filterByDate(data, dateFilter);
      fData = filterByDate(fData, dateFilter);
    }
    if (countryFilter !== undefined && countryFilter !== null) {
      data = filterByCountry(data, countryFilter);
      fData = filterByCountry(fData, countryFilter);
    }
    if (organisationFilter !== undefined && organisationFilter !== null) {
      data = filterByOrganisation(data, organisationFilter);
      fData = filterByOrganisation(fData, organisationFilter);
    }
    if (businessUnitFilter !== undefined && businessUnitFilter !== null) {
      data = filterByBusinessUnit(data, businessUnitFilter);
      fData = filterByBusinessUnit(fData, businessUnitFilter);
    }
    setRowData(data);
    setFilteredRowData(fData);
  }, [
    clientData,
    filteredData,
    ageFilter,
    organisationFilter,
    countryFilter,
    genderFilter,
    rowData.props,
    dateFilter,
    businessUnitFilter
  ]);

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
          <OrganisationFilter onSubmit={setOrganisationFilter} />
        </Grid.Column>
        <Grid.Column width={2}>
          <DayFilter onSubmit={setCountryFilter} />
        </Grid.Column>
        <Grid.Column width={2}>
          <BusinessUnitFilter onSubmit={setBusinessUnitFilter} />
        </Grid.Column>
        <Grid.Column textAlign="center" centered="true" width={3}>
          <DateFilter onSubmit={setDateFilter} />
        </Grid.Column>

        <Grid.Column textAlign="center" width={3}>
          <Button>
            <CSVLink data={filteredRowData}>Download to CSV</CSVLink>
          </Button>
        </Grid.Column>
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
          <BarIssueDay clientData={filteredRowData} />
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
      <Grid.Row>
        <Grid.Column width={6}>
          <StackedBarRemotenessIssue clientData={filteredRowData} />
        </Grid.Column>
        <Grid.Column width={10}>
          <PresentingIssueTrends clientData={filteredRowData} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
