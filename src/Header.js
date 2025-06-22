import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AudioOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Badge } from "antd";
import { useSelector } from 'react-redux';
import { FiHeart } from "react-icons/fi";

const { Search } = Input;
const products = ["Mobile", "Headphone", "Fragrance", "Grocery", "HomeDecoration", "Laptop"]

export default function Header() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [option, setOption] = useState([]);
    const cartItems = useSelector((state) => state.shopCartItem.items); // useSelector - reads or picks the particular data from the store
    const wishlistItems = useSelector((state) => state.shopWishlistItem.items);

    // the input query given in the search box will be automatically converted to lowerCase internally (to avoid case sensitive errors)
    const handleSearch = (value) => {
        if (value.trim().toLowerCase() === 'mobile' || value.trim().toLowerCase() === 'mobiles') {
            navigate("/mobile")
        } else if (value.trim().toLowerCase() === 'headphone' || value.trim().toLowerCase() === 'headphones') {
            navigate("/headphone")
        }
        else if (value.trim().toLowerCase() === 'fragrance' || value.trim().toLowerCase() === 'fragrances') {
            navigate("/fragrance")
        }
        else if (value.trim().toLowerCase() === 'grocery' || value.trim().toLowerCase() === 'groceries') {
            navigate("/groceries")
        }
        else if (value.trim().toLowerCase() === 'homedecoration' || value.trim().toLowerCase() === 'homedecoration') {
            navigate("/home-decoration")
        }
        else if (value.trim().toLowerCase() === 'laptop' || value.trim().toLowerCase() === 'laptops') {
            navigate("/laptop")
        }
    }

    const handleVoiceInput = () => {
        const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false; // gives the final result, instead of live updates
        recognition.start();

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript; // converting the voice into text format
            console.log(speechResult, "speechresult ") 
            setQuery(speechResult); // passing the voice ip (as text) to setQuery
            handleSearch(speechResult); // passing the voice ip (as text) to handleSearch function
        }

        recognition.onerror = (error) => {
            console.log("Speech recognisition error", error);
        }
    }

    const handleDropDownList = (value) => {
        setQuery(value)
        if (!value) {
            setOption([]);
        }
        const filterItems = products
            .filter((item) => item.toLowerCase().includes(value.toLowerCase())) // matches the pattern of searching
            .map((item) => ({ value: item })) // accessing the item on search bar
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
                    suffix={<AudioOutlined style={{ fontSize: 16, color: "#1677ff" }}
                        onClick={handleVoiceInput} />}
                    style={{ width: 300 }}
                />
            </AutoComplete>
            <div style={{ position: "relative", display: "inline-block" }}>
                <Badge
                    count={cartItems.length}
                    showZero
                    style={{ position: "absolute", top: "-28px", right: "-5px" }}
                />
                <FaShoppingCart className="cart_icon" onClick={() => navigate('/cart')} />
            </div>
        </div>
    )
}       