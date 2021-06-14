import { useEffect, useState } from "react";

async function getSampleData() {
  const url = 'Sample_data_2.json';
  let res = await fetch(url);
  const data = await res.json();
  return data.map((element) => ({
    Organisation: element.Organisation,
    Date: element.Date,
    Country: element.Country,
    Age: element["Age Category"],
    Gender: element.Gender,
    Channel: element.Channel,
    EAP: element.EAP,
    Region: element.Region,
    Problem_Category: element["Problem Category"],
    MMM_Code: element["MMM Code"],
    Day: element["Day of week"],
    Note_Type: element["Note Type"],
    Time: element.Time,
    User: element.User,
    Ticket: element.Ticket,
    Business_Unit: element["Business Unit"]
  }));
}

async function getFilteredData() {
  const url = 'filtered_by_ticket2.json';
  let res = await fetch(url);
  const data = await res.json();
  return data.map((element) => ({
    Organisation: element.Organisation,
    Date: element.Date,
    Country: element.Country,
    Age: element["Age Category"],
    Gender: element.Gender,
    Channel: element.Channel,
    EAP: element.EAP,
    Region: element.Region,
    Problem_Category: element["Problem Category"],
    MMM_Code: element["MMM Code"],
    Day: element["Day of week"],
    Note_Type: element["Note Type"],
    Time: element.Time,
    User: element.User,
    Ticket: element.Ticket,
    Business_Unit: element["Business Unit"]
  }));
}

export const useClientData = () => {
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setClientData(await getSampleData());
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    })();
  }, []);

  return {
    loading,
    clientData,
    error,
  };
};

export const useFilteredData = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filterLoading, setFilterLoading] = useState(true);
  const [filterError, setFilterError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setFilteredData(await getFilteredData());
        setFilterLoading(false);
      } catch (err) {
        setFilterError(err);
        setFilterLoading(false);
      }
    })();
  }, []);

  return {
    filterLoading,
    filteredData,
    filterError,
  };
};

