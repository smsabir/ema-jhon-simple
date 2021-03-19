import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => { //const Product = ( {product, handleAddProduct}) direct destructuring
    //console.log(props)
    const {product, handleAddProduct} = props;
    const { img, name, seller, price, stock, key } = product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name"><Link to={'/product/'+key}>{name}</Link></h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - Order soon</small></p>
                {props.showAddToCart &&  <button 
                    className="main-button"
                    onClick={() => handleAddProduct(product)}
                    >
                        <FontAwesomeIcon icon={faCartPlus} /> add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;