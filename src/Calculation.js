import React, { useState } from "react";
import { RxPlusCircled, RxMinusCircled } from "react-icons/rx";
import { FiHeart } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { cartItem, updateCartItem, wishlistItem } from "./Store";
import { Button } from 'antd';
import { useNavigate, Link } from "react-router-dom";

export default function Calculation({ id, thumbnail, name, price }) { // importing as a props
    const [count, setCount] = useState(1);
    const [multiple, setMultiple] = useState(price);
    const [toggleCart, setToggleCart] = useState(false);
    const [toggleWishlist, setToggleWishlist] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch(); // sends the updated information to store (what exactly has to been updated)

    const Increment = () => {
        const itemCount = count + 1;
        setCount(itemCount);
        setMultiple(itemCount * price);
        dispatch(updateCartItem({ id, count: itemCount, price: multiple })) // id, count, price are info being sent to store (later this will be updated on cart page)
    }

    const Decrement = () => {
        if (count > 1) {
            const itemCount = count - 1;
            setCount(itemCount);
            setMultiple(itemCount * price);
            dispatch(updateCartItem({ id, count: itemCount, price: multiple }))
        }
    }

    const addItemToWishlist = () => {
        if (!toggleWishlist) {
            dispatch(wishlistItem({ id, thumbnail, name, price, count })); // wishlist item info to send for the store and these can be used anywhere since its a global store
            console.log({ "id": id, "name": name, "price": price }, "wishlist-items")
            setToggleWishlist(true)
        }
    }

    const addItemToCart = () => {
        if (!toggleCart) {
            dispatch(cartItem({ id, thumbnail, name, price, totalCost: multiple, count })); // cart item info to send for the store and these can be used anywhere since its a global store
            console.log({ "id": id, "name": name, "price": price }, "cart-items")
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
            <Link to={`/product/${id}`}> {/* updates ids of the url path on every thumbnails */}
                <img src={thumbnail} />
            </Link>
            <h3 className="itemName">{name}</h3>
            <p>Price: ₹{price}</p>
            <p>Total Price: ₹{multiple}</p>
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
