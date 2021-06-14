import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

const units = [
  { id: "1", value: 1, text: "1" },
  { id: "2", value: 2, text: "2" },
  { id: "3", value: 3, text: "3" },
  { id: "4", value: 4, text: "4" },
  { id: "5", value: 5, text: "5" },
  { id: null, value: null, text: "Reset" },
];

export const BusinessUnitFilter = (props) => {
  const [innerSearch, setInnerSearch] = useState(null);

  useEffect(() => props.onSubmit(innerSearch), [innerSearch, props]);

  function handleOnChange(event, data) {
    setInnerSearch(data.value);
  }

  return (
    <Dropdown
      onChange={handleOnChange}
      placeholder="Choose Business Unit"
      fluid
      search
      selection
      options={units}
    ></Dropdown>
  );
};
