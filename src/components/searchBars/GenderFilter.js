import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

const genders = [
    {
      id: "gender_female",
      value: "gender_female",
      text: "Female",
    },
    {
      id: "gender_male",
      value: "gender_male",
      text: "Male",
    },
    {
      id: "gender_non-binary",
      value: "gender_non-binary",
      text: "Non-binary",
    },
    { id: "gender_not_stated", value: "gender_not_stated", text: "Not_stated" },
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