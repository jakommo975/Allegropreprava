import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
    return (
        <div className="loaderContainer" style={{...props.containerStyle}}>
            <div className="loader" style={{...props.loaderStyle}}></div>
        </div>
    )
}

export default LoadingSpinner;