import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { HeadphoneItems, MobileItems } from "./Items";
import Calculation from "./Calculation";
import { Button } from 'antd';
import { cartItem } from "./Store";
import { useDispatch } from "react-redux";

export default function Details() {
    const { id } = useParams(); // useParams() returns the id from the url path in a string format
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [apiProduct, setApiProduct] = useState([]);
    const [product, setProduct] = useState(null)
    const [toggleCart, setToggleCart] = useState(false)

    const localProducts = [...HeadphoneItems, ...MobileItems];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await axios.get("https://dummyjson.com/products?limit=100");
                const apiList = getData.data.products; // apiList here consists of all the api products
                setApiProduct(apiList)
                const allProducts = [...localProducts, ...apiList]; // combining local and api products
                const currentProduct = allProducts.find((item) => String(item.id) === String(id)); // viewing the current product by clicking on it(if both the id matches)
                setProduct(currentProduct)
            } catch (error) {
                console.log("Failed to fetch the product:", error)
            }
        }
        fetchData();
    }, [id]);

    const combinedProducts = [...localProducts, ...apiProduct];

    const suggestedProducts = product ? // if category matches and ids doesnt match, then those items should display as suggested products
        combinedProducts.filter((item) => item.category == product.category && String(item.id) !== String(id)) : [];

    const addItemToCart = () => {
        if (!toggleCart && product) {
            const price = product.price;
            const count = 1;
            const totalCost = price * count;
            const productWithCostCount = { ...product, count, totalCost };
            dispatch(cartItem(productWithCostCount));
            setToggleCart(true);
        } else {
            navigate('/cart');
        }
    }

    return (
        <div className="details-container">
            <Header />
            {product ? (
                <div className="productDetails">
                    <img src={product.thumbnail} />
                    <h2>{product.title || product.name}</h2>
                    <p><b>Description:</b> {product.description || "No description available"}</p>
                    <p><b>Price:</b> ₹{product.price}</p>
                    <p><b>Brand:</b> {product.brand || "N/A"}</p>
                    <p><b>Category:</b> {product.category || "N/A"}</p>
                    <Button type="primary" onClick={addItemToCart}>{toggleCart ? 'Go to Cart' : 'Add to Cart'}</Button>
                </div>
            ) : (
                <p className="loadingText">Product loading...</p>
            )}
            <h3 className="suggestedText">Suggested Products</h3>
            {suggestedProducts.length > 0 && (
                <div className="shopping-content">
                    <div className="digital-item">
                        {suggestedProducts.map((item) => (
                            <Calculation
                                id={item.id}
                                thumbnail={item.thumbnail}
                                name={item.title || item.name}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
