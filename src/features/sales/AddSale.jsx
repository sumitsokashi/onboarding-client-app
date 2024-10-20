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
    const [formErrors, setFormErrors] = React.useState({});

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
        debugger;
        let formValues = {
            dateSold: e.target.elements.DateSold.value,
            customerId: e.target.elements.Customer.value,
            productId: e.target.elements.Product.value,
            storeId: e.target.elements.Store.value
        };

        let errors = validate(formValues);

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            axios.post(`${process.env.REACT_APP_API_URL}/Sales`, formValues)
                .then((response) => {
                    alert('Sale added successfully');
                    history.push('/sales');
                }).catch((err) => alert('Error whicle adding new sale.'));
        }
    }

    const validate = (values) => {
        let errors = {};
        if (!values.dateSold || values.dateSold === '') {
            errors.DateSold = "Date sold is required";
        } else if (!values.dateSold) {
            delete errors.dateSold;
        }

        if (!values.customerId || values.customerId === '') {
            errors.Customer = "Customer is required";
        } else if (!values.customerId) {
            delete errors.Customer;
        }

        if (!values.productId || values.productId === '') {
            errors.Product = "Product is required";
        } else if (!values.productId) {
            delete errors.Product;
        }

        if (!values.storeId || values.storeId === '') {
            errors.Store = "Store is required";
        } else if (!values.storeId) {
            delete errors.Store;
        }
        return errors;
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            closeOnDimmerClick={false}
            trigger={<Button>Show Modal</Button>}
        >
            <ModalHeader>Create sale</ModalHeader>
            <ModalContent>
                <Form onSubmit={handleSubmit}>
                    <FormField>
                        <label>Date sold</label>
                        <input name='DateSold' type='date' placeholder='Date sold' />
                    </FormField>
                    {formErrors.DateSold && <>
                        <span className="error">{formErrors.DateSold}</span>
                        <br></br>
                        <br></br>
                    </>}

                    <FormField>
                        <label>Customer</label>
                        <select name="Customer">
                            {customers?.map((item) => (
                                <option value={item.value} key={item.value}>{item.text}</option>
                            ))}
                        </select>
                    </FormField>
                    {formErrors.Customer && <>
                        <span className="error">{formErrors.Customer}</span>
                        <br></br>
                        <br></br>
                    </>}

                    <FormField>
                        <label>Product</label>
                        <select name="Product">
                            {products?.map((item) => (
                                <option value={item.value} key={item.value}>{item.text}</option>
                            ))}
                        </select>
                    </FormField>
                    {formErrors.Product && <>
                        <span className="error">{formErrors.Product}</span>
                        <br></br>
                        <br></br>
                    </>}

                    <FormField>
                        <label>Store</label>
                        <select name="Store">
                            {stores?.map((item) => (
                                <option value={item.value} key={item.value}>{item.text}</option>
                            ))}
                        </select>
                    </FormField>
                    {formErrors.Store && <>
                        <span className="error">{formErrors.Store}</span>
                        <br></br>
                        <br></br>
                    </>}

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
