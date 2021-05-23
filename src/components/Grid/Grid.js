import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import GridLayout from 'react-grid-layout';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import './Grid.css';
import { useSelector, useDispatch } from 'react-redux';

import Item from '../../models/item';
import Sizes from '../../constants/sizes';
import {Scree} from '../../constants/sizes';


import * as actions from '../../store/actions/grid';
import ErrorModal from '../Modals/ErrorModal/ErrorModal';
import EditItemModal from '../Modals/EditItemModal/EditItemModal';
import ControlBar from './ControlBar';
import ProductSlider from '../ProductSLider/ProductSlider';
import CategoriesComponent from '../CategoriesComponent/CategoriesComponent';
import SubmitInputs from './SubmitInputs';
import { isDev } from '../../utils/utils';
import ScreenSizeButton from '../UI/ScreenSizeButton/ScreenSizeButton';


const Grid = (props) => {
    const items = useSelector(state => state.grid.items);
    const currentScreenSize = useSelector(state => state.currentScreenSize);
    const currentScreenDefinition = Sizes.filter(definition => definition.name === currentScreenSize)[0];

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const contextMenuItemId = useRef();
    const layout = useRef();
    const style = useRef();

    const canBannerBePublished = () => {
        let highestY = 0;
        let usedArea = 0;
        items.forEach((item) => {
            if (item.y + item.h > highestY){
                highestY = item.y + item.h;
            }
            usedArea += (item.h) * (item.w);
        });
        let wholeArea = Sizes.NUMBER_OF_COLUMNS * highestY;
        // Check wether there is a blank sapce in the grid
        if (wholeArea > usedArea){
            return false;
        }
        for (let i = 0; i < items.length; i++){
            // Checking from empty items
            if (items[i].type === "Image" && !items[i].imgUrl){
                return false;
            }
            if (items[i].type === "Products" && !items[i].products === 0){
                return false;
            }
            if (!items[i].type){
                return false;
            }
        }
        return true;
    }

    const submitBannerHandler = (e) => {
        if (!isDev()){
            let nameValue = document.getElementsByName("Name")[0].value;
            if (!nameValue){
                e.preventDefault();
                dispatch({
                    type: actions.SET_ERROR,
                    errorMessage: "Banner Name cannot be empty."
                });
                return
            }
        }
        let isPublishedChecked = true;
        if (!isDev()){
            isPublishedChecked = document.getElementById("Published").checked;
        }
        if (!canBannerBePublished() && isPublishedChecked){
            e.preventDefault();
            dispatch({
                type: actions.SET_ERROR,
                errorMessage: "Banner cannot be published if there is a blank space or blank item in the grid."
            });
        }
    }

    useEffect(() => {
        let saveButton = document.getElementsByName("save")[0];
        let saveContinueButton = document.getElementsByName("save-continue")[0];
        saveButton.addEventListener("click", submitBannerHandler);
        saveContinueButton.addEventListener("click", submitBannerHandler);
        return () => {
            saveButton.removeEventListener("click", submitBannerHandler);
            saveContinueButton.removeEventListener("click", submitBannerHandler);
        }
    }, [items]);


    let menuBgStyle = {
        position: 'absolute',
        top: '0px',
        left: '0px',
        backgorundColor: 'transparent',
        width: window.innerWidth - 10,
        height: window.innerHeight,
        zIndex: '1'
    };

    const divideVertically = (id) => {
        dispatch({
            type: actions.DIVIDE_VERTICALLY,
            id: id
        });
        setShowMenu(false);
    }

    const divideHorizontally = (id) => {
        dispatch({
            type: actions.DIVIDE_HORIZONTALLY,
            id: id
        });
        setShowMenu(false);
    }

    const handleContextMenu = (id, e) => {
        
        e.preventDefault();
        style.current = {
            position: "absolute",
            left: `${e.pageX}px`,
            top: `${e.pageY}px`,
            zIndex: 10
        };
        contextMenuItemId.current = id;
        setShowMenu(true);

    }

    const deleteItem = (id) => {
        dispatch({
            type: actions.DELETE_ITEM,
            id: id
        });
        setShowMenu(false);
    }

    const handleBgContextMenu = (e) => {
        e.preventDefault();
        setShowMenu(false);
    }

    const layoutChangeHandler = (e) => {
        let shouldDispatch = false;

        // Checking if any grid element has changed, so that we know wether rerendering is needed
        // as well as saving new layout as our items
        layout.current = e;
        let newItems = [...items];
        e.forEach((element) => {
            let el = {...newItems.find((item) => item.i == element.i)};
            let eloriginal = newItems.find((item) => item.i == element.i);
            let indexOf = items.indexOf(eloriginal);
            if (el) {
                if (el.x != element.x || el.y != element.y || el.w != element.w || el.h != element.h) {
                    shouldDispatch = true;
                }
                el.x = element.x;
                el.y = element.y;
                el.w = element.w;
                el.h = element.h;
                newItems[indexOf] = el;
            } else {
                console.log("layout here");
                newItems.push(new Item(parseInt(element.i), element.x, element.y, element.w, element.h));
            }
        });
        //let newItems = e.map((item) => new Item(parseInt(item.i), item.x, item.y, item.w, item.h))
        if (shouldDispatch) {
            dispatch({
                type: actions.SAVE_LAYOUT,
                items: newItems
            })
        }


    }

    const editItemClickHandler = () => {
        dispatch({
            type: actions.SET_EDIT_MODAL_OPEN,
            isOpen: true,
            currentItemId: contextMenuItemId.current
        });
        setShowMenu(false);
    }


    // condition for enabling dividing item in context menu 
    // if item is not blank, it cannot be divided
    let currentItem = items.find(item => item.id === contextMenuItemId.current);
    let isItemBlank = true;
    if (currentItem && (currentItem.imgUrl || currentItem.products.length > 0)){
        isItemBlank = false;
        console.log("Item is not blank");
    }

    const changeScreenSize = (screenSize) => {
        dispatch({
            type: "SCREEN_CHANGE",
            screenSize: screenSize
        })
    }

    const getNumberOfColumns = () => {
        return currentScreenDefinition.CONTAINER_WIDTH / 74;
    }


    return (
        <div className="ContentContainer">
            <ErrorModal />
            <EditItemModal />
            
            <div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <h4 className="GridHeader" style={{ marginLeft: 30, marginBottom: 6}}>Edit Layout</h4>
                    <div>
                        {process.env.NODE_ENV === "development" && <button className="btn btn-primary mr-2" name="save" >Save</button>}
                        {process.env.NODE_ENV === "development" && <button className="btn btn-primary" name="save-continue" >Save and continue edit</button>}
                        {process.env.NODE_ENV === "development" && <input value="63" type="hidden" id="SelectedCategoryId"/>}
                    </div>
                </div>
                <div style={{ width: currentScreenDefinition.CONTAINER_WIDTH, marginLeft: 30, marginRight: "auto", backgroundColor: "#fff" }}>
                    <ControlBar />
                    <GridLayout className="layout"
                        style={{}}
                        onLayoutChange={layoutChangeHandler}
                        autoSize={true}
                        cols={getNumberOfColumns()}
                        rows={currentScreenDefinition.NUMBER_OF_ROWS}
                        rowHeight={currentScreenDefinition.ROW_HEIGHT}
                        width={currentScreenDefinition.CONTAINER_WIDTH}
                        onDragStop={layoutChangeHandler}
                    >
                        {
                            items.map((item) => {
                                return (
                                    <div
                                        key={item.i}
                                        id={item.id}
                                        data-grid={{
                                            x: item.x,
                                            y: item.y,
                                            w: item.w,
                                            h: item.h
                                        }}>
                                        <div style={{ width: '100%', height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderStyle: "solid", borderColor: "#ddd" }}
                                            onContextMenu={handleContextMenu.bind(this, item.id)}
                                        >
                                            {item.type === "Products" && <ProductSlider orientation={item.productsOrientation} products={item.products} sliderId={item.id}/>}
                                            {item.type === "Categories" && <CategoriesComponent header={item.categoriesName} categories={item.categories}/>}
                                            {item.type === "Image" && item.imgUrl && <img alt="" style={{ width: "100%", height: "100%" }} src={item.imgUrl} />}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </GridLayout>
                    <div onContextMenu={handleBgContextMenu} onClick={() => { setShowMenu(false) }} style={showMenu ? menuBgStyle : {}}></div>
                    <div style={style.current}>
                        {showMenu &&
                            <div className="ContextMenu" >
                                <div className="ContextMenuItem" onClick={editItemClickHandler}>Edit Item</div>
                                {isItemBlank && <div className="ContextMenuItem" onClick={divideHorizontally.bind(this, contextMenuItemId.current)}>Divide Horizontally</div>}
                                {isItemBlank && <div className="ContextMenuItem" onClick={divideVertically.bind(this, contextMenuItemId.current)}>Divide Vertically</div>}
                                <div className="ContextMenuItem" onClick={deleteItem.bind(this, contextMenuItemId.current)}>Delete Item</div>
                            </div>
                        }
                    </div>
                </div>
                    {/*Creating inputs from items properties for submitting the whole form to server*/}
                    <SubmitInputs items={items}/>
                    {
                        Sizes.map(size => (
                            <ScreenSizeButton text={size.name} active={currentScreenSize === size.name} onClick={changeScreenSize.bind(this, size.name)}></ScreenSizeButton>
                        ))
                    }
            </div>
            <div>
                <img src="https://cdn.pixabay.com/photo/2020/09/01/06/10/lake-5534341_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/09/01/06/10/lake-5534341_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/09/01/06/10/lake-5534341_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/09/01/06/10/lake-5534341_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/07/06/09/37/green-5376289_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/07/06/09/37/green-5376289_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/07/06/09/37/green-5376289_1280.jpg"/>
            </div>
            
            <div>
                <img src="https://cdn.pixabay.com/photo/2020/09/01/06/10/lake-5534341_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/09/01/06/10/lake-5534341_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/09/01/06/10/lake-5534341_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/09/01/06/10/lake-5534341_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/07/06/09/37/green-5376289_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/07/06/09/37/green-5376289_1280.jpg"/>
                <img src="https://cdn.pixabay.com/photo/2020/07/06/09/37/green-5376289_1280.jpg"/>
            </div>
        </div>
    )
}


export default Grid;