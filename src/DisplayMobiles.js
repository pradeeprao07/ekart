import React from "react";
import { MobileItems } from "./Items";
import Calculation from "./Calculation";
import Header from "./Header";

export default function Mobile() {
    return (
        <div className="shopping-container">
            <Header />
            <div className="shopping-content">
                <div className="digital-item">
                    {MobileItems.map((item) => (
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
