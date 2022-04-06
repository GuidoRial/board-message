import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { authService } from "../../firebase";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import { clearInputs, linkStyle } from "../../auxFunctions";
import imglogo from '../../assets/logoInit.jpg'

const LogIn = ({ user, activeUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const disableButton = email === "" || password === "";
    let navigate = useNavigate();

    let demoUserEmail = "demouser@gmail.com";
    let demoUserPassword = "demouser";

    const handleLogIn = async (e) => {
        try {
            e.preventDefault();
            signInWithEmailAndPassword(authService, email, password);
            clearInputs();
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleLoginWithDemoUser = async () => {
        try {
            signInWithEmailAndPassword(
                authService,
                demoUserEmail,
                demoUserPassword
            );
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className="contain-logIn-sign-up">
        <section className="sign-up-log-in">
            <img src={imglogo} alt="app-logo" className="img-logo"/>
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
                    <button
                        onClick={handleLoginWithDemoUser}
                        className="form-button"
                        id="demoUserButton"
                    >
                        DEMO USERS
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
        </div>
    );
};

export default LogIn;
