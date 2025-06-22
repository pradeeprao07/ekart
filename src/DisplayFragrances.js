import React, { useEffect, useState } from 'react';
import Calculation from './Calculation';
import Header from './Header';
import axios from 'axios';
import { Spin } from 'antd';

export default function Fragrance() {
    const [fragrances, setFragrances] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/api/fragrances/') 
            .then((result) => { setFragrances(result.data.products) }) // inside the data, products stores the array of objects(fragrances)
            .catch(error => console.error('Failed to fetch products:', error))
    }, []);

    useEffect(() => {
        if (fragrances.length > 0) {
            setLoad(false)
        }
    }, [fragrances]) // [fragrances] runs whenever the fragrances is updated

    return (
        <div className="shopping-container">
            <Header />
            {load ? (
                <Spin className='loader' />
            ) : (
                <div className="shopping-content">
                    <div className="digital-item">
                        {fragrances.map((item) => (
                            <Calculation
                                id={item.id}
                                thumbnail={item.thumbnail}
                                name={item.title}
                                price={item.price}
                            />
                        ))}
                    </div>
                </div>
            )}
            <div className="footer">
                <p>Happy Shopping</p>
            </div>
        </div>
    );
}
