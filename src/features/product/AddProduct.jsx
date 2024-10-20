import React from 'react';
import axios from "axios";
import {
    ModalHeader,
    ModalContent,
    Button,
    Modal, FormField, Form
} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

export function AddProduct() {
    const history = useHistory();
    const [open, setOpen] = React.useState(true);
    const [formErrors, setFormErrors] = React.useState({});

    const handleSubmit = (e, data) => {
        let formValues = {
            name: e.target.elements.Name.value,
            price: e.target.elements.Price.value
        };

        let errors = validate(formValues);

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            axios.post(`${process.env.REACT_APP_API_URL}/Products`, formValues)
                .then((response) => {
                    alert('Product added successfully');
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
            <ModalHeader>Create product</ModalHeader>
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
                        <label>Price</label>
                        <input name='Price' placeholder='Price' />
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
