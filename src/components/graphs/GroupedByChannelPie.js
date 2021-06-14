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
import { Button, Header } from "semantic-ui-react";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF0000",
  "#00FF00",
  "#0000FF",
];

function countChannels(dataSet) {
  return Object.keys(dataSet).map((element) => ({
    Channel: element,
    Count: dataSet[element].length,
  }));
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const GroupedByChannelPie = ({ rowData }) => {
  const [chartData, setChartData] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    if (rowData !== null && rowData !== undefined) {
      setChartData(countChannels(rowData));
    }
  }, [rowData]);

  return (
    <Fragment>
      <span style={{ float: "right" }}>
        <Button onClick={() => exportComponentAsJPEG(componentRef)}>
          <img alt="exportJpeg" height="15" width="15" src={"download_icon.png"}/>
        </Button>
      </span>
      <div ref={componentRef}>
        <Header textAlign='center'>Case count per channel</Header>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart content={chartData} ref={componentRef} height={100}>
            <Pie
              isAnimationActive={false}
              label={renderCustomizedLabel}
              data={chartData}
              //type="monotone"
              labelLine={false}
              dataKey="Count"
              stroke="#000000"
              fill="#8884d8"
            >
              <Tooltip />
              <LabelList dataKey="Channel" position="outside" />
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Fragment>
  );
};
