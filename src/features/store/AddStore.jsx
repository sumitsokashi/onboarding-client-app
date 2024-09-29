import React from 'react';
import axios from "axios";
import {
    ModalHeader,
    ModalContent,
    Button,
    Modal, FormField, Form
} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

export function AddStore() {
    debugger;
    const history = useHistory();
    const [open, setOpen] = React.useState(true);

    const handleSubmit = (e, data) => {
        debugger;
        let name = e.target.elements.Name.value;
        let address = e.target.elements.Address.value;

        axios.post(`${process.env.REACT_APP_API_URL}/Stores`, {
            name: name,
            address: address
        }).then((response) => {
            alert('Store added successfully');
            history.push('/stores');
        }).catch((err) => alert('Error whicle adding new store.'));
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Modal</Button>}
        >
            <ModalHeader>Create store</ModalHeader>
            <ModalContent>
                <Form onSubmit={handleSubmit}>
                    <FormField>
                        <label>Name</label>
                        <input name='Name' placeholder='Name' />
                    </FormField>
                    <FormField>
                        <label>Address</label>
                        <input name='Address' placeholder='Address' />
                    </FormField>

                    <Button color='black' onClick={() => {
                        history.push('/stores')
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
