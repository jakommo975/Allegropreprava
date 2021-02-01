import React, { useState } from 'react';
import './BannerForm.css';
import FormGroupInRows from '../FormGroups/FormGroupInRows';
import { useSelector, useDispatch } from 'react-redux';
import * as formActions from '../../../store/actions/forms';


const BannerForm = (props) => {
    const [loading, setLoading] = useState(false);
    const formState = useSelector(state => state.forms.bannerForm);
    const categories = useSelector(state => state.forms.categories);
    const dispatch = useDispatch();


    const nameChangeHandler = (inputIdentifier ,e) => {
        let value = e.target.value;
        if (e.target.type === "checkbox"){
            value = e.target.checked ? true : false;
        }
        dispatch({
            type: formActions.SET_BANNER_FORM_VALUE,
            inputIdentifier: inputIdentifier,
            value: value
        }); 
    }

    const onBlurHandler = (inputIdentifier, e) => {
        let value = e.target.value.trim();
        dispatch({
            type: formActions.FOCUS,
            inputIdentifier: inputIdentifier,
            focused: false
        });
        if (formState.touched){
            dispatch({
                type: formActions.SET_BANNER_FORM_VALUE,
                inputIdentifier: inputIdentifier,
                value: value,
            });
        }
        
    }

    const onFocusHandler = (inputIdentifier) => {
        dispatch({
            type: formActions.FOCUS,
            inputIdentifier: inputIdentifier,
            focused: true
        });
    }

    const formElementsArray = [];
    for (let key in formState) {
        formElementsArray.push({
            id: key,
            config: formState[key]
        });
    }

    return (
        <React.Fragment>
            <div style={{width: "100%", marginLeft: 30, marginRight: 30}}>
                <h5 style={{ marginBottom: 6}}>Edit Details</h5>
                {loading ? 
                    <div className="BannerFormContainer row justify-content-center py-4">
                        <div className="loader"></div>
                    </div> :
                    <form>
                        <div className="BannerFormContainer">
                            {
                                formElementsArray.map(el => (
                                    <FormGroupInRows
                                        type={el.config.elementConfig.type}
                                        infoText={el.config.elementConfig.infoText}
                                        value={el.config.value}
                                        labelText={el.config.elementConfig.label}
                                        change={nameChangeHandler.bind(this, el.id)} 
                                        key={el.id}
                                        options={el.config.options ? el.config.options : null}
                                        touched={el.config.touched}
                                        valid={el.config.valid}
                                        errorMessage={el.config.errorMessage}
                                        blur={onBlurHandler.bind(this, el.id)}
                                        onFocus={onFocusHandler.bind(this, el.id)}
                                        focus={el.config.focused}
                                    />
                                ))
                            }
                        </div>
                    </form>
                }
            </div> 
        </React.Fragment>
    );
}

export default BannerForm;
