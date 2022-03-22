import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    clearInputs,
    getUserByUsername,
    linkStyle,
    userInDatabase,
} from "../../auxFunctions";
import "./SignUp.css";
import { firebase, firestore } from "../../firebase";

function SignUp({ user, activeUser }) {
    const [usersFromDatabase, setUsersFromDatabase] = useState([]);
    const [usernameAvailable, setUsernameAvailable] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [usernameIsValid, setUsernameIsValid] = useState(null);
    const [emailIsValid, setEmailIsValid] = useState(null);
    const [passwordIsValid, setPasswordIsValid] = useState(null);

    const disableButton = username === "" || email === "" || password === "";
    let navigate = useNavigate();

    useEffect(() => {
        const getUsersFromDatabase = async () => {
            const result = await firestore.collection("users").get();
            let filteredResult = result.docs.map((user) => ({
                username: user.data().username,
            }));
            setUsersFromDatabase(filteredResult);
        };

        getUsersFromDatabase();
    }, []);

    const handleSignUp = async (e) => {
        e.preventDefault();
        for (let user of usersFromDatabase.values()) {
            if (user.username === username) {
                setUsernameAvailable(false);
                return;
            } else {
                setUsernameAvailable(true);
            }
        }
        if (username.length < 3 || username.length > 12) {
            setUsernameIsValid(false);
        } else {
            setUsernameIsValid(null);
        }
        if (!email.includes("@") || email.length < 3) {
            setEmailIsValid(false);
        } else {
            setEmailIsValid(null);
        }
        if (password.length < 6 || password.length > 20) {
            setPasswordIsValid(false);
        } else {
            setPasswordIsValid(null);
        }
        try {
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

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

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

                    {!usernameAvailable && (
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
