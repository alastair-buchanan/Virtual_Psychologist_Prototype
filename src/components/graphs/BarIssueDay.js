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

function countChannelByDay(dataSet) {
  return Object.keys(dataSet).map((element) => ({
    Day: element,
    Anger: countByParam(
      dataSet[element].map((v) => v.Problem_Category === "Anger"),
      true
    ),
    Anxiety: countByParam(
      dataSet[element].map((v) => v.Problem_Category === "Anxiety"),
      true
    ),
    Relationship: countByParam(
      dataSet[element].map(
        (v) => v.Problem_Category === "Relationship Problems"
      ),
      true
    ),
    Work: countByParam(
      dataSet[element].map((v) => v.Problem_Category === "Work Problems"),
      true
    ),
    Depression: countByParam(
      dataSet[element].map((v) => v.Problem_Category === "Depression"),
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

export const BarIssueDay = ({ clientData }) => {
  const [rowData, setRowData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const componentRef = useRef();

  useEffect(() => {
    setRowData(clientData);
  }, [clientData]);

  useEffect(() => {
    setGroupedData(groupData(clientData, "Day"));
  }, [rowData, clientData]);

  useEffect(() => {
    if (groupedData !== null && groupedData !== undefined) {
      let tempData = countChannelByDay(groupedData);
      let sortedData = [];
      tempData.forEach((element) => {
        if (element.Day === "Sunday") {
          sortedData[0] = element;
        }
        if (element.Day === "Monday") {
          sortedData[1] = element;
        }
        if (element.Day === "Tuesday") {
          sortedData[2] = element;
        }
        if (element.Day === "Wednesday") {
          sortedData[3] = element;
        }
        if (element.Day === "Thursday") {
          sortedData[4] = element;
        }
        if (element.Day === "Friday") {
          sortedData[5] = element;
        }
        if (element.Day === "Saturday") {
          sortedData[6] = element;
        }
      });
      setChartData(sortedData);
    }
  }, [groupedData]);

  return (
    <Fragment>
      <span style={{ float: "right" }}>
        <Button onClick={() => exportComponentAsJPEG(componentRef)}>
          <img
            alt="exportJpeg"
            height="15"
            width="15"
            src={"download_icon.png"}
          />
        </Button>
      </span>
      <div ref={componentRef}>
        <Header textAlign="center">Problem/issue per Day of Week</Header>
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

            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ top: -5, left: 25 }} />
            <Bar dataKey="Anger" stackId="a" fill="#0088FE" />
            <Bar dataKey="Anxiety" stackId="a" fill="#00C49F" />
            <Bar dataKey="Depression" stackId="a" fill="#FFBB28" />
            <Bar dataKey="Work" stackId="a" fill="#FF8042" />
            <Bar dataKey="Relationship" stackId="a" fill="#FF0000" />
            <Bar dataKey="blank" stackId="a" fill="#00FF00" />
            <XAxis dataKey="Day" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
};
