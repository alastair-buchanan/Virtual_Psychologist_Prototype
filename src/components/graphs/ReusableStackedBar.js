import React, { Fragment, useEffect, useRef, useState } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";
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

function countChannelByAge(dataSet) {
  return Object.keys(dataSet).map((element) => ({
    Age: element,
    fb_messenger: countByParam(
      dataSet[element].map((v) => v.Channel === "fb_messenger"),
      true
    ),
    sms: countByParam(
      dataSet[element].map((v) => v.Channel === "sms"),
      true
    ),
    whatsapp: countByParam(
      dataSet[element].map((v) => v.Channel === "whatsapp"),
      true
    ),
    blank: countByParam(
      dataSet[element].map((v) => v.Channel === ""),
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

export const ReusableStackedBar = ({ clientData }) => {
  const [rowData, setRowData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const componentRef = useRef();

  useEffect(() => {
    setRowData(clientData);
  }, [clientData]);

  useEffect(() => {
    setGroupedData(groupData(clientData, "Age"));
  }, [rowData, clientData]);

  useEffect(() => {
    if (groupedData !== null && groupedData !== undefined) {
      setChartData(countChannelByAge(groupedData));
    }
  }, [groupedData]);

  return (
    <Fragment>
      <span style={{ float: "right" }}>
        <Button onClick={() => exportComponentAsJPEG(componentRef)}>
          <img height="15" width="15" src={"download_icon.png"}/>
        </Button>
      </span>
      <componentRef ref={componentRef}>
        <Header textAlign='center'>Case count per channel by age</Header>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Age" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="fb_messenger" stackId="a" fill="#8884d8" />
            <Bar dataKey="sms" stackId="b" fill="#82ca9d" />
            <Bar dataKey="whatsapp" stackId="c" fill="#FFBB28" />
            <Bar dataKey="blank" stackId="d" fill="#FF8042" />
            <Legend verticalAlign="top" wrapperStyle={{top: -5, left: 25}}/>
          </BarChart>
        </ResponsiveContainer>
      </componentRef>
    </Fragment>
  );
};
