import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import GridLayout from "react-grid-layout";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgChartsReact } from "ag-charts-react";
// import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const Dashboard = () => {
  const table = {
    columns: [
      { headerName: "Make", field: "make" },
      { headerName: "Model", field: "model" },
      { headerName: "Price", field: "price" },
    ],
    rowData: [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
    ],
  };

  const data = [
    {
      quarter: "Q1",
      spending: 450,
    },
    {
      quarter: "Q2",
      spending: 560,
    },
    {
      quarter: "Q3",
      spending: 600,
    },
    {
      quarter: "Q4",
      spending: 700,
    },
  ];
  const options = {
    data: data,
    series: [
      {
        xKey: "quarter",
        yKey: "spending",
      },
    ],
  };

  const layouts = [
    {
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 480,
      xxs: 0,
      isDraggable: true,
      isResizable: true,
    },
    {
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 480,
      xxs: 0,
      isDraggable: true,
      isResizable: true,
    },
    {
      lg: 1200,
      md: 996,
      sm: 768,
      xs: 480,
      xxs: 0,
      isDraggable: true,
      isResizable: true,
    },
  ];

  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, isResizable: true, isDraggable: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4, isResizable: true, isDraggable: true },
    { i: "c", x: 4, y: 0, w: 1, h: 2, isResizable: true, isDraggable: true },
  ];

  return (
    // <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
    //   <div key="a" className="ag-theme-alpine" data-grid={{ x: 0, y: 0, w: 1, h: 2 }}>
    //     <div
    //       className="ag-theme-alpine"
    //       style={{
    //         height: 400,
    //         width: 600,
    //         isDraggable: true,
    //         isResizable: true,
    //       }}
    //       key="2"
    //     >
    //       <AgGridReact
    //         rowData={table.rowData}
    //         columnDefs={table.columns}
    //         pagination={true}
    //       ></AgGridReact>
    //     </div>
    //   </div>
    //   <div key="b" data-grid={{ x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4, isResizable: true, isDraggable: true }}>
    //     <div
    //       className="ag-theme-alpine"
    //       style={{
    //         height: 400,
    //         width: 600,
    //         border: "2px solid black",
    //         isDraggable: true,
    //         isResizable: true,
    //       }}
    //       key="b"
    //     >
    //       <AgChartsReact options={options} />
    //     </div>
    //   </div>
    //   <div key="c" data-grid={{ x: 4, y: 0, w: 1, h: 2 }}>
    //     c
    //   </div>
    // </GridLayout>
        <ResponsiveGridLayout

          autoSize={Boolean}

          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >

         <div
          style={{
            height: 400,
            width: 600,
            isDraggable: true,
            isResizable: true,
          }}
          key="2"
        >
          <AgGridReact
            rowData={table.rowData}
            columnDefs={table.columns}
            pagination={true}
          ></AgGridReact>
        </div>

          <div
            className="ag-theme-alpine"
            style={{
              height: 400,
              width: 600,
              isDraggable: true,
              isResizable: true,
            }}
            key="2"
          >
            <AgGridReact
              rowData={table.rowData}
              columnDefs={table.columns}
              pagination={true}
            ></AgGridReact>
          </div>
          <div
            className="ag-theme-alpine"
            style={{
              height: 400,
              width: 600,
              border: "2px solid black",
              isDraggable: true,
              isResizable: true,
            }}
            key="3"
          >
            <AgChartsReact options={options} />
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: 600, border: "2px solid black" }}
            key="4"
          >
            <AgChartsReact options={options} />
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: 600, border: "2px solid black" }}
            key="5"
          >
            <AgChartsReact options={options} />
          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: 600 }}
            key="6"
          >
            <AgGridReact
              rowData={table.rowData}
              columnDefs={table.columns}
              pagination={true}
            ></AgGridReact>
          </div>
        </ResponsiveGridLayout>
  );
};
