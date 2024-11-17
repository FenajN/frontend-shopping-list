import React from 'react';
import HomeButton from "./img/home1.png";

function HomeButtonComponent({ onClick }) {
    return (
        <button onClick={onClick} className="home-button">
            <span className="home-icon">
                <img src={HomeButton} alt="Remove member" className="member-remove-icon"/>
            </span>
            Home
        </button>
    );
}

export default React.memo(HomeButtonComponent);


