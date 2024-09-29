import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

export default function () {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu
      fixed="top"
      style={{ border: "none" }}
      inverted
      borderless={true}
      size="massive"
    >

      <Menu.Menu position="left">
        <Menu.Item
          name="Customers"
          active={activeItem === "Customers"}
          onClick={(e, { name }) => {
            history.push('/customers');
            setActiveItem(name)
          }}
        />

        <Menu.Item
          name="Products"
          active={activeItem === "Products"}
          onClick={(e, { name }) => {
            history.push('/products');
            setActiveItem(name)
          }}
        />

        <Menu.Item
          name="Stores"
          active={activeItem === "Stores"}
          onClick={(e, { name }) => {
            history.push('/stores');
            setActiveItem(name)
          }}
        />

        <Menu.Item
          name="Sales"
          active={activeItem === "Sales"}
          onClick={(e, { name }) => {
            history.push('/sales');
            setActiveItem(name)
          }}
        />
      </Menu.Menu>
    </Menu>
  );
}

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { MenuItem, Menu, Segment } from 'semantic-ui-react';

// export function Menu() {
//   return (
//     <Segment inverted secondary>
//       <MenuItem
//         name='home'
//         active={activeItem === 'home'}
//         onClick={this.handleItemClick}
//       />
//       <MenuItem
//         name='messages'
//         active={activeItem === 'messages'}
//         onClick={this.handleItemClick}
//       />
//       <MenuItem
//         name='friends'
//         active={activeItem === 'friends'}
//         onClick={this.handleItemClick}
//       />
//     </Segment>
//     // <Menu>
//     //   <Container>
//     //     <Menu.Menu position="left">
//     //       <Link to="/customer">Customer</Link>
//     //       <Link to="/product">Product</Link>
//     //       <Link to="/sale">Sales</Link>
//     //       <Link to="/store">Store</Link>
//     //     </Menu.Menu>
//     //   </Container>
//     // </Menu>
//   )
// }
