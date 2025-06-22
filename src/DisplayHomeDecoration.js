import React, { useEffect, useState } from 'react';
import Calculation from './Calculation';
import Header from './Header';
import axios from 'axios';
import { Spin } from 'antd';

export default function HomeDecoration() {
    const [homedecoration, setHomedecoration] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/api/home-decoration/')
            .then((result) => { setHomedecoration(result.data.products) })
            .catch(error => console.error('Failed to fetch products:', error));
    }, []);

    useEffect(() => {
        if (homedecoration.length > 0) {
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
                        {homedecoration.map((item) => (
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
