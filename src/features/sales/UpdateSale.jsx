import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
    ModalHeader,
    ModalContent,
    Button,
    Modal, FormField, Form
} from 'semantic-ui-react';
import { useParams, useHistory } from "react-router-dom";

export function UpdateSale() {
    const history = useHistory();
    const { id } = useParams();
    const [open, setOpen] = React.useState(true);
    const [state, setState] = useState({});
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

    const handleChange = (e) => {
        setState({ [e.target.name]: e.target.value });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/Sales/${id}`).then((response) => {
            let dateSoldFullYear = new Date(response.data.dateSold).getFullYear();
            let tmpDateSoldMonth = new Date(response.data.dateSold).getMonth() + 1;
            let dateSoldMonth = tmpDateSoldMonth > 9 ? tmpDateSoldMonth.toString() : '0' + tmpDateSoldMonth.toString();
            let tmpDateSoldDay = new Date(response.data.dateSold).getDate();
            let dateSoldDay = tmpDateSoldDay > 9 ? tmpDateSoldDay.toString() : '0' + tmpDateSoldDay.toString();

            let dateSold = dateSoldFullYear + "-" + dateSoldMonth + "-" + dateSoldDay;
            setState({
                dateSold: dateSold, customerId: response.data.customerId,
                productId: response.data.productId, storeId: response.data.storeId
            });
        }).catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e, data) => {
        let dateSold = e.target.elements.DateSold.value;
        let customerId = e.target.elements.Customer.value;
        let productId = e.target.elements.Product.value;
        let storeId = e.target.elements.Store.value;

        axios.put(`${process.env.REACT_APP_API_URL}/Sales`, {
            id: id,
            DateSold: dateSold,
            CustomerId: customerId,
            ProductId: productId,
            StoreId: storeId
        }).then((response) => {
            alert('Sale updated successfully');
            history.push('/Sales');
        }).catch((err) => alert('Error whicle updating sale.'));
    }

    const onChangeDate = e => {
        setState({ ...state, dateSold: e.target.value });
    };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Modal</Button>}
        >
            <ModalHeader>Edit product</ModalHeader>
            <ModalContent>
                <Form onSubmit={handleSubmit}>
                    <FormField>
                        <label>Date sold</label>
                        <input name='DateSold' type='date' placeholder='Date sold' value={state.dateSold} onChange={onChangeDate} />
                    </FormField>

                    <FormField>
                        <label>Customer</label>
                        <select name="Customer" handleChange={handleChange}>
                            {customers?.map((item) => (
                                <option value={item.value} selected={item.value === state.customerId}>{item.text}</option>
                            ))}
                        </select>
                    </FormField>

                    <FormField>
                        <label>Product</label>
                        <select name="Product" handleChange={handleChange}>
                            {products?.map((item) => (
                                <option value={item.value} selected={item.value === state.productId}>{item.text}</option>
                            ))}
                        </select>
                    </FormField>

                    <FormField>
                        <label>Store</label>
                        <select name="Store" handleChange={handleChange}>
                            {stores?.map((item) => (
                                <option value={item.value} selected={item.value === state.storeId}>{item.text}</option>
                            ))}
                        </select>
                    </FormField>

                    <Button color='black' onClick={() => {
                        history.push('/sales')
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
