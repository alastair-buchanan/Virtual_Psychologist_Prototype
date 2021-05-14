import React, { useState } from "react";
import PivotTableUI from "react-pivottable/PivotTableUI";
import "react-pivottable/pivottable.css";
import TableRenderers from "react-pivottable/TableRenderers";
import Plot from "react-plotly.js";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import { useClientData } from "../api/Api";
import { Container } from "semantic-ui-react";

const PlotlyRenderers = createPlotlyRenderers(Plot);

export const Dashboard2 = () => {
  const { loading, clientData, error } = useClientData();
  const [state, setState] = useState();

  return (
    <Container>
      <PivotTableUI
        data={clientData}
        onChange={(s) => setState(s)}
        renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
        {...state}
      />
      <span style={{ float: "right" }}>
        <button onClick={() => exportComponentAsJPEG(componentRef)}>
          Download
        </button>
      </span>
    </Container>
  );
};
