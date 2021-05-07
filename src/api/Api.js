import { useEffect, useState } from "react";

async function getData() {
  const url = 'sample_data.json';
  let res = await fetch(url);
  const data = await res.json();
  return data.map((element) => ({
    Organisation: element.Organisation,
    Date: new Date(element.Date),
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
    User: element.User
  }));
}

export const useClientData = () => {
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setClientData(await getData());
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
