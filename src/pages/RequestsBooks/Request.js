import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { getAuthUser } from "../../helper/Storege";
import { useParams } from "react-router";
import "../../css/ManageBook.css";
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';



const Request = () => {


    const auth = getAuthUser();
    let { id } = useParams();
    const [request, setRequest] = useState({
        loading: true,
        result: [],
        err: null,
        reload: 0,
        successMessage: null
    });
    useEffect(() => {
        setRequest({ ...request, loading: true });
        axios
            .get("http://localhost:4000/requsets", {
                headers: {
                    token: auth.token,
                },
            })
            .then((resp) => {
                setRequest({ ...request, result: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setRequest({ ...request, loading: false, err: "something went wrong please try agein later" });
            });
    }, [request.reload]);
    const acceptRequest = (id) => {
        axios
            .get("http://localhost:4000/requsets/" + id, {
                headers: {
                    token: auth.token,
                },
            })
            .then((resp) => {
                setRequest({
                    ...request, reload: request.reload + 1, loading: false,
                    successMessage: "Requst Accept Successfully !"
                });
            })

            .catch((err) => { });


    };
    console.log(id);



    return (
        <div className="managebook p-5">
            {request.successMessage && (
                <Alert variant="success" className="p-2">
                    {request.successMessage}
                </Alert>

            )}
            <div className="header d-flex justify-content-between mb-3">
                <h3 className="text-center mb-3">Requests Books</h3>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Book Id</th>
                        <th>User Name</th>
                        <th>pdf_url</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {request.result.map((request) => (<tr>
                        <td key={request.id}>{request.id}</td>
                        <td>{request.book_id}</td>
                        <td>
                            {request.user_name}
                        </td>
                        <td>
                            <Link to={request.pdf_url} className="btn  btn-info mx-2" target="_blank">the Book pdf</Link>
                        </td>

                        <td>
                            <button className="btn  btn-success mx-2" onClick={(e) => { acceptRequest(request.id) }} >Accept</button>
                            <button className="btn  btn-danger">Decline</button>

                        </td>
                    </tr>))}




                </tbody>
            </Table>

        </div>
    );
};
export default Request;