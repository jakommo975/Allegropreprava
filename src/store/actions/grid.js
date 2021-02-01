import { Category } from '../../models/category';
import {isDev} from '../../utils/utils'

export const DIVIDE_HORIZONTALLY = "DIVIDE_HORIZONTALLY";
export const DIVIDE_VERTICALLY = "DIVIDE_VERTICALLY";
export const DELETE_ITEM = "DELETE_ITEM";
export const ADD_ITEM = "ADD_ITEM";
export const SAVE_LAYOUT = "SAVE_LAYOUT";
export const SET_ITEM_PROPERTIES = "SET_ITEM_PROPERTIES";

export const SET_ERROR = "SET_ERROR";
export const SET_EDIT_MODAL_OPEN = "SET_EDIT_MODAL_OPEN";
export const SET_FORM_VALUE = "SET_FORM_VALUE";
export const INIT_ITEMS = "INIT_ITEMS";






export const initBannerItems = (bannerId) => {
    let initItemsUrl = "https://banners-7f144.firebaseio.com/items.json";
    if (!isDev()){
        initItemsUrl = `/Admin/Banner/BannerItems?bannerId=${bannerId}`;
    }
    return async dispatch => {
        try {
            const response = await fetch(initItemsUrl);
            if (!(response).ok){
                throw new Error("Something went wrong");
            }
            const resData = await response.json();
            console.log(resData)
            for (let i = 0; i < resData.length; i++){
                console.log(resData[i].categories)
                if (resData[i].categories){
                    console.log("inside");
                    let initCategoriesUrl = "/Admin/Banner/ExistAllegroCategory";
                    let categories = [];
                    for (let j =0; j < resData[i].categories.length; j++){
                        const catResponse = await fetch(`${initCategoriesUrl}?categoryId=${resData[i].categories[j]}`);
                        if (!(catResponse).ok){
                            throw new Error("Something went wrong");
                        }
                        const catResData = await catResponse.json();
                        categories.push(new Category(catResData.Id, catResData.Name))
                    }
                    resData[i].categories = categories;
                }
            }
            
            console.log(resData)
            dispatch({
                type: INIT_ITEMS,
                data: resData
            })
        } catch(err) {
            console.log((err.message));
        }
    };
}
