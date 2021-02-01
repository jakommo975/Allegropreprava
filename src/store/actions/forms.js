import {checkValidity} from '../../utils/formValidation';

export const SET_BANNER_FORM_VALUE = "SET_BANNER_FORM_VALUE";
export const SET_ITEM_FORM_VALUE = "SET_ITEM_FORM_VALUE";
export const FOCUS_LOST = "FOCUS_LOST";
export const FOCUS = "FOCUS";

export const RESTART_ITEM_FORM = "RESTART_ITEM_FORM";
export const INIT_ITEM_FORM = "INIT_ITEM_FORM";

export const INIT_BANNER_FORM = "SET_BANNER_FORM";
export const CHECH_PRESAVE_VALIDITY = "CHECH_PRESAVE_VALIDITY";


export const initBannerForm = () => {
    return async dispatch => {
        try {
            const response = await fetch("https://banners-7f144.firebaseio.com/categories.json");
            if (!(response).ok){
                throw new Error("Something went wrong");
            }
            const resData = await response.json();
            dispatch({
                type: INIT_BANNER_FORM,
                data: resData
            })
        } catch(err) {
            alert(err.message);
        }
    };
}


export const saveBannerForm = () => {
    return async (dispatch, getState) => {
        const bannerForm = getState().forms.bannerForm;
        const bannerDetails = {}
        for (let key in bannerForm){
            let validationCheck = checkValidity(bannerForm[key].value, bannerForm[key].validation);
            if (!validationCheck.valid){
                dispatch();
            }
            bannerDetails[key] = bannerForm[key].value;
        }
        const items = getState().grid.items;
        bannerDetails['items'] = items;
        try {
            
            const response = await fetch(
                    "https://banners-7f144.firebaseio.com/banners.json",
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'aplication.json'
                        },
                        body: JSON.stringify(bannerDetails)
                    }
                );
            if (!(response).ok){
                throw new Error("Something went wrong");
            }
            const resData = await response.json();
            //console.log(resData);
        } catch(err) {
            alert(err.message);
        }
    }
}
