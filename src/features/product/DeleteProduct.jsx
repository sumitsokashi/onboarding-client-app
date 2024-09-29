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

export function DeleteProduct() {
    const history = useHistory();
    const { id } = useParams();
    const [open, setOpen] = React.useState(true);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Show Modal</Button>}
        >
            <ModalHeader>Delete product</ModalHeader>
            <ModalContent>
                Are you sure?
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => {
                    history.push('/products')
                    setOpen(false);
                }}>
                    Cancel
                </Button>
                <Button
                    content="Delete"
                    labelPosition='right'
                    icon='close icon'
                    onClick={() => {
                        axios.delete(`${process.env.REACT_APP_API_URL}/Products/${id}`).then((response) => {
                            alert('Product deleted successfully');
                            history.push('/products');
                        }).catch((err) => alert('Error whicle deleting product.'));
                        setOpen(false);
                    }}
                    Delete
                />
            </ModalActions>
        </Modal>
    )
}
