import React, { Fragment, useEffect, useRef, useState } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { Button, Header } from "semantic-ui-react";

function countByParam(data, param) {
  var count = 0;
  data.forEach((element) => {
    if (element === param && element !== undefined) {
      count++;
    }
  });
  return count;
}

function countChannelByDate(dataSet) {
    return Object.keys(dataSet).map((element) => ({
      Date: element,
      Anger: countByParam(
        dataSet[element].map((v) => v.Problem_Category === "problem_cat_anger"),
        true
      ),
      Anxiety: countByParam(
        dataSet[element].map((v) => v.Problem_Category === "problem_cat_anxiety"),
        true
      ),
      Relationship: countByParam(
        dataSet[element].map(
          (v) => v.Problem_Category === "problem_cat_relationship_problems"
        ),
        true
      ),
      Work: countByParam(
        dataSet[element].map(
          (v) => v.Problem_Category === "problem_cat_work_problems"
        ),
        true
      ),
      Depression: countByParam(
        dataSet[element].map(
          (v) => v.Problem_Category === "problem_cat_depression"
        ),
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

export const PresentingIssueTrends = ({ clientData }) => {
  const [rowData, setRowData] = useState();
  const [groupedData, setGroupedData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const componentRef = useRef();

  useEffect(() => {
    setRowData(clientData);
  }, [clientData]);

  useEffect(() => {
    setGroupedData(groupData(clientData, "Date"));
    console.log("groupedByDate data", groupedData);
  }, [rowData, clientData]);

  useEffect(() => {
    if (groupedData !== null && groupedData !== undefined) {
      setChartData(countChannelByDate(groupedData));
    }
    console.log("stacked data", chartData);
  }, [groupedData]);

  return (
    <Fragment>
      <span style={{ float: "right" }}>
        <Button onClick={() => exportComponentAsJPEG(componentRef)}>
          <img height="15" width="15" src={"download_icon.png"}/>
        </Button>
      </span>
      <componentRef ref={componentRef} height={300}>
      <Header textAlign='center'>Problem/issue by date </Header>
        <ResponsiveContainer width={"100%"} height={300} >
        <LineChart width="100%" data={chartData}>
          <Legend verticalAlign="topOutside" wrapperStyle={{top: -20, left: 25}}/>
          <Line type="monotone" dataKey="Anger" stroke="#8884d8" />
          <Line type="monotone" dataKey="Anxiety" stroke="#00C49F" />
          <Line type="monotone" dataKey="Depression" stroke="#FFBB28" />
          <Line type="monotone" dataKey="Work" stroke="#FF8042" />
          <Line type="monotone" dataKey="Relationship" stroke="#FF0000" />
          <Line type="monotone" dataKey="Blank" stroke="#00FF00" />
          <CartesianGrid stroke="#ccc" />
          <YAxis />
          <Tooltip verticalAlign="top" height={36}/>
          <XAxis dataKey="Date" />
        </LineChart>
        </ResponsiveContainer>
      </componentRef>
    </Fragment>
  );
};
