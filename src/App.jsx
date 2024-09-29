import React from 'react';
import { Customers } from './features/customer/Customers';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';
import { Products } from './features/product/Products';
import { Sales } from './features/sales/Sales';
import { Stores } from './features/store/Stores';
import { NotFound } from './app/NotFound';
import Menu from './Menu';
import { UpdateCustomer } from './features/customer/UpdateCustomer';
import { AddCustomer } from './features/customer/AddCustomer';
import { DeleteCustomer } from './features/customer/DeleteCustomer';
import { UpdateProduct } from './features/product/UpdateProduct';
import { DeleteProduct } from './features/product/DeleteProduct';
import { AddProduct } from './features/product/AddProduct';
import { AddStore } from './features/store/AddStore';
import { DeleteStore } from './features/store/DeleteStore';
import { UpdateStore } from './features/store/UpdateStore';
import { UpdateSale } from './features/sales/UpdateSale';
import { DeleteSale } from './features/sales/DeleteSale';
import { AddSale } from './features/sales/AddSale';

export const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <>
        <Menu></Menu>
        <Switch>
          <Route exact path="/" component={Customers} />
          <Route path="/customers" component={Customers} />
          <Route path="/update-customer/:id" component={UpdateCustomer} />
          <Route path="/delete-customer/:id" component={DeleteCustomer} />
          <Route path="/add-customer" component={AddCustomer}></Route>

          <Route path="/products" component={Products} />
          <Route path="/update-product/:id" component={UpdateProduct} />
          <Route path="/delete-product/:id" component={DeleteProduct} />
          <Route path="/add-product" component={AddProduct}></Route>

          <Route path="/sales" component={Sales} />
          <Route path="/update-sale/:id" component={UpdateSale} />
          <Route path="/delete-sale/:id" component={DeleteSale} />
          <Route path="/add-sale" component={AddSale}></Route>

          <Route path="/stores" component={Stores} />
          <Route path="/update-store/:id" component={UpdateStore} />
          <Route path="/delete-store/:id" component={DeleteStore} />
          <Route path="/add-store" component={AddStore}></Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </>
    </Router>
  )
}

export default App;
