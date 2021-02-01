
import React, { useEffect } from 'react'
import './Test.css'

const Test = (props) => {
    useEffect(() => {console.log("props change")}, [props]);
    return (
        <p>{props.text.value}</p>
    );
}

export default Test;