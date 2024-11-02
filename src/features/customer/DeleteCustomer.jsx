import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal,
} from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

export function DeleteCustomer() {
    const history = useHistory();
    const { id } = useParams();
    const [open, setOpen] = React.useState(true);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            closeOnDimmerClick={false}
            trigger={<Button>Show Modal</Button>}
        >
            <ModalHeader>Delete customer</ModalHeader>
            <ModalContent>
                Are you sure?
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => {
                    history.push('/customers')
                    setOpen(false);
                }}>
                    Cancel
                </Button>
                <Button
                    content="Delete"
                    labelPosition='right'
                    icon='close icon'
                    onClick={() => {
                        axios.delete(`${process.env.REACT_APP_API_URL}/Customers/${id}`).then((response) => {
                            alert('Customer deleted successfully');
                            history.push('/customers');
                        }).catch((err) => alert('Error whicle deleting customer.'));
                        setOpen(false);
                    }}
                    Delete
                />
            </ModalActions>
        </Modal>
    )
}
