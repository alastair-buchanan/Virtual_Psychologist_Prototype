import React, { Fragment, useEffect, useRef, useState } from "react";
import { exportComponentAsJPEG } from 'react-component-export-image';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Header } from "semantic-ui-react";

function countByParam(data, param) {
  var count = 0;
  data.forEach((element) => {
    if (element === param && element !== undefined) {
      count++;
    }
  });
  return count;
}

function countChannelByOrg(dataSet) {
  return Object.keys(dataSet).map((element) => ({
    Organisation: element,
    Anger: countByParam(
      dataSet[element].map((v) => v.Problem_Category === "problem_cat_anger"),
      true
    ),
    Anxiety: countByParam(
      dataSet[element].map((v) => v.Problem_Category === "problem_cat_anxiety"),
      true
    ),
    Depression: countByParam(
      dataSet[element].map((v) => v.Problem_Category === "problem_cat_depression"),
      true
    ),
    Blank: countByParam(
      dataSet[element].map((v) => v.Problem_Category === ""),
      true
    ),
  }));
}

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

export const BarIssuePerOrg = ({ clientData }) => {
    const [rowData, setRowData] = useState([]);
    const [groupedData, setGroupedData] = useState([]);
    const [chartData, setChartData] = useState([]);
  
    const componentRef = useRef();
  
    useEffect(() => {
      setRowData(clientData);
    }, [clientData]);
  
    useEffect(() => {
      setGroupedData(groupData(clientData, "Organisation"));
      console.log("groupedByOrg data", groupedData);
    }, [rowData, clientData]);
  
    useEffect(() => {
      if (groupedData !== null && groupedData !== undefined) {
        setChartData(countChannelByOrg(groupedData));
      }
      console.log("stacked data", chartData);
    }, [groupedData]);
    
  
    return (
      <Fragment>
        <Header>Problem/issue per organisation </Header>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            ref={componentRef} 
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Organisation" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Anger" stackId="a" fill="#8884d8" />
            <Bar dataKey="Anxiety" stackId="a" fill="#82ca9d" />
            <Bar dataKey="Depression" stackId="a" fill="#FFBB28" />
            <Bar dataKey="blank" stackId="a" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
        <span style={{ float: "right" }}>
          <button onClick={() => exportComponentAsJPEG(componentRef)}>
            Download
          </button>
        </span>
      </Fragment>
    );
  };
  