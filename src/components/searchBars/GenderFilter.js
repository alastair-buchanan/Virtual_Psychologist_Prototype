import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

const genders = [
    {
      id: "Female",
      value: "Female",
      text: "Female",
    },
    {
      id: "Male",
      value: "Male",
      text: "Male",
    },
    {
      id: "Non-binary",
      value: "Non-binary",
      text: "Non-binary",
    },
    { id: "Not stated", value: "Not stated", text: "Not stated" },
    { id: null, value: null, text: "Reset" },
  ];


export const GenderFilter = (props) => {
    const [innerSearch, setInnerSearch] = useState(null);
  
    useEffect(() => props.onSubmit(innerSearch), [innerSearch, props]);
  
    function handleOnChange(event, data) {
      setInnerSearch(data.value);
    }
  
    return (
      <Dropdown
        onChange={handleOnChange}
        placeholder="Choose Gender"
        fluid
        search
        selection
        options={genders}
      ></Dropdown>
    );
  };