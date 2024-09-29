import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Grid, } from 'semantic-ui-react';
import {
  TableRow, TableHeaderCell, TableHeader, TableFooter,
  TableCell, TableBody, MenuItem, Icon, Menu, Table
} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

export function Customers() {
  const history = useHistory();
  const [customers, setCustomers] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/Customers`).then((response) => {
      setCustomers(response.data);
    }).catch((err) => console.log(err));
  }, []);

  return (
    <Grid>
      <Grid.Column>
        <br></br>
        <Button primary onClick={() => history.push(`/add-customer`)}>New customer</Button>

        <Table celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Address</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {customers?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell>
                  {item.address}
                </TableCell>
                <TableCell>
                  <Button color='orange' onClick={() => { history.push(`/update-customer/${item.id}`) }}>
                    <Icon name="edit outline"></Icon>Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color='red' onClick={() => { history.push(`/delete-customer/${item.id}`) }}>
                    <Icon name="trash"></Icon>Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableHeaderCell colSpan='3'>
                <Menu floated='right' pagination>
                  <MenuItem as='a' icon>
                    <Icon name='chevron left' />
                  </MenuItem>
                  <MenuItem as='a'>1</MenuItem>
                  <MenuItem as='a'>2</MenuItem>
                  <MenuItem as='a'>3</MenuItem>
                  <MenuItem as='a'>4</MenuItem>
                  <MenuItem as='a' icon>
                    <Icon name='chevron right' />
                  </MenuItem>
                </Menu>
              </TableHeaderCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Grid.Column>
    </Grid>
  )
}