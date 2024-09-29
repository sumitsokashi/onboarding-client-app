import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Grid, } from 'semantic-ui-react';
import { TableRow, TableHeaderCell, TableHeader, TableFooter, TableCell, TableBody, MenuItem, Icon, Menu, Table } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

export function Stores() {
  const history = useHistory();
  const [stores, setStores] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/Stores`).then((response) => {
      setStores(response.data);
    }).catch((err) => console.log(err));
  }, []);

  return (
    <Grid>
      <Grid.Column>
        <br></br>
        <Button primary onClick={() => history.push(`/add-store`)}>New store</Button>

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
            {stores?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.name}
                </TableCell>
                <TableCell>
                  {item.address}
                </TableCell>
                <TableCell>
                  <Button color='orange' onClick={() => { history.push(`/update-store/${item.id}`) }}>
                    <Icon name="edit outline"></Icon>Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color='red' onClick={() => { history.push(`/delete-store/${item.id}`) }}>
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

        {/* <Segment>
          <Form size="large">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Email address"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="blue" fluid size="large">
              Login
            </Button>
          </Form>
        </Segment>
        <Message>
          Not registered yet? <a href="#">Sign Up</a>
        </Message> */}
      </Grid.Column>
    </Grid>
  )
}