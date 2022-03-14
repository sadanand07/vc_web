import React from "react";
import { Link } from "react-router-dom";
import "./thank-you.css";
import Shivila from "../assets/images/Logo.svg";

const ThankYouComponent = () => {
    return (
        <>
            <div className="content">
                <div class="wrapper-1">
                    <div class="wrapper-2">
                        <img
                            src={Shivila}
                            alt="shivila_logo"
                            className="logo"
                        />
                        <h1>Thank you !</h1>
                        <h6>For using</h6>
                        <h6>Gather at Shivila </h6>
                        <Link to="/">
                            <button className="go-home">Call Again</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThankYouComponent;
