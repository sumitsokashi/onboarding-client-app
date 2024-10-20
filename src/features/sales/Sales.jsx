import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Grid, } from 'semantic-ui-react';
import { TableRow, TableHeaderCell, TableHeader, TableCell, TableBody, Icon, Table } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

export function Sales() {
  const history = useHistory();
  const [sales, setSales] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/Sales`).then((response) => {
      setSales(response.data);
    }).catch((err) => console.log(err));
  }, []);

  return (
    <Grid>
      <Grid.Column>
        <br></br>
        <Button primary onClick={() => history.push(`/add-sale`)}>New sale</Button>

        <Table celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Store</TableHeaderCell>
              <TableHeaderCell>DateSold</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sales?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.customer?.name}
                </TableCell>
                <TableCell>
                  {item.product?.name}
                </TableCell>
                <TableCell>
                  {item.store?.name}
                </TableCell>
                <TableCell>
                  {new Date(item.dateSold).getDate() > 9 ? new Date(item.dateSold).getDate() : "0" + new Date(item.dateSold).getDate()}-
                  {(new Date(item.dateSold).getMonth() + 1) > 9 ? (new Date(item.dateSold).getMonth() + 1) : "0" + (new Date(item.dateSold).getMonth() + 1)}-
                  {new Date(item.dateSold).getFullYear()}
                </TableCell>
                <TableCell>
                  <Button color='orange' onClick={() => { history.push(`/update-sale/${item.id}`) }}>
                    <Icon name="edit outline"></Icon>Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color='red' onClick={() => { history.push(`/delete-sale/${item.id}`) }}>
                    <Icon name="trash"></Icon>Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid.Column>
    </Grid>
  )
}