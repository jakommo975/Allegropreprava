import React from 'react';
import {useSelector} from 'react-redux';
import './EditItemModal.css';
import Modal from '../BaseModal/BaseModal';
import EditItemForm from '../../Forms/EditItemForm/EditItemForm';


const EditItemModal = (props) => {
    const isOpen = useSelector(state => state.grid.editModalIsOpen);


    return (
        <React.Fragment>
            <Modal 
                isOpen={isOpen}
                class="EditItemModal"
            >
                <EditItemForm/>
            </Modal>
        </React.Fragment>
    );
}

export default EditItemModal;