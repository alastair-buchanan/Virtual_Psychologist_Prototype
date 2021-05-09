import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

const ages = [
    {
      id: "age_cat_20-30",
      value: "age_cat_20-30",
      text: "20-30",
    },
    {
      id: "age_cat_30-40",
      value: "age_cat_30-40",
      text: "30-40",
    },
    {
      id: "age_cat_50-50",
      value: "age_cat_40-50",
      text: "40-50",
    },
    { id: "age_cat_50-60", value: "age_cat_50-60", text: "50-60" },
    { id: "age_cat_60-70", value: "age_cat_60-70", text: "60-70" },
    { id: "", value: "", text: "blank" },
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