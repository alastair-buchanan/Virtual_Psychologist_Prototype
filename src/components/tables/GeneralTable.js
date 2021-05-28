import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "semantic-ui-react";

function filterByIssue(data, param) {
  return data.filter((stock) => stock["Problem_Category"] === param);
}

export const GeneralTable = ({
  rowData,
  organisations,
  filteredData
}) => {
  const [numberMessages, setNumberMessages] = useState();
  const [numberOrganisations, setNumberOrganisations] = useState();
  const [fData, setFData] = useState(filteredData);


  useEffect(() => {
    setNumberMessages(rowData.length);
    setNumberOrganisations(Object.keys(organisations).filter(e => e).length);
  }, [rowData, organisations]);

  useEffect(() => {
    setFData(filteredData);
  }, [filteredData]);

  return (
    <Table celled>
      <TableBody>
        <TableRow>
          <TableCell>Total messages sent:</TableCell>
          <TableCell>{numberMessages}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Number of organisations:</TableCell>
          <TableCell>{numberOrganisations}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total Anxiety:</TableCell>
          <TableCell>{filterByIssue(fData, "Anxiety").length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total Anger:</TableCell>
          <TableCell>{filterByIssue(fData, "Anger").length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total Depression:</TableCell>
          <TableCell>{filterByIssue(fData, "Depression").length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total Work Problems:</TableCell>
          <TableCell>{filterByIssue(fData, "Work Problems").length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total Relationship Problems:</TableCell>
          <TableCell>{filterByIssue(fData, "Relationship Problems").length}</TableCell>
        </TableRow>
      </TableBody> 
    </Table>
  );
};
