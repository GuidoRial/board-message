import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Board from "./components/Board/Board";
import { authService, firestore } from "./firebase";
import { signOut } from "firebase/auth";

function App() {
    const [user, setUser] = useState(false); //User from auth
    const [activeUser, setActiveUser] = useState(false); //User object that you get with firebase's listener

    //1 listener de Firebase que detecta si hay usuarios conectados o no y de donde vienen

    useEffect(() => {
        const unsuscribe = authService.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                //User has logged in
                await setUser(authUser);

                const result = await firestore
                    .collections("users")
                    .where("userId", "==", user.uid)
                    .get();

                const [userObject] = result.docs.map((item) => ({
                    ...item.data(),
                    docId: item.id,
                }));

                setActiveUser(userObject);
            } else {
                //User has logged out
                setUser(null);
                setActiveUser({});
            }
        });

        return () => {
            unsuscribe();
        };
    }, [user]);

    console.log(user);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {user ? (
                        <Route path="/" element={<Board />} />
                    ) : (
                        <Route path="/login" element={<LogIn />} />
                    )}
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
