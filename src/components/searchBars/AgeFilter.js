import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

const ages = [
  {
    id: " 10-20",
    value: " 10-20",
    text: "10-20",
  },
  {
    id: "20-30",
    value: "20-30",
    text: "20-30",
  },
  {
    id: "30-40",
    value: "30-40",
    text: "30-40",
  },
  {
    id: "40-50",
    value: "40-50",
    text: "40-50",
  },
  { id: "50-60", value: "50-60", text: "50-60" },
  { id: "60-70", value: "60-70", text: "60-70" },
  { id: null, value: null, text: "Reset" },
];

export const AgeFilter = (props) => {
  const [innerSearch, setInnerSearch] = useState(null);

  useEffect(() => props.onSubmit(innerSearch), [innerSearch, props]);

  function handleOnChange(event, data) {
    setInnerSearch(data.value);
  }

  return (
    <Dropdown
      onChange={handleOnChange}
      placeholder="Choose Age"
      fluid
      search
      selection
      options={ages}
    ></Dropdown>
  );
};
