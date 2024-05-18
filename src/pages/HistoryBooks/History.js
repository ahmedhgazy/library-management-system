import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { getAuthUser } from "../../helper/Storege";
import { useParams } from "react-router";



const History = () => {

    const auth = getAuthUser();
    let { id } = useParams();
    const [history, setHistory] = useState({
        loading: true,
        result: [],
        err: null,
        reload: 0
    });
    useEffect(() => {
        setHistory({ ...history, loading: true });
        axios
            .get("http://localhost:4000/history", {
                headers: {
                    token: auth.token,
                },
            })
            .then((resp) => {
                setHistory({ ...history, result: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setHistory({ ...history, loading: false, err: "something went wrong please try agein later" });
            });
    }, [history.reload]);



    return (
        <div>
            <div className="header d-flex justify-content-between mb-3 p-5">
                <h3 className="text-center mb-3"> Your History Of Book Searches</h3>'


            </div>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>id</th>
                        <th>History</th>
                        <th>Book name you search for it</th>
                    </tr>
                </thead>

                <tbody>
                    {history.result.map((userHistory) => (<tr>
                        <td key={userHistory.id}>{userHistory.id}</td>
                        <td>
                            <p>your searched for this book name</p>
                        </td>
                        <td>{userHistory.history}</td>
                    </tr>))}
                </tbody>
            </Table>



        </div>
    );
};
export default History;