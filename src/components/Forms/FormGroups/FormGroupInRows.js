import React, { useState } from 'react';
import './FormGroup.css';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';


const FormGroupInRows = (props) => {
    const [showInfo, setShowInfo] = useState(false);
    const [showInfoStyle, setShowInfoStyle] = useState();
    let input;




    const showInfoHandler = (e) => {
        setShowInfoStyle({
            position: "fixed",
            top: e.clientY + 10,
            left: e.clientX,
            width: 180,
            backgroundColor: "#eee",
            border: "1px solid #555",
            borderRadius: 5,
            zIndex: 10,
            boxShadow: "0px 6px 6px rgba(0, 0, 0, 0.1)",
            padding: "5px 10px"
        })
        setShowInfo(true);
    }


    const hideInfoHandler = (e) => {
        setShowInfo(false);
    }

    switch (props.type) {
        case "text":
            input = <input  onChange={props.change} onFocus={props.onFocus} value={props.value} onBlur={props.blur} type="text"></input>;
            break;
        case "select":
            input = <select onChange={props.change} onFocus={props.onFocus} value={props.value}>
                {props.options.map((item, index) => <option key={index} value={item.value}>{item.displayValue}</option>)}
            </select>;
            break;
        case "checkbox":
            input = <input onChange={props.change} onFocus={props.onFocus} checked={props.value ? 'checked' : ""} type="checkbox"></input>;
            break;
        case "number":
            input = <input onChange={props.change} onFocus={props.onFocus} value={props.value} type="number"></input>;
            break;
        default:
            return <input/>;
    }

    const checkBoxItem = (
        <div className="FormGroupInRowsCheckbox">
            <div className="mr-2">
                {input}
            </div>
            <div>
                <label>
                    {props.labelText}
                    {props.infoText && <i onMouseOver={showInfoHandler} onMouseLeave={hideInfoHandler} className="fa fa-question-circle ml-2"></i>}
                </label>
            </div>
            {showInfo && props.infoText && (
                <div style={showInfoStyle}>{props.infoText}</div>
            )}
        </div>
    )

    return (

        <React.Fragment>
            {props.type === "checkbox" ? checkBoxItem :
                <div className="FormGroupInRows">
                    {props.labelText && <div className={props.labelClass ? props.labelClass : ""}>
                        <label style={props.inputClass ? { float: "right" } : {}}>
                            {props.labelText}
                            {props.infoText && <i onMouseOver={showInfoHandler} onMouseLeave={hideInfoHandler} className="fa fa-question-circle ml-2"></i>}
                        </label>
                    </div>}
                    {
                        props.imgPreview &&
                        <img className="ImagePreview" src={props.imgPreview}/>
                    }
                    <div className="ProductsInput">
                        
                        {input}
                        {props.isLoading && <LoadingSpinner
                            containerStyle={{ height: "auto", width: "auto", marginLeft: 5 }}
                            loaderStyle={{borderWidth: "6px", width: 30, height: 30}}
                        />}
                        {props.showDelete && <i onClick={props.onDelete} className="fa fa-remove ml-2"></i>}
                    </div>
                    {
                        //props.touched && !props.valid && !props.focus &&
                        props.errorMessage &&
                        <div className="ErrorMessageContainer">
                            <div className="errorShown">
                                {props.errorMessage}
                            </div>
                        </div>
                    }
                    {showInfo && props.infoText && (
                        <div style={showInfoStyle}>{props.infoText}</div>
                    )}
                </div>
            }
        </React.Fragment>
    );
}

export default FormGroupInRows;