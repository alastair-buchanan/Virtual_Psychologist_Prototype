import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "semantic-ui-react";

// function sortOrganisation(dataSet) {
//   const newArray = ([]);
//   return Object.keys(dataSet)
//     .map((element) => ({
//       Organisation: element,
//       Count: dataSet[element].length,
//     }))

// }

export const GeneralTable = ({ rowData, organisations, issues, channels }) => {
  const [numberClients, setNumberClients] = useState();
  const [mostOrganisation, setMostOrganisation] = useState();
  const [mostIssues, setMostIssues] = useState();
  const [mostChannels, setMostChannels] = useState();

  // useEffect(() => {
  //   setNumberClients(rowData.length);
  //   setMostOrganisation(sortOrganisation(organisations).sort((a, b) => (a.Count > b.Count ? 1 : b.last_nom > a.last_nom ? -1 : 0)));
  // }, [rowData, organisations, issues, channels]);

  return (
    <Table celled>
      <TableBody>
        <TableRow>
          <TableCell>Number of users:</TableCell>
          <TableCell>{rowData.length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Number of organisations:</TableCell>
          <TableCell>{rowData.length}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Highest Age group:</TableCell>
          <TableCell>{numberClients}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Greatest issue:</TableCell>
          <TableCell>{numberClients}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Highest volume day:</TableCell>
          <TableCell>{numberClients}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Number of clients:</TableCell>
          <TableCell>{numberClients}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Number of clients:</TableCell>
          <TableCell>{numberClients}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
