import React, { Fragment, useRef } from "react";
import { exportComponentAsJPEG } from 'react-component-export-image';
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

export const ReusableRechart = ({ rowData }) => {
  const componentRef = useRef();

  return (
    <Fragment>
      <ResponsiveContainer height={300}>
        <BarChart ref={componentRef} height={100} data={rowData}>
          <Bar type="monotone" dataKey="Count" stroke="#8884d8" />
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
