import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import "../../css/ManageBook.css";
import axios from "axios";
import { getAuthUser } from "../../helper/Storege";
const ManageBooks = () => {
    const auth = getAuthUser();
    const [books, setBooks] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
    });
    useEffect(() => {
        setBooks({ ...books, loading: true });
        axios
            .get("http://localhost:4000/books/admin", {
                headers: {
                    token: auth.token,
                },
            })
            .then((resp) => {
                setBooks({ ...books, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setBooks({ ...books, loading: false, err: "something went wrong please try agein later" });
            })
    }, [books.reload]);

    const deleteBook = (id) => {
        axios
            .delete("http://localhost:4000/books/" + id, {
                headers: {
                    token: auth.token,
                },
            })
            .then((resp) => {
                setBooks({ ...books, reload: books.reload + 1 });
            })

            .catch((err) => { });


    };


    return (
        <div className="managebook p-5">
            <div className="header d-flex justify-content-between mb-5">
                <h3 className="text-center mb-3">Manage Books</h3>
                <Link to={'add'} className="btn btn-success">Add New Book</Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.results.map((book) => (<tr>
                        <td key={book.id}>{book.id}</td>
                        <td>
                            <img src={book.image_url} alt={book.name} className="image-book" />
                        </td>
                        <td>{book.name}</td>
                        <td>{book.description}</td>
                        <td>
                            <button className="btn btn-sm btn-danger" onClick={(e) => { deleteBook(book.id) }}>Delete</button>
                            <Link to={"" + book.id} className="btn btn-sm btn-primary mx-2">Update</Link>
                            <Link to={'/' + book.id} className="btn btn-sm btn-info">Show</Link>
                            <Link to={'/Managechapter/' + book.id} className="btn btn-sm btn-dark mx-2">Manage Chapters</Link>
                        </td>
                    </tr>))}


                </tbody>
            </Table>

        </div>
    );
};
export default ManageBooks;