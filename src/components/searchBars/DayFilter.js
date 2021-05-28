import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

const days = [
  {
    id: "Monday",
    value: "Monday",
    text: "Monday",
  },
  {
    id: "Tuesday",
    value: "Tuesday",
    text: "Tuesday",
  },
  {
    id: "Wednesday",
    value: "Wednesday",
    text: "Wednesday",
  },
  {
    id: "Thursday",
    value: "Thursday",
    text: "Thursday",
  },
  { id: "Friday", value: "Friday", text: "Friday" },
  { id: "Saturday", value: "Saturday", text: "Saturday" },
  { id: "Sunday", value: "Sunday", text: "Sunday" },
  { id: null, value: null, text: "Reset" },
];

export const DayFilter = (props) => {
    const [innerSearch, setInnerSearch] = useState(null);
  
    useEffect(() => props.onSubmit(innerSearch), [innerSearch, props]);
  
    function handleOnChange(event, data) {
      setInnerSearch(data.value);
    }
  
    return (
      <Dropdown
        onChange={handleOnChange}
        placeholder="Choose Day"
        fluid
        search
        selection
        options={days}
      ></Dropdown>
    );
  };
  