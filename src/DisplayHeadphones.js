import React from "react";
import { HeadphoneItems } from "./Items";
import Calculation from "./Calculation";
import Header from "./Header";

export default function Headphone() {
    return (
        <div className="shopping-container">
            <Header />
            <div className="shopping-content">
                <div className="digital-item">
                    {HeadphoneItems.map((item) => (
                        <Calculation
                            id={item.id}
                            thumbnail={item.thumbnail}
                            name={item.name}
                            price={item.price}
                        />
                    ))}
                </div>
            </div>
            <div className="footer">
                <p>Happy Shopping</p>
            </div>
        </div>
    );
}
