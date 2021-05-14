import React, { useRef, useState } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { useClientData } from "../api/Api";

const PlotlyRenderers = createPlotlyRenderers(Plot);

export const Dashboard2 = () => {
  const { loading, clientData, error } = useClientData();
  const [state, setState] = useState();

  const componentRef = useRef();

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>console.error();</div>;
  }
  return (
      <PivotTableUI
        ref={componentRef}
        data={clientData}
        onChange={(s) => setState(s)}
        renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
        {...state}
      />
  );
};
