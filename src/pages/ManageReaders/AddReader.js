import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { setAuthUser } from "../../helper/Storege";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../../helper/Storege";

const AddReader = () => {
    const auth = getAuthUser();


    const navigate = useNavigate();
    const [Reader, SetReadrs] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        err: [],
        loading: false,
    });
    const AddReaderFun = (e) => {
        e.preventDefault();
        SetReadrs({ ...Reader, loading: true, err: [] });
        axios
            .post("http://localhost:4000/auth/register",
                {
                    name: Reader.name,
                    phone: Reader.phone,
                    email: Reader.email,
                    password: Reader.password,
                },)
            .then((resp) => {
                SetReadrs({ ...Reader, loading: false, err: [] });
                navigate("/Register");
            })
            .catch((errors) => {
                SetReadrs({ ...Reader, loading: false, err: errors.response.data.errors, });
            })
    };






    return (
        <div className="login-container" >

            <h1>Registertion Form</h1>
            {/* {Reader.err.map((errors, index) => (
                <Alert key={index} variant="danger" className="p-2">
                    {errors.msg}
                </Alert>

            ))} */}

            <Form onSubmit={AddReaderFun}>
                <Form.Group className="mb-3" controlId="regiser-name">
                    <Form.Control type="text" placeholder="Please enter Full Name" required value={Reader.name} onChange={(e) => SetReadrs({ ...Reader, name: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="regiser-email">
                    <Form.Control type="phone" placeholder="Please enter vaild Phone Number" required value={Reader.phone} onChange={(e) => SetReadrs({ ...Reader, phone: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="regiser-email">
                    <Form.Control type="email" placeholder="Please enter vaild Email" required value={Reader.email} onChange={(e) => SetReadrs({ ...Reader, email: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="regiser-password">
                    <Form.Control type="password" placeholder="Please enter vaild Password" required value={Reader.password} onChange={(e) => SetReadrs({ ...Reader, password: e.target.value })} />
                </Form.Group>
                <Button className="btn btn-dark w-100" variant="primary" type="submit">
                    Add New Reader
                </Button>
            </Form>
        </div>
    );
};
export default AddReader;