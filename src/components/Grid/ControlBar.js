import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as gridActions from '../../store/actions/grid';
import './ControlBar.css';

const ControlBar = (props) => {
    const dispatch = useDispatch();
    const canRedo = useSelector(state => state.future.length > 0);
    const canUndo = useSelector(state => state.past.length > 0);

    let redoIconName = "fas fa-redo";
    let undoIconName = "fas fa-undo";
    let addItemIconName = "fas fa-plus";
    if (process.env.NODE_ENV === "production"){
        redoIconName = "fa fa-repeat";
        undoIconName = "fa fa-undo";
        addItemIconName = "fa fa-plus"
    }


    const addItemHandler = (e) => {
        e.preventDefault();
        dispatch({
            type: gridActions.ADD_ITEM,
        });
    }

    const undoHandler = (e) => {
        e.preventDefault();
        dispatch({
            type: "UNDO",
        });
    }

    const redoHandler = (e) => {
        e.preventDefault();
        dispatch({
            type: "REDO",
        });
    }

    return (
        <div className="ControlBar">
            <button onClick={undoHandler} disabled={!canUndo}  className="ArrowButton">
                <i className={undoIconName}></i>
            </button>
            <button onClick={redoHandler} disabled={!canRedo}  className="ArrowButton">
                <i className={redoIconName}></i>
            </button>
            <button onClick={addItemHandler} className="AddButton">
                <i className={addItemIconName}></i>
                Add Item
            </button>
        </div>
    );
}

export default ControlBar;