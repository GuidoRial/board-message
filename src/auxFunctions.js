import { firestore } from "./firebase";

export const linkStyle = {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
};

export const clearInputs = () => {
    Array.from(document.querySelectorAll("input")).forEach((input) => {
        input = input.value = "";
    });
};

export const getFirstLetterOfUsername = (username) => {
    let firstLetterOfUsername = username[0].toUpperCase();
    return firstLetterOfUsername;
};

export async function getUserByUsername(username) {
    const result = await firestore
        .collection("users")
        .where("username", "==", username)
        .get();
    const [user] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    }));

    return user;
}

export async function userInDatabase(username) {
    const result = await firestore.collection("users").get();
    let userArray = result.docs.map((user) => ({
        username: user.data().username,
    }));
    let user = userArray.find(({user}) => user.username === username);

    return user;
}
