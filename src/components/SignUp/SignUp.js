import React, { useState } from "react";
import { Link } from "react-router-dom";
import { linkStyle } from "../../auxFunctions";
import "./SignUp.css";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
    };

    return (
        <section className="sign-up">
            <h1>BoardMessage</h1>
            <div className="form-container">
                <form onSubmit={handleSignUp}>
                    <input
                        className="input-field"
                        id="username"
                        type="text"
                        placeholder="Enter your username..."
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="input-field"
                        id="email"
                        type="text"
                        placeholder="Enter your e-mail..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input-field"
                        id="password"
                        type="password"
                        placeholder="Enter your password..."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" id="create-account">
                        Create Account
                    </button>
                </form>
                <div className="have-an-account">
                    <p>Already have an account?</p>{" "}
                    <Link to="/login" style={linkStyle}>
                        Log In
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
