import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";

function HomePage() {
    const [showContent, setShowContent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setShowContent(true);
        }, 1000); // shows after 1sec, when the content is ready
    }, []); // [] runs only on the 1st render(loads)

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleLogin = async () => { // async lets the await inside it hold the execution
        try {
            provider.setCustomParameters({
                prompt: "select_account" // this allows to select account the everytime
            }); 
            // signInWithPopup() opens the google sign and lets the user login
            const result = await signInWithPopup(auth, provider) // await holds the execution untill signInWithPopup() is done
            console.log("Successfully logged in", result) 
            navigate('/mobile') // after the login done with signInWithPopup() only then the next will be executed 
        } catch (error) {
            console.log("Failed to login", error)
        }
    }

    return (
        <div className="homepage_section">
            {showContent && (
                <div className="homepage-content">
                    <b className="welcome-text">Welcome to Shopping!</b>
                    <p className="description">Dive into a world of endless possibilities with our wide range of products, handpicked just for you.<br />
                        Whether you're looking for the latest trends, daily essentials, or something special, we've got you covered.<br />
                        Enjoy unbeatable deals and discounts that make every purchase satisfying.<br />
                        Our platform is designed to make your shopping experience smooth and enjoyable.<br />
                        Shop with confidence, find your favorites, and discover new ones along the way. Happy shopping, and may your cart be filled with joy!</p>
                    <Button className="loginBtn" type="primary" onClick={handleLogin}>Login</Button>
                </div>
            )
            }
        </div >
    );
}

export default HomePage;
