import React, { Fragment, useRef } from "react";
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

export const ReusableRechart = ({ rowData }) => {
  const componentRef = useRef();

  return (
    <Fragment>
      <Header>Case count per Company</Header>
      <ResponsiveContainer height={300}>
        <BarChart ref={componentRef} height={100} data={rowData}>
          <Bar type="monotone" dataKey="Count" />
          {rowData.map((entry, index) => (
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
      <span style={{ float: "right" }}>
        <button onClick={() => exportComponentAsJPEG(componentRef)}>Download</button>
      </span>
    </Fragment>
  );
};
