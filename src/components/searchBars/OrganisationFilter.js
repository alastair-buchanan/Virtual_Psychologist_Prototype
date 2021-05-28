import React, { useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

const orgs = [
    {
      id: "AussieHelpersLaunch",
      value: "AussieHelpersLaunch",
      text: "AussieHelpersLaunch",
    },
    {
      id: "CocaCola Amatil",
      value: "CocaCola Amatil",
      text: "CocaCola Amatil",
    },
    {
      id: "Optus",
      value: "Optus",
      text: "Optus",
    },
    {
      id: "Singtel",
      value: "Singtel",
      text: "Singtel",
    },
    { id: "Suncorp", value: "Suncorp", text: "Suncorp" },
    { id: null, value: null, text: "Reset" },
  ];

export const OrganisationFilter = (props) => {
    const [innerSearch, setInnerSearch] = useState(null);
  
    useEffect(() => props.onSubmit(innerSearch), [innerSearch, props]);
  
    function handleOnChange(event, data) {
      setInnerSearch(data.value);
    }
   
    return (
      <Dropdown
        onChange={handleOnChange}
        placeholder="Choose Organisation"
        fluid
        search
        selection
        options={orgs}
      ></Dropdown>
    );
  };
  