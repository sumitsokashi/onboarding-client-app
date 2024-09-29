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
    const handleChange = (e) => {
        debugger;
        setState({ [e.target.name]: e.target.value });
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/Products/${id}`).then((response) => {
            setState({ name: response.data.name, price: response.data.price });
        }).catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e, data) => {
        debugger;
        let name = e.target.elements.Name.value;
        let price = e.target.elements.Price.value;

        axios.put(`${process.env.REACT_APP_API_URL}/Products`, {
            id: id,
            name: name,
            price: price
        }).then((response) => {
            alert('Product updated successfully');
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
            <ModalHeader>Edit product</ModalHeader>
            <ModalContent>
                <Form onSubmit={handleSubmit}>
                    <FormField>
                        <label>Name</label>
                        <input name='Name' placeholder='Name' value={state.name} onChange={handleChange} />
                    </FormField>
                    <FormField>
                        <label>Price</label>
                        <input name='Price' placeholder='Price' value={state.price} handleChange={handleChange} />
                    </FormField>

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
