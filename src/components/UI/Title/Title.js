import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions/forms';

import './Title.css';


const Title = () => {
    const dispatch = useDispatch()

    const saveHandler = () => {
        dispatch(actions.saveBannerForm());
    }

    return (
        <div className="Title d-flex flex-row align-items-center justify-content-between">
            <span className="mr-5">Edit Banner [Meno Banneru]</span>
            <div className="mr-5">
                <a className="mr-3">
                    <i className="fa fa-arrow-circle-left mr-1"></i>
                    back to banner list
                </a>
                <button onClick={saveHandler} style={{width: 120, fontSize:"1.1em"}}>
                    <i className="fa fa-floppy-o mr-2"></i>
                    Save
                </button>
                <button style={{width: 120, fontSize:"1.1em", backgroundColor: "salmon"}}>
                    <i className="fa fa-remove mr-2"></i>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default Title;