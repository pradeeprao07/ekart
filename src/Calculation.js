import React, { useState } from "react";
import { RxPlusCircled, RxMinusCircled } from "react-icons/rx";
import { FiHeart } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { cartItem, updateCartItem, wishlistItem } from "./Store";
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

export default function Calculation({ id, image, name, cost }) {
    const [count, setCount] = useState(1);
    const [product, setProduct] = useState(cost);
    const [toggleCart, setToggleCart] = useState(false);
    const [toggleWishlist, setToggleWishlist] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const Increment = () => {
        const newCounter = count + 1;
        setCount(newCounter);
        setProduct(newCounter * cost);
        dispatch(updateCartItem({ id, count: newCounter, cost: product }))
    }

    const Decrement = () => {
        if (count > 1) {
            const newCounter = count - 1;
            setCount(newCounter);
            setProduct(newCounter * cost);
            dispatch(updateCartItem({ id, count: newCounter, cost: product }))
        }
    }

    const addItemToWishlist = () => {
        if (!toggleWishlist) {
            dispatch(wishlistItem({ id, image, name, cost, count }));
            console.log({ "id": id, "name": name, "cost": cost }, "wishlist-items")
            setToggleWishlist(true)
        } else {
            navigate('/cart')
        }
    }

    const addItemToCart = () => {
        if (!toggleCart) {
            dispatch(cartItem({ id, image, name, cost, totalCost: product, count }));
            console.log({ "id": id, "name": name, "cost": cost }, "cart-items")
            setToggleCart(true)
        } else {
            navigate('/cart')
        }
    }

    return (
        <div className="displayItem">
            <FiHeart
                className="wishlistAdder"
                onClick={addItemToWishlist}
                style={{ color: toggleWishlist ? "red" : "black" }}
            />
            <img src={image} />
            <h3>{name}</h3>
            <p>Price: ₹{cost}</p>
            <p>Total Price: ₹{product}</p>
            <div className="add-item-section">
                <RxPlusCircled className="btn" onClick={Increment}>+</RxPlusCircled>
                <div className="countNumber"> {count} </div>
                <RxMinusCircled className="btn" onClick={Decrement}>-</RxMinusCircled>
            </div>
            <Button className="cartBtn" type="primary" onClick={addItemToCart}>
                {toggleCart ? 'Go to cart' : 'Add to cart'}
            </Button>
        </div>
    );
}
