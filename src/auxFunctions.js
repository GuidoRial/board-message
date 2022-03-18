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
