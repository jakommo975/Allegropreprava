import * as actionTypes from '../actions/grid';
import initLayout from '../../data/initialLayout';
import Item from '../../models/item';
import Product from '../../models/product';
import { Category } from '../../models/category';

const initialState = {
    items: initLayout,
    undoStack: [initLayout],
    errorMessage: null,
    editModalIsOpen: false,
    contextMenuIsOpen: false,
    currentItemId: null
};

const divideHorizontally = (id, items) => {
    let chosenItem = items.find((item) => item.id === id);
    if (chosenItem.h < 2){
        return null;
    }
    let highestId = items.sort((a, b) => {return a.id < b.id ? 1 : -1})[0].id;
    let newItems = items.filter((item) => item.id !== id);
    newItems.push(new Item(
        highestId + 1,
        chosenItem.x,
        chosenItem.y + Math.floor(chosenItem.h / 2),
        chosenItem.w,
        Math.ceil(chosenItem.h / 2),
    ));
    highestId = newItems.sort((a, b) => {return a.id < b.id ? 1 : -1})[0].id;
    newItems.push(new Item(
        highestId + 1,
        chosenItem.x,
        chosenItem.y,
        chosenItem.w,
        Math.floor(chosenItem.h / 2),
    ));
    return newItems;
}

const divideVertically = (id, items) => {
    let chosenItem = items.find((item) => item.id === id);
    if (chosenItem.w < 2){
        return null;
    }
    let highestId = items.sort((a, b) => {return a.id < b.id ? 1 : -1})[0].id;
    let newItems = items.filter((item) => item.id !== id);
    newItems.push(new Item(
            highestId + 1,
            chosenItem.x + Math.floor(chosenItem.w / 2),
            chosenItem.y,
            Math.ceil(chosenItem.w / 2),
            chosenItem.h
        ));
    highestId = newItems.sort((a, b) => {return a.id < b.id ? 1 : -1})[0].id;
    newItems.push(new Item(
        highestId + 1,
        chosenItem.x,
        chosenItem.y,
        Math.floor(chosenItem.w / 2),
        chosenItem.h
    ));
    return newItems;
}

const createItems = (items) => {
    let newItems = items;
    let highestId = newItems.sort((a, b) => {return a.id < b.id ? 1 : -1})[0].id;
    let itemsWithX0 = newItems.filter((item) => item.x === 0);
    let newItem;
    if (itemsWithX0.length === 0){
        newItem = new Item(highestId+1,0,0,1,1);
    } else {
        let newY = 0;
        itemsWithX0.forEach(item => {
            if (item.y >= newY){
                newY = item.y + item.h;
            }
        });
        newItem = new Item(highestId + 1, 0, newY, 1, 1);
    }
    newItems.push(newItem);
    return newItems;
}



const reducer = (state = initialState, action) => {
    let newItems;
    let errorMessage;
    switch(action.type){
        case actionTypes.ADD_ITEM:
            // newItems = [...state.items];
            // let highestId = newItems.sort((a, b) => {return a.id < b.id ? 1 : -1})[0].id;
            // let newItem = new Item(highestId+1,0,0,1,1);
            // newItems.push(newItem);
            newItems = createItems([...state.items]);
            return {
                ...state,
                items: newItems
            }
        case actionTypes.DELETE_ITEM:
            if (state.items.length < 2){
                return {
                    ...state,
                    errorMessage: "Last item cannot be deleted."
                }
            }
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.id)
            }
        case actionTypes.DIVIDE_HORIZONTALLY:
            newItems = divideHorizontally(action.id, [...state.items]);
            errorMessage = null;
            if (!newItems){
                errorMessage = "Item reached minimum height."
                return {
                    ...state,
                    errorMessage: errorMessage
                }
            }
            return {
                ...state,
                items: newItems,
            }
        case actionTypes.DIVIDE_VERTICALLY:
            newItems = divideVertically(action.id, [...state.items]);
            errorMessage = null;
            if (!newItems){
                errorMessage = "Item reached minimum width."
                return {
                    ...state,
                    errorMessage: errorMessage
                }
            }
            return {
                ...state,
                items: newItems,
            }
        case actionTypes.SET_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        case actionTypes.SAVE_LAYOUT:
            return{
                ...state,
                items: action.items
            }
        case actionTypes.SET_EDIT_MODAL_OPEN:
            return {
                ...state,
                editModalIsOpen: action.isOpen,
                currentItemId: action.currentItemId
            }

        case actionTypes.SET_ITEM_PROPERTIES:
            newItems = [...state.items];
            let item = {...newItems.find((item) => item.id === state.currentItemId)};
            let indexOf = newItems.indexOf(newItems.find((item) => item.id === state.currentItemId));
            item.imgUrl = action.data.imgUrl;
            item.type = action.data.type;
            item.products = action.data.products;
            item.subCategory = action.data.subCategory;
            item.productsOrientation = action.data.productsOrientation;
            item.categories = action.data.categories;
            item.filters = action.data.filters;
            item.bannerCategory = action.data.bannerCategory;
            item.categoriesName = action.data.categoriesName;
            newItems[indexOf] = item;
            return {
                ...state,
                items: newItems
            }
        
            case actionTypes.INIT_ITEMS:
                let inittialItems = [];
                action.data.forEach(item => {
                    let theItem = new Item(parseInt(item.id), parseInt(item.x), parseInt(item.y), parseInt(item.w), parseInt(item.h));
                    theItem.serverId = item.id;
                    if (item.imgUrl && !item.bannerCategory){
                        theItem.type = "Image";
                        theItem.imgUrl = item.imgUrl;
                        theItem.filters = item.filters;
                    }
                    if (item.subCategory){
                        theItem.subCategory = item.subCategory;
                        theItem.type = "Image";
                    }
                    if (item.products){
                        theItem.type = "Products";
                        theItem.products = item.products.map(prod => new Product(
                            prod.allegroProductId,
                            prod.imageUrl,
                            prod.name,
                            prod.price,
                            prod.purchasesCount,
                            false,
                            true,
                            true
                        ));
                    }
                    if (item.productsOrientation){
                        theItem.productsOrientation = item.productsOrientation;
                    }
                    if (item.categories){
                        theItem.type = "Categories";
                        theItem.categories = item.categories;
                        theItem.categoriesName = item.categoriesName;
                    }
                    if (item.filters){
                        theItem.filters = item.filters;
                    }
                    if (item.bannerCategory){
                        theItem.type = "Banner";
                        theItem.bannerCategory = item.bannerCategory;
                        theItem.imgUrl = item.imgUrl;
                    }
                    inittialItems.push(theItem);
                })
                return {
                    ...state,
                    items: inittialItems
                }

        default:
            return state;
    }
}

export default reducer;