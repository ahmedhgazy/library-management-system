import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css"
import { getAuthUser, removeAuthUser } from "../helper/Storege";

const Header = () => {
    const navigate = useNavigate();
    const auth = getAuthUser();
    const Logout = () => {
        removeAuthUser();
        navigate("/Login");
    };
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>

                    <Nav className="me-auto">


                        {!auth && (
                            <>
                                <Link className="nav-link" to={"/Login"}>
                                    Login</Link>

                            </>
                        )}
                        {auth && auth.role === 0 && (

                            <>
                                <Navbar.Brand>
                                    <Link to={"/"} className="nav-link">Library App</Link>
                                </Navbar.Brand>
                                <Link className="nav-link" to={"/"}>
                                    List books</Link>
                                <Link className="nav-link" to={"/History"}>
                                    History of books</Link>

                            </>
                        )}
                        {auth && auth.role === 1 && (
                            <>
                                <Link className="nav-link" to={"/Register"}>
                                    Manage Readers</Link>
                                <Link className="nav-link" to={"/ManageBooks"}>
                                    Manage Books</Link>
                                <Link className="nav-link" to={"/Request"}>
                                    Requests of books</Link>
                            </>
                        )}




                    </Nav>
                    <Nav className="ms-aUto">
                        <Nav.Link onClick={Logout}>Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};
export default Header;