import React, { useEffect, useState } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

export const DateFilter = (props) => {
  const [currentDate, setNewDate] = useState(undefined);

  const onChange = (event, data) => setNewDate(data.value);

  useEffect(() => props.onSubmit(currentDate), [currentDate, props]);

  return <SemanticDatepicker fluid format="DD-MM-YYYY" onChange={onChange} type="range" />;
};
