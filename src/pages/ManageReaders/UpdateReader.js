import React, { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "../../css/AddBooks.css";
import axios from "axios";
import { getAuthUser } from "../../helper/Storege";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateReader = () => {
    const auth = getAuthUser();
    let { id } = useParams();

    const navigate = useNavigate();
    const [Reader, SetReadrs] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        err: "",
        loading: false,
        successMessage: null,
    });
    const UpdateReaderFun = (e) => {
        e.preventDefault();
        SetReadrs({ ...Reader, loading: true });

        axios
            .put("http://localhost:4000/auth/" + id, {
                name: Reader.name,
                phone: Reader.phone,
                email: Reader.email,
                password: Reader.password,
            }, {
                headers: {
                    token: auth.token,
                },
            })
            .then((resp) => {
                SetReadrs({
                    ...Reader, loading: false, successMessage: "Book updated successfully", err: null,
                });
            })
            .catch((err) => {
                SetReadrs({
                    ...Reader, loading: false, successMessage: null, err: "something went worng please try agein later !"
                });


            })

    };
    useEffect(() => {

        axios
            .get("http://localhost:4000/auth/" + id)
            .then((resp) => {
                SetReadrs({
                    ...Reader,
                    name: resp.data.name,
                    phone: resp.data.phone,
                    email: resp.data.email,
                    password: resp.data.password,

                });

            })
            .catch((err) => {
                SetReadrs({
                    ...Reader, loading: false, successMessage: null, err: "something went worng please try agein later !"
                });


            })
    }, [Reader.reload])





    return (<div className="login-container" >

        <h1>Registertion Form</h1>
        {Reader.err && (<Alert variant="danger" className="p-2">
            {Reader.err}
        </Alert>)}
        {Reader.successMessage && (
            <Alert variant="success" className="p-2">
                {Reader.successMessage}
            </Alert>

        )}

        <Form onSubmit={UpdateReaderFun}>
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
    </div>);
};
export default UpdateReader;
