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
import { Button, Header, Icon } from "semantic-ui-react";

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
      dataSet[element].map(
        (v) => v.Problem_Category === "Work Problems"
      ),
      true
    ),
    Depression: countByParam(
      dataSet[element].map(
        (v) => v.Problem_Category === "Depression"
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


export const StackedBarRemotenessIssue = ({ clientData }) => {
    const [rowData, setRowData] = useState([]);
    const [groupedData, setGroupedData] = useState([]);
    const [chartData, setChartData] = useState([]);
  
    const componentRef = useRef();
  
    useEffect(() => {
      setRowData(clientData);
    }, [clientData]);
  
    useEffect(() => {
      setGroupedData(groupData(clientData, "MMM_Code"));
    }, [rowData, clientData]);
  
    useEffect(() => {
      if (groupedData !== null && groupedData !== undefined) {
        setChartData(countChannelByOrg(groupedData));
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
          <Header textAlign='center'>Presenting problem vs remoteness index</Header>
          <ResponsiveContainer  width="100%" height={300}>
            <BarChart
              title="asdfasdf"
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
              <Legend verticalAlign="top" wrapperStyle={{top: -5, left: 25}}/>
              <Bar dataKey="Anger" stackId="a" fill="#0088FE" />
              <Bar dataKey="Anxiety" stackId="a" fill="#00C49F" />
              <Bar dataKey="Depression" stackId="a" fill="#FFBB28" />
              <Bar dataKey="Work" stackId="a" fill="#FF8042" />
              <Bar dataKey="Relationship" stackId="a" fill="#FF0000" />
              <Bar dataKey="blank" stackId="a" fill="#00FF00" />
            </BarChart>
          </ResponsiveContainer>
        </componentRef>
  
        
      </Fragment>
    );
  };
  