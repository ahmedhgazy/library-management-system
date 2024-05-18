import React, { useEffect, useState } from "react";
import "../../css/BookDetails.css";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useParams } from "react-router";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";
import { getAuthUser } from "../../helper/Storege";



const BookDetails = () => {
    let { id } = useParams();
    const auth = getAuthUser();
    const [book, setBook] = useState({
        loading: true,
        result: [],
        err: null,
        successMessage: null,
    });
    useEffect(() => {
        setBook({ ...book, loading: true });
        axios
            .get("http://localhost:4000/books/" + id, {
                headers: {
                    token: auth.token,
                },
            }

            )
            .then((resp) => {
                setBook({ ...book, result: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setBook({ ...book, loading: false, err: "something went wrong please try agein later" });
            });
    }, []);

    const addRequest = (id) => {
        axios
            .get("http://localhost:4000/requsets/" + id, {
                headers: {
                    token: auth.token,
                },
            })
            .then((resp) => {
                setBook({
                    ...book, reload: book.reload + 1, loading: false,
                    successMessage: "Requst send Successfully !"
                });
            })

            .catch((err) => { });


    };
    return (

        <div className="book-delatils-contanier p-5">
            {/* loader */}
            {book.loading === true && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            {/* delatils book */}
            {book.loading === false && book.err == null && (
                <>

                    <div className="row">
                        <div className="col-4">
                            <img className="book-image" src={book.result.image_url} alt={book.result.name} />
                        </div>
                        <div className="col-8">
                            <h3>{book.result.name}</h3>
                            <hr></hr>
                            <p><b>Description</b></p>
                            <p>
                                {book.result.description}
                            </p>
                            <hr></hr>
                            <p><b>Author:</b> {book.result.author}</p>
                            <hr></hr>
                            <p><b>Field:</b>{book.result.field}</p>
                            <hr></hr>
                            <p><b>Publication date:</b>{book.result.publication_date}</p>
                        </div>
                    </div>
                    <div className="header d-flex justify-content-between mb-6 p-3">
                        <h3 className="text-center mb-3">Chapters Book</h3>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                            <tr>

                                <th>Chapter Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>


                        <tbody>
                            {book.result.chapters.map((chapters) =>
                                <tr key={chapters.id}>


                                    <td>{chapters.title}</td>
                                    <td>{chapters.description}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>



                    {/* handel no chapters */}
                    {
                        book.result.chapters.length === 0 && (
                            < Alert variant="info" className="p-2">
                                there is no chapters for this book
                            </Alert>
                        )
                    }




                    <div className="d-grid gap-2 " style={{ width: '50%' }}>
                        <Button variant="primary" size="lg" onClick={(e) => { addRequest(id) }}>
                            Send a request
                        </Button>
                    </div>
                    {book.successMessage && (
                        <Alert variant="success" className="p-2">
                            {book.successMessage}
                        </Alert>

                    )}
                </>
            )}
            {/* error handling */}
            {book.loading === false && book.err != null && (
                <Alert variant="danger" className="p-2">
                    {book.err}
                </Alert>

            )}


        </div>
    );
};
export default BookDetails;