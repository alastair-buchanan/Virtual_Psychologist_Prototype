import React from 'react'
import { Responsive, WidthProvider } from "react-grid-layout";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const Dashboard = () => {

    const layouts = [
        { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
        { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
        { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
      ];
      return (
        <ResponsiveGridLayout
          className="layout"
          autoSize={Boolean}
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        >
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: 600 }}
            key="2"
          >
          </div>
          <div  className="ag-theme-alpine"
            style={{ height: 400, width: 600, border: '2px solid black' }}
            key="3">
          </div>
          <div  className="ag-theme-alpine"
            style={{ height: 400, width: 600, border: '2px solid black' }}
            key="4">

          </div>
          <div  className="ag-theme-alpine"
            style={{ height: 400, width: 600, border: '2px solid black' }}
            key="5">

          </div>
          <div
            className="ag-theme-alpine"
            style={{ height: 400, width: 600 }}
            key="6"
          >
          </div>
        </ResponsiveGridLayout>
      );
    };
    