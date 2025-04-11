import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AudioOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Badge } from "antd";
import { useSelector } from 'react-redux';
import { FiHeart } from "react-icons/fi";

const { Search } = Input;
const products = ["Mobile", "Headphone"]

export default function Header() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [option, setOption] = useState([]);
    const cartItems = useSelector((state) => state.shopCartItem.items);
    const wishlistItems = useSelector((state) => state.shopWishlistItem.items);

    const handleSearch = (value) => {
        if (value.trim().toLowerCase() === 'mobile' || value.trim().toLowerCase() === 'mobiles') {
            navigate("/mobile")
        } else if (value.trim().toLowerCase() === 'headphone' || value.trim().toLowerCase() === 'headphones') {
            navigate("/headphone")
        }
    }

    const handleDropDownList = (value) => {
        setQuery(value)
        if (!value) {
            setOption([]);
        }
        const filterItems = products
            .filter((item) => item.toLowerCase().includes(value.toLowerCase()))
            .map((item) => ({ value: item }))
        setOption(filterItems)
    }

    return (
        <div className="header_section">
            <div onClick={() => navigate('/wishlist')}>
                <Badge count={wishlistItems.length} showZero><FiHeart className="wishList_icon" /></Badge>
            </div>
            <AutoComplete
                options={option}
                onSearch={handleDropDownList}
                onSelect={handleSearch}
                style={{ width: 300 }}
                value={query}
            >
                <Search
                    placeholder="Search for products..."
                    enterButton="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onSearch={handleSearch}
                    size="medium"
                    suffix={<AudioOutlined style={{ fontSize: 16, color: "#1677ff" }} />}
                    style={{ width: 300 }}
                />
            </AutoComplete>
            <div style={{ position: "relative", display: "inline-block" }}>
                <Badge
                    count={cartItems.length}
                    showZero
                    style={{ position: "absolute", top: "-28px", right: "-5px" }}
                />
                <FaShoppingCart className="cart_icon" onClick={() => navigate('/cart')}/>
            </div>
        </div>
    )
}       