import React, { useState, useEffect } from "react";
import Header from "./Header";

function HomePage() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowContent(true);
        }, 2000);
    }, []);

    return (
        <div className="main">
            <Header />
            {showContent && (
                <div className="main-content">
                    <p className="welcome"><b>Welcome to Shopping!</b></p>
                </div>
            )}
            <div className="footer">
                <p>Welcome</p>
            </div>
        </div>
    );
}

export default HomePage;
