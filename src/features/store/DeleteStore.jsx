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

export function DeleteStore() {
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
            <ModalHeader>Delete store</ModalHeader>
            <ModalContent>
                Are you sure?
            </ModalContent>
            <ModalActions>
                <Button color='black' onClick={() => {
                    history.push('/stores')
                    setOpen(false);
                }}>
                    Cancel
                </Button>
                <Button
                    content="Delete"
                    labelPosition='right'
                    icon='close icon'
                    onClick={() => {
                        axios.delete(`${process.env.REACT_APP_API_URL}/Stores/${id}`).then((response) => {
                            alert('Store deleted successfully');
                            history.push('/stores');
                        }).catch((err) => alert('Error while deleting store.'));
                        setOpen(false);
                    }}
                    Delete
                />
            </ModalActions>
        </Modal>
    )
}
