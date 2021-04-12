import { LinearProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [loading, setLoading] = useState(true);
    const[product, setProduct] = useState({});
    
    useEffect(() => {
        fetch('http://boiling-woodland-07762.herokuapp.com/products/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[productKey])

    // if(product.key === productKey){
    //     setLoading(false)
    // }
    
    // useEffect(() => {
    //     fetch(url)
    //     .then(res => res.json())
    //     .then(data =>{
    //         setProduct(data)
    //         console.log(data)
    //         setLoading(false)
    //     })
    // }, [url]);

    return (
        <div>
            <h1>Your Product Details.</h1>
             <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;