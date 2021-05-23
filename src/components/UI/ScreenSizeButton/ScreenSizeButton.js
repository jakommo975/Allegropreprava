import React from 'react';
import "./ScreenSizeButton.css";

const ScreenSizeButton = (props) => {
    let classes = ["btn", "mt-2", "mx-1"]

    if (props.active){
        classes.push("screen-btn-active");
    } else {
        classes.push("screen-btn");
    }

    if (props)    return (
        <button  onClick={props.onClick} className={classes.join(' ')}>
            {props.text}
        </button>
    )
}

export default ScreenSizeButton;