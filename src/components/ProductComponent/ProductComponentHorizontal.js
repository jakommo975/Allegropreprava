import React from 'react';
import "./ProductComponentHorizontal.css";

const ProductComponentHorizontal = (props) => {
    return (
        <div className="ProductContainerHorizontal">
            <div className="ProductImageContainer">
                <img className="ProductImage" src={props.imgUrl}></img>
            </div>
            <div className="DescriptionContainer">
                <div className="PrizeContainer">
                    <h2>{props.price} €</h2>
                </div>
                <div className="ProductNameContainer">
                    <h2>{props.name}</h2>
                </div>
            </div>
        </div>
    )
}

export default ProductComponentHorizontal;