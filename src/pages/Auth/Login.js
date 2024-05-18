import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../css/Login.css";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { getAuthUser, setAuthUser } from "../../helper/Storege";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const auth = getAuthUser();
    const navigate = useNavigate();
    const [login, SetLogin] = useState({
        email: '',
        password: '',
        loading: false,
        err: [],
    });
    const LoginFun = (e) => {
        e.preventDefault();
        SetLogin({ ...login, loading: true, err: [] });
        axios
            .post("http://localhost:4000/auth/login", {
                email: login.email,
                password: login.password,
            })
            .then((resp) => {
                SetLogin({ ...login, loading: false, err: [] });
                setAuthUser(resp.data);
                if (auth.role === 1) {
                    navigate("/ManageBooks");

                }
                else {
                    navigate("/");
                }

            })
            .catch((errors) => {
                SetLogin({ ...login, loading: false, err: errors.response.data.errors, });
            })


    };
    return (
        <div className="login-container" >
            <h1>Login Form</h1>
            {login.err.map((errors, index) => (
                <Alert key={index} variant="danger" className="p-2">
                    {errors.msg}
                </Alert>

            ))}


            <Form onSubmit={LoginFun}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Please enter vaild Email" required value={login.email} onChange={(e) => SetLogin({ ...login, email: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Please enter vaild Password" required value={login.password} onChange={(e) => SetLogin({ ...login, password: e.target.value })} />
                </Form.Group>
                <Button className="btn btn-dark w-100" variant="primary" type="submit" disabled={login.loading === true}>
                    Login
                </Button>
            </Form>
        </div>
    );
};
export default Login;