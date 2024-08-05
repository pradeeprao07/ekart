import React, { useState } from "react";
import { RxPlusCircled, RxMinusCircled } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { addItem } from "./Store";
import { Button } from 'antd';

export default function Calculation({ image, name, cost }) {
    const [count, setCount] = useState(1);
    const [product, setProduct] = useState(cost);

    const dispatch = useDispatch();

    function Increment() {
        const newCounter = count + 1;
        setCount(newCounter);
        setProduct(newCounter * cost);
    }

    function Decrement() {
        if (count > 1) {
            const newCounter = count - 1;
            setCount(newCounter);
            setProduct(newCounter * cost);
        }
    }

    const addItemToCart = () => {
        dispatch(addItem({ image, name, cost }));
    }

    return (
        <div className="item">
            <img src={image} />
            <h3>{name}</h3>
            <p>Price: ${cost}</p>
            <p>Total Price: ${product}</p>
            <div>
                <RxPlusCircled className="btn" onClick={Increment}>+</RxPlusCircled>
                <span> {count} </span>
                <RxMinusCircled className="btn" onClick={Decrement}>-</RxMinusCircled>
            </div>
            <Button className="cartBtn" type="primary" onClick={addItemToCart}>Add to cart</Button>
        </div>
    );
}
