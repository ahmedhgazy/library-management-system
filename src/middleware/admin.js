import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthUser } from "../helper/Storege";
const Admin = () => {
    const auth = getAuthUser();
    return <>{auth && auth.role === 1 ? <Outlet /> : <Navigate to={"/"} />}</>;

};
export default Admin;