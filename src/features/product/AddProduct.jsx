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

    const handleSubmit = (e, data) => {
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
                        <label>Price</label>
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
