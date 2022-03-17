import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { authService } from "../../firebase";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import { clearInputs, linkStyle } from "../../auxFunctions";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const disableButton = email === "" || password === "";
    let navigate = useNavigate;

    let demoUserEmail;
    let demoUserPassword;
    let demoUserTwoEmail;
    let demoUserTwoPassword;

    

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
        <section className="sign-up-log-in">
            <h1>BoardMessage</h1>
            <div className="form-container">
                <form className="form" onSubmit={handleLogIn}>
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
                    <button
                        style={
                            disableButton
                                ? { opacity: "0.5" }
                                : { opacity: "1" }
                        }
                        type="submit"
                        className="form-button"
                        id="actionButton"
                    >
                        Log In
                    </button>
                    <button className="form-button" id="demoUserButton">
                        DEMO USER
                    </button>
                    <button className="form-button" id="demoUserButton">
                        DEMO USER 2
                    </button>
                    <div className="account-check">
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
