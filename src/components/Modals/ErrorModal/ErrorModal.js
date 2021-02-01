import React from 'react';
import Modal from '../BaseModal/BaseModal';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions/grid';
import './ErrorModal.css'

const ErrorModal = (props) => {
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.grid.errorMessage);
    let isOpen = errorMessage ? true : false;
    return (
        <Modal 
            class="ErrorModal"
            isOpen={isOpen}
        >
            <p>{errorMessage}</p>
            <button onClick={() => {dispatch({type: actions.SET_ERROR})}}>OK</button>
        </Modal>
    );
}

export default ErrorModal;