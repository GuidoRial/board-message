import { render } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { getDocumentWithDocId } from "../../../auxFunctions";

function Header({ activeUser, selectedChat }) {

    return (
        <header className="individual-chat-header">
            <div className="selected-user">
                {activeUser.profilePicture ? (
                    <img src={activeUser.profilePicture} alt="user-profile" />
                ) : (
                    <div className="header-profile-picture">
                        test
                    </div>
                )}

                <div>
                    <p className="username">user I'm talking with</p>
                    <p>user's about</p>
                </div>
            </div>
        </header>
    );
}

export default Header;
