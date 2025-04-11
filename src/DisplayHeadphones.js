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
                            image={item.image}
                            name={item.name}
                            cost={item.cost}
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
