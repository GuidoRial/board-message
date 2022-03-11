import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/LogIn";
import Board from "./components/Board/Board";

function App() {
    const [user, setUser] = useState(false);
    const [activeUser, setActiveUser] = useState(false);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {user ? (
                        <Route path="/" element={<Board />} />
                    ) : (
                        <Route path="login" element={<LogIn />} />
                    )}
                    <Route path="signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
