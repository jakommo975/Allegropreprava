import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './EditItemForm.css';
import FormGroupInRows from '../../Forms/FormGroups/FormGroupInRows';
import * as gridActions from '../../../store/actions/grid';
import * as formActions from '../../../store/actions/forms';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import PictureInput from '../Inputs/PictureInput';
import Product from '../../../models/product';
import { Category } from '../../../models/category';
import { isDev } from '../../../utils/utils';




const EditItemForm = (props) => {
    let availableSubCatsURL = "";
    if (process.env.NODE_ENV === "production"){
        availableSubCatsURL = "/Admin/Banner/AvailableSubcategories";
    } else {
        availableSubCatsURL = "https://banners-7f144.firebaseio.com/subcategories.json";
    }
    const dispatch = useDispatch();
    const chosenItemId = useSelector(state => state.grid.currentItemId);
    const chosenItem = useSelector(state => state.grid.items.find((item) => item.id === chosenItemId));
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({});

    const [areSubCatsLoading, setAreSubCatsLoading] = useState(true);
    const [avaiLableSubcategories, setAvaiLableSubcategories] = useState([]);

    const getAvailableSubcategories = useCallback(async () => {
        setIsLoading(true);
        let selectedCategoryId = document.getElementById("SelectedCategoryId").value;
        try {
            const response = await fetch(`${availableSubCatsURL}?categoryId=${selectedCategoryId.toString()}`);
            const resData = await response.json();
            let options = [];
            for (let i =0; i < resData.length; i++){
                options.push({
                    value: resData[i].id,
                    displayValue: resData[i].name
                });
            }
            setAvaiLableSubcategories(options);
            setForm(prev => {
                return {
                    ...prev,
                    subCategory: options[0].value
                }
            });
            setIsLoading(false);
        } catch (error){
            console.log(error.message);
        }
    })


    /*
    useEffect(() => {
        getAvailableSubcategories();
    }, []);
    */

    // Initialize the form
    useEffect(() => {
        let products;
        if (chosenItem.products.length === 0){
            products = [new Product("")];
        }
        else {
            products = chosenItem.products.map(product => new Product(
                product.id, 
                product.imgUrl, 
                product.name, 
                product.price, 
                product.purchasesCount,
                product.isChecking,
                product.exists,
                product.checked
            ));
        }
        let categories;
        if (chosenItem.categories.length === 0){
            categories = [new Category("")];
        }
        else {
            categories = chosenItem.categories.map(cat => new Category(
                cat.id, 
                cat.name,
                cat.isChecking,
                cat.exists,
                cat.checked
            ));
        }
        if (chosenItem) {
            setForm(prev => {
                return {
                    type: chosenItem.type ? chosenItem.type : "Image",
                    imgUrl: chosenItem.imgUrl,
                    subCategory: chosenItem.subCategory ? chosenItem.subCategory : "58",
                    products: products,
                    productsOrientation: chosenItem.productsOrientation ? chosenItem.productsOrientation : "vertical",
                    categories: categories,
                    filters: chosenItem.filters,
                    bannerCategory: chosenItem.bannerCategory,
                    categoriesName: chosenItem.categoriesName
                };
            });
        }
    }, [chosenItem]);


    const uploadFile = async (file) => {
        if (!file){
            return;
        };
        setIsLoading(true);
        let formData = new FormData();
        formData.append("qqfilename", file.name);
        formData.append("qqfile", file);
        formData.append("isItemPicture", true);
        let imgUrl = "";
        
        try {
            const response = await fetch("/Admin/Picture/AsyncUpload",
                {
                    method: "POST",
                    body: formData
                }
            );
            if (!(response).ok) {
                //throw new Error("Something went wrong");
            }
            const resData = await response.json();
            console.log(resData);
            imgUrl = "https://cdn.pixabay.com/photo/2020/09/01/06/10/lake-5534341_1280.jpg";
            if (process.env.NODE_ENV === "production" && resData.success){
                imgUrl = resData.imageUrl;
            }
            setForm(prev => {
                return {
                    ...prev,
                    imgUrl: imgUrl
                }
            });
            setIsLoading(false);
        } catch (err) {
            if (process.env.NODE_ENV === "production"){
                dispatch({
                    type: gridActions.SET_EDIT_MODAL_OPEN,
                    isOpen: false
                });
                dispatch({
                    type: gridActions.SET_ERROR,
                    errorMessage: "There is a problem with connecting to server."
                });
                return;
            }
            imgUrl = "https://cdn.pixabay.com/photo/2020/09/01/06/10/lake-5534341_1280.jpg";
            setForm(prev => {
                return {
                    ...prev,
                    imgUrl: imgUrl
                }
            });
            setIsLoading(false);
        }


    }


    const inputChangeHandler = (propertyName, e) => {
        let value = e.target.value;
        if (e.target.type === "file") {
            let file = e.target.files[0];
            uploadFile(file);
        } else {
            setForm(prev => {
                return {
                    ...prev,
                    [propertyName]: value
                }
            });
        }
    }

    const productIdsChangeHandler = (index, e) => {
        let val = e.target.value;
        setForm(prev => {
            let newProducts = [...prev.products];
            newProducts[index].id = val;;
            return {
                ...prev,
                products: newProducts
            };
        });
    }

    const productNameChangeHandler = (index, e) => {
        let val = e.target.value;
        setForm(prev => {
            let newProducts = [...prev.products];
            newProducts[index].name = val;
            return {
                ...prev,
                products: newProducts
            };
        });
    }

    const deleteProductHandler = (chosenIndex) => {
        if (form.products.length < 2) {
            return;
        }
        setForm(prev => {
            let newProducts = prev.products.filter((item, index) => index !== chosenIndex);
            return {
                ...prev,
                products: newProducts
            }
        });
    }

    const addProductInputHandler = () => {
        setForm(prev => {
            let newProducts = [...prev.products]
            newProducts.push(new Product(""));
            return {
                ...prev,
                products: newProducts
            }
        });
    }


    let productInput = null;

    if (chosenItem && form.products) {
        productInput = (
            <React.Fragment>
                <div style={{marginBottom: 5}}>
                    <label>Products</label> 
                </div>
                {
                    form.products.map((product, index) => {
                        let existClass = "";
                        if (product.checked && product.exists){
                            existClass = "SuccessProduct";
                        }
                        if (product.checked && !product.exists){
                            existClass = "FailProduct";
                        }
                        return (
                            <div className="ProductInputsWrapper">
                                <div  className={`ProductInputsBox ${existClass}`}>
                                    {/* <FormGroupInRows
                                        showLabel={true}
                                        showLoading={false}
                                        key={index}
                                        isLoading={product.isChecking}
                                        errorMessage={!product.exists && "Product does not exist!"}
                                        labelText={"ID"}
                                        type="text"
                                        blur={(e) => {checkProductId(e.target.value, index)}}
                                        value={form.products[index].id}
                                        onDelete={deleteProductHandler.bind(this, index)}
                                        change={productIdsChangeHandler.bind(this, index)}
                                    /> */}
                                    <div style={{width: "100%"}}>
                                        <div className={"InputContainer"}>
                                            <label>ID:</label>
                                            <input onChange={productIdsChangeHandler.bind(this, index)} value={product.id} type="text"/>
                                        </div>
                                        <div className={"InputContainer"}>
                                            <label>Name:</label>
                                            <input onChange={productNameChangeHandler.bind(this, index)} type="text" value={product.name}/>
                                        </div>
                                        <div className="messageShown" style={{width: "100%", textAlign: "center", color: product.checked && !product.exists ? "red" : "green"}}>
                                            {product.checked && !product.exists && "Product does not exist!"}
                                            {product.checked && product.exists && "Product exists!"}
                                        </div>
                                    </div>
                                     {
                                         product.isChecking && <LoadingSpinner 
                                            containerStyle={{width: "100%", height: "100%", position: "absolute", top: 0, left: 0, background: "rgba(255,255,255,0.7)"}}
                                            loaderStyle={{width: 44, height: 44}}
                                        />
                                     }
                                    
                                </div>
                                <div className="ProductInputButtonContainer">
                                    <button disabled={!product.id || !product.name} onClick={(e) => {e.preventDefault(); checkProductId(product.id, product.name, index)}}>Check</button>
                                    <button onClick={deleteProductHandler.bind(this, index)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="PlusButtonContainer">
                    <i onClick={addProductInputHandler} className="fa fa-plus-circle ml-1"></i>
                </div>
            </React.Fragment>
        )
    }


    const deleteCategoryHandler = (chosenIndex) => {
        if (form.categories < 2) {
            return;
        }
        setForm(prev => {
            let newProducts = prev.categories.filter((item, index) => index !== chosenIndex);
            return {
                ...prev,
                categories: newProducts
            }
        });
    }

    const addCategoryInputHandler = () => {
        setForm(prev => {
            let newCategories = [...prev.categories]
            newCategories.push(new Category(""));
            return {
                ...prev,
                categories: newCategories
            }
        });
    }

    const categoriesIdsChangeHandler = (index, e) => {
        let newCategory = new Category(e.target.value);
        setForm(prev => {
            let newCategories = [...prev.categories];
            newCategories[index] = newCategory;
            return {
                ...prev,
                categories: newCategories
            };
        });
    }
    let categoriesInputs = null;
    if (chosenItem && form.categories) {
        categoriesInputs = (
            <React.Fragment>
                {
                    form.categories.map((category, index) => {
                        return (
                            <div key={index}>
                                <FormGroupInRows
                                    showDelete={true}
                                    showLabel={true}
                                    isLoading={category.isChecking}
                                    errorMessage={!category.exists && "Category does not exist!"}
                                    key={index}
                                    blur={(e) => {checkCategoryId(e.target.value, index)}}
                                    labelText={index === 0 ? "Categories IDs" : ""}
                                    type="text"
                                    value={form.categories[index].id}
                                    onDelete={deleteCategoryHandler.bind(this, index)}
                                    change={categoriesIdsChangeHandler.bind(this, index)}
                                />
                            </div>
                        )
                    })
                }
                <div className="PlusButtonContainer">
                    <i onClick={addCategoryInputHandler} className="fa fa-plus-circle ml-1"></i>
                </div>
            </React.Fragment>
            
        )
    }


    const checkProductId = async (prodId, prodName, prodIndex) => {
        if (!prodId){
            return;
        }
        setForm(prev => {
            return {
                ...prev,
                products: prev.products.map((product, index) => {
                    if (index === prodIndex){
                        let loadingProduct = new Product(product.id);
                        loadingProduct.name = prodName;
                        loadingProduct.isChecking = true;
                        return loadingProduct;
                    } else {
                        return product;
                    }
                })
            }
        });
        
        let url = `/Admin/Banner/ExistAllegroProducts?productId=${prodId}&productName=${prodName}`;
        if (isDev()) {
            url = `http://localhost:55390/Test/ExistAllegroProducts?productId=${prodId}&productName=${prodName}`;
        }
        try {
            const response = await fetch(url);
            const resData = await response.json();
            if (resData){
                let product = new Product(prodId);
                product.price = resData.Price;
                product.name = resData.Name;
                product.purchasesCount = resData.PurchasesCount;
                product.imgUrl = resData.Image;
                product.isChecking = false;
                product.checked = true;
                product.exists = true;
                setForm(prev => {
                    return {
                        ...prev,
                        products: prev.products.map(prevProduct => {
                            if (prevProduct.id === prodId){
                                return product;
                            } else {
                                return prevProduct;
                            }
                        })
                    }
                });
            } else {
                setForm(prev => {
                    return {
                        ...prev,
                        products: prev.products.map(product => {
                            if (product.id === prodId){
                                let loadingProduct = new Product(product.id);
                                loadingProduct.name = prodName;
                                loadingProduct.isChecking = false;
                                loadingProduct.exists = false;
                                loadingProduct.checked = true;
                                return loadingProduct;
                            } else {
                                return product;
                            }
                        })
                    }
                });
            }
        } catch (e){
            dispatch({
                type: gridActions.SET_EDIT_MODAL_OPEN,
                isOpen: false
            });
            dispatch({
                type: gridActions.SET_ERROR,
                errorMessage: "There is a problem with connecting to server. Contact admin or try again later."
            });
            return;
        }
    }

    const checkCategoryId = async (catId, catIndex) => {
        if (!catId){
            return;
        }
        setForm(prev => {
            return {
                ...prev,
                categories: prev.categories.map((category, index) => {
                    if (index === catIndex){
                        let loadingCategory = new Category(category.id);
                        loadingCategory.isChecking = true;
                        return loadingCategory;
                    } else {
                        return category;
                    }
                })
            }
        });
        
        let url = `/Admin/Banner/ExistAllegroCategory?categoryId=${catId}`;
        if (isDev()) {
            url = `https://banners-7f144.firebaseio.com/subcategories/${catId}.json`;
        }
        try {
            const response = await fetch(url);
            const resData = await response.json();
            if (resData){
                let category = new Category(catId);
                category.name = resData.Name;
                category.isChecking = false;
                category.checked = true;
                category.exists = true;
                setForm(prev => {
                    return {
                        ...prev,
                        categories: prev.categories.map(prevCategory => {
                            if (prevCategory.id === catId){
                                return category;
                            } else {
                                return prevCategory;
                            }
                        })
                    }
                });
            } else {
                setForm(prev => {
                    return {
                        ...prev,
                        categories: prev.categories.map(category => {
                            if (category.id === catId){
                                let loadingCategory = new Category(category.id);
                                loadingCategory.isChecking = false;
                                loadingCategory.exists = false;
                                loadingCategory.checked = true;
                                return loadingCategory;
                            } else {
                                return category;
                            }
                        })
                    }
                });
            }
        } catch (e){
            dispatch({
                type: gridActions.SET_EDIT_MODAL_OPEN,
                isOpen: false
            });
            dispatch({
                type: gridActions.SET_ERROR,
                errorMessage: "There is a problem with connecting to server. Contact admin or try again later."
            });
            return;
        }
    }

    const saveHandler = async () => {
        let products = [];
        if (form.type === "Products"){
            // Extract onlinputs where id is not empty string
            products = form.products.filter(product => product.exists);
        }

        let categories = [];
        if (form.type === "Categories"){
            // Extract only inputs where id is not empty string
            categories = form.categories.filter(category => category.exists);
        }
        dispatch({
            type: gridActions.SET_ITEM_PROPERTIES,
            data: {
                type: form.type,
                imgUrl: form.imgUrl,
                products: products,
                subCategory: form.subCategory,
                productsOrientation: form.productsOrientation,
                categories: categories,
                filters: form.filters,
                bannerCategory: form.bannerCategory,
                categoriesName: form.categoriesName
            }
        });
        dispatch({
            type: gridActions.SET_EDIT_MODAL_OPEN,
            isOpen: false
        });
    }


    const closeHandler = () => {
        dispatch({
            type: gridActions.SET_EDIT_MODAL_OPEN,
            isOpen: false
        });
        dispatch({
            type: formActions.RESTART_ITEM_FORM
        });
    }

    const removeImageHandler = () => {
        setForm(prev => {
            return {
                ...prev,
                imgUrl: null
            }
        });
    }

    let saveButtonDisabled = false;
    if (isLoading)
        saveButtonDisabled = true;
    if (form.type === "Products"){
        if (form.products && form.products.findIndex(prod => !prod.exists) !== -1){
        saveButtonDisabled = true;
        }
        if (form.products && form.products.findIndex(prod => !prod.checked) !== -1){
            saveButtonDisabled = true;
        }
    }
    if (form.type === "Categories"){
        if (form.categories && form.categories.findIndex(categories => !categories.exists) !== -1){
            saveButtonDisabled = true;
        }
        if (form.categories && form.categories.findIndex(categories => !categories.checked) !== -1){
            saveButtonDisabled = true;
        }
    }
    
    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Edit Item</h3>
            {   isLoading ? 
                <LoadingSpinner/> 
                :
                <div className="InputsContainer">
                    <FormGroupInRows
                        labelText="Type"
                        type="select"
                        value={form.type}
                        change={inputChangeHandler.bind(this, "type")}
                        options={[
                            { value: "Image", displayValue: "Image" },
                            { value: "Products", displayValue: "Products" },
                            { value: "Categories", displayValue: "Categories" },
                            { value: "Banner", displayValue: "Banner" },
                        ]} />
                    {
                        form.type === "Products" &&
                          <React.Fragment>
                             <FormGroupInRows 
                                labelText="Products Orientation"
                                type="select"
                                value={form.productsOrientation}
                                change={inputChangeHandler.bind(this, "productsOrientation")}
                                options={[
                                    { value: "vertical", displayValue: "Vertical" },
                                    { value: "horizontal", displayValue: "Horizontal" }
                                ]}
                            />
                             {productInput}
                            </React.Fragment>
                    }
                    {
                        form.type === "Image" &&
                        <React.Fragment>
                            {
                                <FormGroupInRows
                                labelText="Subcategory ID"
                                type="text"
                                value={form.subCategory}
                                change={inputChangeHandler.bind(this, "subCategory")}
                            />}
                            <FormGroupInRows
                                labelText="Filters"
                                type="text"
                                value={form.filters ?? ""}
                                change={inputChangeHandler.bind(this, "filters")}
                            />
                            <PictureInput
                                labelText="Image"
                                imgPreviewUrl={form.imgUrl}
                                type="file"
                                isLoading={isLoading}
                                removePicture={removeImageHandler}
                                fileSelected={inputChangeHandler.bind(this, "imgUrl")}
                            />
                        </React.Fragment>
                    }
                    {
                        form.type === "Categories" &&
                          <React.Fragment>
                            <FormGroupInRows
                                labelText="Name"
                                type="text"
                                value={form.categoriesName}
                                change={inputChangeHandler.bind(this, "categoriesName")}
                            />
                             {categoriesInputs}
                            </React.Fragment>
                    }
                    {
                        form.type === "Banner" &&
                        <React.Fragment>
                            {
                                <FormGroupInRows
                                labelText="Category ID"
                                type="text"
                                value={form.bannerCategory}
                                change={inputChangeHandler.bind(this, "bannerCategory")}
                            />}
                            <PictureInput
                                labelText="Image"
                                imgPreviewUrl={form.imgUrl}
                                type="file"
                                isLoading={isLoading}
                                removePicture={removeImageHandler}
                                fileSelected={inputChangeHandler.bind(this, "imgUrl")}
                            />
                        </React.Fragment>
                    }
                </div>
            }

            <div className="ButtonContainer">
                <button disabled={saveButtonDisabled} onClick={saveHandler}>Save</button>
                <button onClick={closeHandler}>Close</button>
            </div>
        </div>
    );
}

export default EditItemForm;


