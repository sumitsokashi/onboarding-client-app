import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
    ModalHeader,
    ModalContent,
    Button,
    Modal, FormField, Form
} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

export function AddSale() {
    const history = useHistory();
    const [open, setOpen] = React.useState(true);
    const [stores, setStores] = useState();
    const [products, setProducts] = useState();
    const [customers, setCustomers] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/Customers`).then((response) => {
            let customers = [];
            response.data?.map((item) => (
                customers.push({ 'text': item.name, 'value': item.id })
            ));
            setCustomers(customers);
        }).catch((err) => alert('Error whicle getting customers.'));
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/Products`).then((response) => {
            let products = [];
            response.data?.map((item) => (
                products.push({ 'text': item.name, 'value': item.id })
            ));
            setProducts(products);
        }).catch((err) => alert('Error whicle getting products.'));
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/Stores`).then((response) => {
            let stores = [];
            response.data?.map((item) => (
                stores.push({ 'text': item.name, 'value': item.id })
            ));
            setStores(stores);
        }).catch((err) => alert('Error whicle getting stores.'));
    }, []);

    const handleSubmit = (e, data) => {
        let dateSold = e.target.elements.DateSold.value;
        let customerId = e.target.elements.Customer.value;
        let productId = e.target.elements.Product.value;
        let storeId = e.target.elements.Store.value;

        axios.post(`${process.env.REACT_APP_API_URL}/Sales`, {
            DateSold: dateSold,
            CustomerId: customerId,
            ProductId: productId,
            StoreId: storeId
        }).then((response) => {
            alert('Sale added successfully');
            history.push('/sales');
        }).catch((err) => alert('Error whicle adding new sale.'));
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Modal</Button>}
        >
            <ModalHeader>Create sale</ModalHeader>
            <ModalContent>
                <Form onSubmit={handleSubmit}>
                    <FormField>
                        <label>Date sold</label>
                        <input name='DateSold' type='date' placeholder='Date sold' />
                    </FormField>

                    <FormField>
                        <label>Customer</label>
                        <select name="Customer">
                            {customers?.map((item) => (
                                <option value={item.value}>{item.text}</option>
                            ))}
                        </select>
                    </FormField>

                    <FormField>
                        <label>Product</label>
                        <select name="Product">
                            {products?.map((item) => (
                                <option value={item.value}>{item.text}</option>
                            ))}
                        </select>
                    </FormField>

                    <FormField>
                        <label>Store</label>
                        <select name="Store">
                            {stores?.map((item) => (
                                <option value={item.value}>{item.text}</option>
                            ))}
                        </select>
                    </FormField>

                    <Button color='black' onClick={() => {
                        history.push('/products')
                        setOpen(false);
                    }}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        content="Create"
                        labelPosition='right'
                        icon='checkmark'
                        positive
                    />
                </Form>
            </ModalContent>
        </Modal>
    )
}
