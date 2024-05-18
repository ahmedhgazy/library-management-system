//local storage


export const setAuthUser = (data) => {
    //save object to the local stroage
    //strigify object to text
    localStorage.setItem("user", JSON.stringify(data));
};
export const getAuthUser = (data) => {
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
    }
};
export const removeAuthUser = () => {
    if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
    }
};