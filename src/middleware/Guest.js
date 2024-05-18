import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../helper/Storege";
const Guest = () => {
    const auth = getAuthUser();
    return <>{!auth ? <Outlet /> : <Navigate to={"/"} />}</>;

};
export default Guest;