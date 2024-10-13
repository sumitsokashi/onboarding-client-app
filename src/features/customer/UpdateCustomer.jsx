import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
    ModalHeader,
    ModalContent,
    Button,
    Modal, FormField, Form
} from 'semantic-ui-react';
import { useParams, useHistory } from "react-router-dom";

export function UpdateCustomer() {
    const history = useHistory();
    const { id } = useParams();
    const [open, setOpen] = React.useState(true);
    const [state, setState] = useState({});
    const [formErrors, setFormErrors] = React.useState({});

    const handleChange = (e) => {
        setState({ [e.target.name]: e.target.value });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/Customers/${id}`).then((response) => {
            setState({ name: response.data.name, address: response.data.address });
        }).catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e, data) => {
        let formValues = {
            id: id,
            name: e.target.elements.Name.value,
            address: e.target.elements.Address.value
        };

        let errors = validate(formValues);

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {

            axios.put(`${process.env.REACT_APP_API_URL}/Customers`, formValues)
                .then((response) => {
                    alert('Customer updated successfully');
                    history.push('/customers');
                }).catch((err) => alert('Error whicle adding new customer.'));
        }
    }

    const validate = (values) => {
        let errors = {};
        if (!values.name || values.name === '') {
            errors.Name = "Name is required";
        } else if (!values.name) {
            delete errors.Name;
        }

        if (!values.address || values.address === '') {
            errors.Address = "Address is required";
        } else if (!values.address) {
            delete errors.Address;
        }
        return errors;
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Modal</Button>}
        >
            <ModalHeader>Edit customer</ModalHeader>
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
                        <label>Address</label>
                        <input name='Address' placeholder='Address' value={state.address} onChange={handleChange} />
                    </FormField>
                    {formErrors.Address && <>
                        <span className="error">{formErrors.Address}</span>
                        <br></br>
                        <br></br>
                    </>}

                    <Button color='black' onClick={() => {
                        history.push('/customers')
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
