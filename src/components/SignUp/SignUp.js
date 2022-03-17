import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clearInputs, linkStyle } from "../../auxFunctions";
import "./SignUp.css";
import { firebase, firestore } from "../../firebase";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [usernameIsInDatabase, setUsernameIsInDatabase] = useState(false);
    const [usernameIsValid, setUsernameIsValid] = useState(null);

    const [emailIsValid, setEmailIsValid] = useState(null);
    const [passwordIsValid, setPasswordIsValid] = useState(null);

    const disableButton = username === "" || email === "" || password === "";

    useEffect(() => {
        //check if user exists in database

        setUsernameIsInDatabase(false);
    }, [username]);

    const handleSignUp = async (e) => {
        if (username.length < 3 || username.length > 12) {
            e.preventDefault();
            setUsernameIsValid(false);
            setTimeout(() => {
                setUsernameIsValid(null);
            }, 5000);
        }
        if (!email.includes("@") || email.length < 3) {
            e.preventDefault();
            setEmailIsValid(false);
            setTimeout(() => {
                setEmailIsValid(null);
            }, 5000);
        }
        if (password.length < 6 || password.length > 20) {
            e.preventDefault();
            setPasswordIsValid(false);
            setTimeout(() => {
                setPasswordIsValid(null);
            }, 5000);
        }
        try {
            e.preventDefault();
            const createdUserResult = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);

            await createdUserResult.user.updateProfile({
                displayName: username,
            });

            await firestore.collection("users").add({
                userId: createdUserResult.user.uid,
                username: username,
                emailAddress: email,
                about: "Developed by GuidoRial and FedeSca001",
                profilePicture: "",
            });
            await clearInputs();
            setEmail("");
            setPassword("");
            setUsername("");
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <section className="sign-up-log-in">
            <h1>BoardMessage</h1>
            <div className="form-container">
                <form className="form" onSubmit={handleSignUp}>
                    <input
                        className="input-field"
                        id="username"
                        type="text"
                        placeholder="Enter your username..."
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameIsValid === false && (
                        <p style={{ color: "#FD1D1D", fontWeight: "700" }}>
                            Username should be between 3 and 12 characters
                        </p>
                    )}
                    {usernameIsInDatabase && (
                        <p style={{ color: "#FD1D1D", fontWeight: "700" }}>
                            Username is already in use
                        </p>
                    )}
                    <input
                        className="input-field"
                        id="email"
                        type="text"
                        placeholder="Enter your e-mail..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailIsValid === false && (
                        <p style={{ color: "#FD1D1D", fontWeight: "700" }}>
                            E-mail is not valid
                        </p>
                    )}
                    <input
                        className="input-field"
                        id="password"
                        type="password"
                        placeholder="Enter your password..."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordIsValid === false && (
                        <p style={{ color: "#FD1D1D", fontWeight: "700" }}>
                            Password is not valid
                        </p>
                    )}
                    <button
                        disabled={disableButton}
                        type="submit"
                        className="form-button"
                        id="actionButton"
                        style={
                            disableButton
                                ? { opacity: "0.5" }
                                : { opacity: "1" }
                        }
                    >
                        Create Account
                    </button>
                </form>
                <div className="account-check">
                    <p>Already have an account?</p>
                    <Link to="/login" style={linkStyle}>
                        Log In
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
