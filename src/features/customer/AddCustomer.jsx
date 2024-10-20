import React from 'react';
import axios from "axios";
import {
    ModalHeader,
    ModalContent,
    Button,
    Modal, FormField, Form
} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";


export function AddCustomer() {
    const history = useHistory();
    const [open, setOpen] = React.useState(true);
    const [formErrors, setFormErrors] = React.useState({});

    const handleSubmit = (e) => {
        let formValues = {
            name: e.target.elements.Name.value,
            address: e.target.elements.Address.value
        };

        let errors = validate(formValues);

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            axios.post(`${process.env.REACT_APP_API_URL}/Customers`, formValues)
                .then(() => {
                    alert('Customer added successfully');
                    history.push('/customers');
                }).catch(() => alert('Error whicle adding new customer.'));
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
            closeOnDimmerClick={false}
            trigger={<Button>Show Modal</Button>}
        >
            <ModalHeader>Create customer</ModalHeader>
            <ModalContent>
                <Form onSubmit={handleSubmit}>
                    <FormField>
                        <label>Name</label>
                        <input name='Name' placeholder='Name' />
                    </FormField>
                    {formErrors.Name && <>
                        <span className="error">{formErrors.Name}</span>
                        <br></br>
                        <br></br>
                    </>}

                    <FormField>
                        <label>Address</label>
                        <input name='Address' placeholder='Address' />
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
