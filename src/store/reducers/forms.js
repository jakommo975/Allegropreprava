import * as actionTypes from '../actions/forms';
import {bannerForm} from '../formConfig';
import { checkValidity } from '../../utils/formValidation';

const initialState = {
    bannerForm: bannerForm,
    categories: [{value: "elektronika", displayValue: "Elektronika"}]
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_BANNER_FORM_VALUE:{
            const validation = state.bannerForm[action.inputIdentifier].validation;
            let validationCheck = checkValidity(action.value, validation);
            return {
                ...state,
                bannerForm: {
                    ...state.bannerForm,
                    [action.inputIdentifier]: {
                        ...state.bannerForm[action.inputIdentifier],
                        value: action.value,
                        touched: true,
                        valid: validationCheck.valid,
                        errorMessage: validationCheck.errorMessage
                    }
                }
            }
        }
        case actionTypes.FOCUS:
            return {
                ...state,
                bannerForm: {
                    ...state.bannerForm,
                    [action.inputIdentifier]: {
                        ...state.bannerForm[action.inputIdentifier],
                        focused: action.focused,
                    }
                }
            }
        case actionTypes.INIT_ITEM_FORM:
            return {
                ...state,
                itemForm:{
                    type: action.data.type,
                    imgSrc: action.data.imgSrc,
                }
            }
        case actionTypes.INIT_BANNER_FORM:
            return {
                ...state,
                bannerForm: {
                    ...state.bannerForm,
                    category: {
                        ...state.bannerForm.category,
                        options: action.data,
                        value: action.data[0].value
                    }
                }
            }
        default:
        return state;
    }
}

export default reducer;