import React, { useEffect } from 'react';

import ProductComponentVertical from '../ProductComponent/ProductComponentVertical';
import ProductComponentHorizontal from '../ProductComponent/ProductComponentHorizontal';
import './ProductSlider.css'


const ProductSlider = (props) => {
    let containerClass = "SliderContainer";

    if (props.orientation === "horizontal"){
        containerClass = "SliderContainerHorizontal"
    }

    return (
        <div className={containerClass}>
            {props.products.map(product => 
                    props.orientation === "horizontal" ? 
                     <ProductComponentHorizontal
                        key={product.id}
                        price={product.price}
                        name={product.name}
                        imgUrl={product.imgUrl}
                     />
                     :
                     <ProductComponentVertical
                        key={product.id}
                        price={product.price}
                        name={product.name}
                        imgUrl={product.imgUrl}
                     />
                )}
        </div>

    );
}

export default ProductSlider;

