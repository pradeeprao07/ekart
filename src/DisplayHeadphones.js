import React from "react";
import { HeadphoneItems } from "./Items";
import Calculation from "./Calculation";
import Header from "./Header";

export default function Headphone() {
    return (
        <div className="main">
            <Header />
            <div className="main-content">
                <div className="content">
                    {HeadphoneItems.map((item, index) => (
                        <Calculation
                            key={index}
                            image={item.image}
                            name={item.name}
                            cost={item.cost}
                        />
                    ))}
                </div>
            </div>
            <div className="footer">
                <p>Thanks for the Shopping</p>
            </div>
        </div>
    );
}
