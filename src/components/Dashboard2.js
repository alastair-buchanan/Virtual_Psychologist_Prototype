import React, { useRef, useState } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { useFilteredData } from "../api/Api";

const PlotlyRenderers = createPlotlyRenderers(Plot);

export const Dashboard2 = () => {
  const { filterLoading, filteredData, filterError } = useFilteredData();
  const [state, setState] = useState();

  const componentRef = useRef();

  if (filterLoading) {
    return <div>loading</div>;
  }
  if (filterError) {
    return <div>console.error();</div>;
  }
  return (
      <PivotTableUI
        ref={componentRef}
        data={filteredData}
        onChange={(s) => setState(s)}
        renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
        {...state}
      />
  );
};
