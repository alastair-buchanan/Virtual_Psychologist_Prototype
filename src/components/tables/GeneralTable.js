import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "semantic-ui-react";

export const GeneralTable = ({ rowData }) => {
  const [numberClients, setNumberClients] = useState();

  useEffect(() => {
    setNumberClients(rowData.length);
  }, []);

  return (
    <Table celled>
      <TableBody>
        <TableRow>
          <TableCell>Number of clients:</TableCell>
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
        <TableRow>
          <TableCell>Number of clients:</TableCell>
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
        <TableRow>
          <TableCell>Number of clients:</TableCell>
          <TableCell>{numberClients}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
