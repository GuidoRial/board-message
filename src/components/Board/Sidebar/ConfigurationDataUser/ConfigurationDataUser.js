import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { authService, firestore, storage } from "../../../../firebase";
import icon from "../../../../assets/editDataUser.png";
import "./ConfigurationDataUser.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ConfigurationDataUser = ({ activeUser }) => {
    const [newPhoto, setNewPhoto] = useState(null);
    const [newName, setNewName] = useState("");
    const [newAbout, setNewAbout] = useState("");
    //Add user validation

    const updateProfile = (newPhoto, activeUser) => {
        /*if (!usernameAvailable) {
            alert("Username is taken");
            return;
        }*/
        if (newPhoto) {
            const profilePicsRef = ref(storage, `profilePics/${newPhoto.name}`);
            const uploadTask = uploadBytesResumable(profilePicsRef, newPhoto);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log("File is being uploaded");
                    console.log(snapshot);
                },
                (error) => {
                    console.error(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            firestore
                                .collection("users")
                                .doc(activeUser.docId)
                                .update({
                                    username: newName || activeUser.username,
                                    profilePicture: downloadURL,
                                    about: newAbout || activeUser.about,
                                });
                        }
                    );
                }
            );
        } else {
            firestore
                .collection("users")
                .doc(activeUser.docId)
                .update({
                    username: newName || activeUser.username,
                    about: newAbout || activeUser.about,
                });
        }
    };
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            signOut(authService);
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <section className="container-config-data">
                <img
                    src={activeUser.profilePicture}
                    alt={activeUser.username}
                    className="img-user"
                />
            <h3 className="name-config-data">{activeUser.username}</h3>
            <p className="descp-config-data">{activeUser.about}</p>

            <label className="label-config-data">
                Add img
            </label>
            <input
                type="file"
                id="file"
                className="custom-file-input"
                onChange={(e) => setNewPhoto(e.target.files[0])}
            />

            <label className="label-config-data">User Name</label>
            <input
                type="text"
                maxLength={12}
                minLength={3}
                className="input-name-config"
                onChange={(e) => setNewName(e.target.value)}
            />

            <label className="label-config-data">Description</label>

            <textarea
                type="text"
                maxLength={100}
                className="description-user-data"
                onChange={(e) => setNewAbout(e.target.value)}
            ></textarea>
            <p className="count-characters">
                Characters {newAbout.length} / 100
            </p>

            <button
                className="button-config-data"
                onClick={() => updateProfile(newPhoto, activeUser)}
            >
                Update profile
            </button>
            <button onClick={handleLogOut} className="quit-session">
                Log Out
            </button>
        </section>
    );
};

export default ConfigurationDataUser;
