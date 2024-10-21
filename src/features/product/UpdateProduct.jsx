import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
    ModalHeader,
    ModalContent,
    Button,
    Modal, FormField, Form
} from 'semantic-ui-react';
import { useParams, useHistory } from "react-router-dom";

export function UpdateProduct() {
    const history = useHistory();
    const { id } = useParams();
    const [open, setOpen] = React.useState(true);
    const [state, setState] = useState({});
    const [formErrors, setFormErrors] = React.useState({});

    const handleChange = (e) => {
        setState({ [e.target.name]: e.target.value });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/Products/${id}`).then((response) => {
            setState({ name: response.data.name, price: response.data.price });
        }).catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e, data) => {
        let formValues = {
            id: id,
            name: e.target.elements.Name.value,
            price: e.target.elements.Price.value
        };

        let errors = validate(formValues);

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            axios.put(`${process.env.REACT_APP_API_URL}/Products`, formValues).then((response) => {
                alert('Product updated successfully');
                history.push('/products');
            }).catch((err) => alert('Error whicle adding new product.'));
        }
    }

    const validate = (values) => {
        let errors = {};
        if (!values.name || values.name === '') {
            errors.Name = "Name is required";
        } else if (!values.name) {
            delete errors.Name;
        }

        if (!values.price || values.price === '') {
            errors.Price = "Price is required";
        } else if (!values.price) {
            delete errors.Price;
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
            <ModalHeader>Edit product</ModalHeader>
            <ModalContent>
                <Form onSubmit={handleSubmit}>
                    <FormField>
                        <label>Name</label>
                        <input name='Name' placeholder='Name' value={state.name} onChange={handleChange} />
                    </FormField>
                    {formErrors.Name && <>
                        <span className="error">{formErrors.Name}</span>
                        <br></br>
                        <br></br>
                    </>}

                    <FormField>
                        <label>Price</label>
                        <input name='Price' placeholder='Price' value={state.price} onChange={handleChange} />
                    </FormField>
                    {formErrors.Price && <>
                        <span className="error">{formErrors.Price}</span>
                        <br></br>
                        <br></br>
                    </>}

                    <Button color='black' onClick={() => {
                        history.push('/products')
                        setOpen(false);
                    }}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        content="Update"
                        labelPosition='right'
                        icon='checkmark'
                        positive
                    />
                </Form>
            </ModalContent>
        </Modal>
    )
}
