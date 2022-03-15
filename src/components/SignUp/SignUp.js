import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { linkStyle } from "../../auxFunctions";
import "./SignUp.css";
import { firebase, firestore } from "../../firebase";

function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //form validation, username validation (check if it exists in database)
    const [usernameIsValid, setUsernameIsValid] = useState(false);

    useEffect(() => {
        //check if user exists in database
        
    },[username]);

    const handleSignUp = async (e) => {
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
                dateCreated: Date.now,
                about: "Developed by GuidoRial and FedeSca001",
                profilePicture: "",
            });
        } catch (error) {
            console.error(error);
        }
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
