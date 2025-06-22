import React, { useEffect, useState } from 'react';
import Calculation from './Calculation';
import Header from './Header';
import axios from 'axios';
import { Spin } from 'antd';

export default function Groceries() {
    const [groceries, setGroceries] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/api/groceries/')
            .then((result) => { setGroceries(result.data.products) })
            .catch(error => console.error('Failed to fetch products:', error))
    }, []);

    useEffect(() => {
        if (groceries.length > 0) {
            setLoad(false)
        }
    })

    return (
        <div className="shopping-container">
            <Header />
            {load ? (
                <Spin className='loader' />
            ) : (
                <div className="shopping-content">
                    <div className="digital-item">
                        {groceries.map((item) => (
                            <Calculation
                                id={item.id}
                                thumbnail={item.thumbnail}
                                name={item.title}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>)}
            <div className="footer">
                <p>Happy Shopping</p>
            </div>
        </div>
    );
}
