import React from "react";

function Header({ activeUser }) {
    return (
        <header className="individual-chat-header">
            <div className="selected-user">
                {activeUser.profilePicture ? (
                    <img src={activeUser.profilePicture} alt="user-profile" />
                ) : (
                    <div className="profile-picture header-profile-picture">
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
