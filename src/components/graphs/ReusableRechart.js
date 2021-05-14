import React, { Fragment, useEffect, useRef, useState } from "react";
import { exportComponentAsJPEG } from 'react-component-export-image';
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { Header } from "semantic-ui-react";

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

export const ReusableRechart = ({ rowData }) => {
  const [chartData, setChartData] = useState([])
  const componentRef = useRef();

  useEffect(() => {
    if (rowData !== null && rowData !== undefined) {
      setChartData(countOrganisations(rowData));
    }
    console.log("chartOne data", chartData);
  }, [rowData]);

  return (
    <Fragment>
      <componentRef ref={componentRef}>
      <Header>Case count per Company</Header>
      <ResponsiveContainer height={300}>
        <BarChart height={100} data={chartData}>
          <Bar type="monotone" dataKey="Count" />
          {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          <Tooltip />
          <XAxis dataKey="Organisation" />
          <YAxis />
          
        </BarChart>
      </ResponsiveContainer>
      </componentRef>
      <span style={{ float: "right" }}>
        <button onClick={() => exportComponentAsJPEG(componentRef)}>Download</button>
      </span>
    </Fragment>
  );
};
