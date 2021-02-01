import React from 'react';

const SubmitInputs = (props) => {
    return (
        <React.Fragment>
            {
                // Creating inputs from items properties for submitting the whole form to server
                props.items.map((item, index) => (
                    <React.Fragment key={index}>
                        <input type="hidden" name={`BannerItemsList[${index}].XPosition`} value={item.x} />
                        <input type="hidden" name={`BannerItemsList[${index}].YPosition`} value={item.y} />
                        <input type="hidden" name={`BannerItemsList[${index}].Width`} value={item.w} />
                        <input type="hidden" name={`BannerItemsList[${index}].Height`} value={item.h} />
                        <input type="hidden" name={`BannerItemsList[${index}].Id`} value={item.serverId ? item.serverId : -1} />
                        {
                            item.type === "Products" &&
                            <React.Fragment>  
                                <input type="hidden" name={`BannerItemsList[${index}].ProductsItem.ProductsOrientation`} value={item.productsOrientation} />
                                {
                                    item.products.map((product, productIndex) => {
                                        if (product)
                                            return <React.Fragment>
                                                <input type="hidden" name={`BannerItemsList[${index}].ProductsItem.BannerItemProductDatasList[${productIndex}].AllegroProductId`} value={product.id} />
                                                <input type="hidden" name={`BannerItemsList[${index}].ProductsItem.BannerItemProductDatasList[${productIndex}].Name`} value={product.name} />
                                                <input type="hidden" name={`BannerItemsList[${index}].ProductsItem.BannerItemProductDatasList[${productIndex}].Image`} value={product.imgUrl} />
                                                <input type="hidden" name={`BannerItemsList[${index}].ProductsItem.BannerItemProductDatasList[${productIndex}].Price`} value={product.price} />
                                                <input type="hidden" name={`BannerItemsList[${index}].ProductsItem.BannerItemProductDatasList[${productIndex}].PurchasesCount`} value={product.purchasesCount} />
                                            </React.Fragment>
                                            
                                    })
                                }
                            </React.Fragment>
                                
                        }
                        {
                            item.type === "Categories" && 
                            <React.Fragment>
                                <input type="hidden" name={`BannerItemsList[${index}].CategoriesItem.Name`} value={item.categoriesName} />
                                {
                                    item.categories.map((category, catIndex) => {
                                        if (category)
                                            return <input type="hidden" name={`BannerItemsList[${index}].CategoriesItem.AllegroCategoriesIds[${catIndex}]`} value={category.id} />
                                    })
                                }
                            </React.Fragment>
                                
                        }
                        {
                            item.type === "Image" && 
                            <React.Fragment>
                                {item.imgUrl && <input type="hidden" name={`BannerItemsList[${index}].ImageItem.ImageName`} value={item.imgUrl}/>}
                                {item.subCategory && <input type="hidden" name={`BannerItemsList[${index}].ImageItem.AllegroCategoryId`} value={item.subCategory}/>}
                                {item.filters && <input type="hidden" name={`BannerItemsList[${index}].ImageItem.Filters`} value={item.filters}/>}
                            </React.Fragment>
                        }
                        {
                            item.type === "Banner" && 
                            <React.Fragment>
                                {item.imgUrl && <input type="hidden" name={`BannerItemsList[${index}].BannerItem.ImageName`} value={item.imgUrl}/>}
                                {item.bannerCategory && <input type="hidden" name={`BannerItemsList[${index}].BannerItem.CategoryId`} value={item.bannerCategory}/>}
                            </React.Fragment>
                        }
                    </React.Fragment>
                ))
            }
        </React.Fragment>
    )
    
}

export default SubmitInputs;