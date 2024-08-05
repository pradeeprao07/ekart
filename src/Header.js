import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="header">
            <div className="title">
                <div onClick={() => navigate("/")} className="title-text">Home</div>
                <div onClick={() => navigate("/headphone")} className="title-text">Headphones</div>
                <div onClick={() => navigate("/mobile")} className="title-text">Mobiles</div>
                <div onClick={() => navigate("/cart")} className="title-text">Cart</div>
            </div>
        </div>
    )
}       