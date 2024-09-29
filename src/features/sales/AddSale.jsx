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
            debugger;
            response.data?.map((item) => (
                customers.push({ 'text': item.name, 'value': item.id })
            ));
            setCustomers(customers);
        }).catch((err) => alert('Error whicle getting customers.'));
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/Products`).then((response) => {
            let products = [];
            debugger;
            response.data?.map((item) => (
                products.push({ 'text': item.name, 'value': item.id })
            ));
            setProducts(products);
        }).catch((err) => alert('Error whicle getting products.'));
    }, []);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/Stores`).then((response) => {
            let stores = [];
            debugger;
            response.data?.map((item) => (
                stores.push({ 'text': item.name, 'value': item.id })
            ));
            setStores(stores);
        }).catch((err) => alert('Error whicle getting stores.'));
    }, []);

    const handleSubmit = (e, data) => {
        debugger;
        let name = e.target.elements.Name.value;
        let price = e.target.elements.Price.value;

        axios.post(`${process.env.REACT_APP_API_URL}/Products`, {
            name: name,
            price: price
        }).then((response) => {
            alert('Product added successfully');
            history.push('/products');
        }).catch((err) => alert('Error whicle adding new product.'));
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Modal</Button>}
        >
            <ModalHeader>Create product</ModalHeader>
            <ModalContent>
                <Form onSubmit={handleSubmit}>
                    <FormField>
                        <label>Name</label>
                        <input name='Name' placeholder='Name' />
                    </FormField>
                    <FormField>
                        <label>Customer</label>
                        <select name="customer">
                            {customers?.map((item) => (
                                <option value={item.value}>{item.text}</option>
                            ))}
                        </select>
                        <input name='Price' placeholder='Price' />
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
