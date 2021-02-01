import React from 'react';
import "./ProductComponentVertical.css";

const ProductComponent = (props) => {
    return (
        <div className="ProductContainer">
            <div className="ProductImageContainer">
                <img className="ProductImage" src={props.imgUrl}></img>
            </div>
            <div className="ProductNameContainer">
                <h2>{props.name}</h2>
            </div>
            <div className="PrizeContainer">
                <h2>{props.price} €</h2>
            </div>
        </div>
    )
}

export default ProductComponent;