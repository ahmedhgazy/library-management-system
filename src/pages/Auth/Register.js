import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { getAuthUser } from "../../helper/Storege";
import { setAuthUser } from "../../helper/Storege";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Register = () => {
    let { id } = useParams();

    const auth = getAuthUser();
    const [usres, setUsers] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
    });
    useEffect(() => {
        setUsers({ ...usres, loading: true });
        axios
            .get("http://localhost:4000/auth")
            .then((resp) => {
                setUsers({ ...usres, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setUsers({ ...usres, loading: false, err: "something went wrong please try agein later" });
            })
    }, [usres.reload]);
    const deleteUser = (id) => {
        axios
            .delete("http://localhost:4000/auth/" + id, {
                headers: {
                    token: auth.token,
                },
            })
            .then((resp) => {
                setUsers({ ...usres, reload: usres.reload + 1 });
            })

            .catch((err) => { });


    };

    return (
        <>
            <div className="header d-flex justify-content-between m-5">
                <h3 className="text-center mb-3">Manage Readers</h3>
                <Link to={'/AddReader'} className="btn btn-success">Add New Reader</Link>


            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usres.results.map((user) => (<tr>
                        <td key={user.id}>{user.id}</td>
                        <td>
                            {user.name}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>
                            <button className="btn btn-sm btn-danger" onClick={(e) => { deleteUser(user.id) }} >Delete</button>
                            <Link to={'/UpdateReader/' + user.id} className="btn btn-sm btn-primary mx-2">Update</Link>

                        </td>
                    </tr>))}


                </tbody>
            </Table>

        </>
    );
};
export default Register;