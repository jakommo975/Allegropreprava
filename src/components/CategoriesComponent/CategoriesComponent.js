import React from 'react';
import "./CategoriesComponent.css"

const CategoriesComponent = (props) => {
    return (
        <div className="CategoriesContainer">
            <div>
                <h2>{props.header}</h2>
            </div>
            <div >
                <ul className="CategoriesList">
                {
                    props.categories.map(category => 
                        <li>
                            <a onClick={(e) => {e.preventDefault()}} href="kategoria url">
                                 {category.name}
                            </a>
                           
                        </li>
                    )
                }
                </ul>
                
            </div>
        </div>
    );
}


export default CategoriesComponent;