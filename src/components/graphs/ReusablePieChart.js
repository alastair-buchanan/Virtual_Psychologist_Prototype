import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LabelList,
} from "recharts";
import { exportComponentAsJPEG } from "react-component-export-image";
import { Button, Container, Header } from "semantic-ui-react";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF0000",
  "#00FF00",
  "#0000FF",
];

function countOrganisations(dataSet) {
  return Object.keys(dataSet).map((element) => ({
    Organisation: element,
    Count: dataSet[element].length,
  }));
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const ReusablePieChart = ({ rowData }) => {
  const [chartData, setChartData] = useState([])
  const componentRef = useRef();

  useEffect(() => {
    if (rowData !== null && rowData !== undefined) {
      setChartData(countOrganisations(rowData));
    }
    console.log("chartOne data", chartData);
  }, [rowData]);


  return (
    <Fragment >
      <span style={{ float: "right" }}>
        <Button onClick={() => exportComponentAsJPEG(componentRef)}>
          <img height="15" width="15" src={"download_icon.png"}/>
        </Button>
      </span>
      <componentRef ref={componentRef}>
      <Header textAlign='center'>Case count per Company</Header>
      <ResponsiveContainer height={300}>
        <PieChart content={chartData} height={100}>
          <Pie
            isAnimationActive={false}
            label={renderCustomizedLabel}
            data={chartData}
            //type="monotone"
            innerRadius={80}
            outerRadius={120}
            labelLine={false}
            dataKey="Count"
            stroke="#000000"
            fill="#8884d8"
          >
            <Tooltip />
            <LabelList dataKey="Organisation" position="outside" />
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      </componentRef>
    </Fragment>
  );
};
