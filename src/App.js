import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Board from "./components/Board/Board";
import { authService, firestore } from "./firebase";

function App() {
    const [user, setUser] = useState(null); //User from auth
    const [activeUser, setActiveUser] = useState({}); //User object that you get with firebase's listener
    useEffect(() => {
        const unsuscribe = authService.onAuthStateChanged(async (authUser) => {
            if (authUser) {
                //User has logged in
                await setUser(authUser);

                const result = await firestore
                    .collection("users")
                    .where("userId", "==", user.uid)
                    .get();

                const [userObject] = result.docs.map((item) => ({
                    ...item.data(),
                    docId: item.id,
                }));

                setActiveUser(userObject);
            } else {
                setUser(null);
                setActiveUser({});
            }
        });

        return () => {
            unsuscribe();
        };
    }, [user]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {
                        user ? (
                        <Route
                            path="/"
                            element={<Board user={user} activeUser={activeUser} />}
                        />
                        ) : (<>
                        <Route
                            path="/login"
                            element={<LogIn user={user} activeUser={activeUser} />}
                        />
                        <Route
                            path="/signup"
                            element={<SignUp user={user} activeUser={activeUser}/>}
                        />
                        </>
                        )
                    }
                    <Route
                        path="*"
                        element={<Navigate to={user ? "/" : "/login"} />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
