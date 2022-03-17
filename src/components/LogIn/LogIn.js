import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { authService } from "../../firebase";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import { clearInputs, linkStyle } from "../../auxFunctions";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate;

    const handleLogIn = async (e) => {
        try {
            e.preventDefault();
            signInWithEmailAndPassword(authService, email, password);
            clearInputs();
            setEmail("");
            setPassword("");
            navigate("/");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage + errorCode);
        }
    };

    return (
        <section className="sign-up">
            <h1>BoardMessage / Log In</h1>
            <div className="form-container">
                <form onSubmit={handleLogIn}>
                    <input
                        className="input-field"
                        id="email"
                        type="text"
                        placeholder="E-mail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input-field"
                        id="password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" id="create-account">
                        Log In
                    </button>
                    <button className="demo-butt">User Demo One</button>
                    <button className="demo-butt">User Demo Two</button>
                    <div className="have-an-account">
                        <p>Don't have an account?</p>
                        <Link to="/signup" style={linkStyle}>
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LogIn;
