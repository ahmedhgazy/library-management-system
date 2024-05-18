import React, { useEffect, useState } from "react";
import "../../css/BookDetails.css";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { Link } from "react-router-dom";
import { getAuthUser } from "../../helper/Storege";
import Form from 'react-bootstrap/Form';


const Managechapter = () => {
    const auth = getAuthUser();
    const navigate = useNavigate();

    let { id } = useParams();
    const [book, setBook] = useState({
        loading: true,
        result: [],
        err: null,
        reload: 0
    });
    useEffect(() => {
        setBook({ ...book, loading: true });
        axios
            .get("http://localhost:4000/books/" + id)
            .then((resp) => {
                setBook({ ...book, result: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setBook({ ...book, loading: false, err: "something went wrong please try agein later" });
            });
    }, [book.reload]);
    const deletechapter = (id) => {
        axios
            .delete("http://localhost:4000/chapters/" + id, {
                headers: {
                    token: auth.token,
                },
            })
            .then((resp) => {
                setBook({ ...book, reload: book.reload + 1 });
            })

            .catch((err) => { });


    };
    const [chapter, setChapter] = useState({
        title: "",
        description: "",
        book_id: id,
        err: "",
        loading: false,
        successMessage: null,
        reload: 0
    }, [book.reload]);


    const CreateChapter = (e) => {
        e.preventDefault();
        setChapter({ ...chapter, loading: true, err: [] });

        axios
            .post("http://localhost:4000/chapters", {
                title: chapter.title,
                description: chapter.description,
                book_id: chapter.book_id
            }, {
                headers: {
                    token: auth.token
                }
            }
            )
            .then((resp) => {
                setChapter({
                    ...chapter, loading: false, err: null,

                    successMessage: "chapter Created Successfully !",

                });

                setBook({ ...book, reload: book.reload + 1 });


            })
            .catch((errors) => {
                setChapter({ ...chapter, loading: false, });
            })
    };






    return (
        <>
            <div className="book-delatils-contanier p-5">
                {/* loader */}
                {book.loading === true && (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )}
                {/* delatils  chapters book */}
                {book.loading === false && book.err == null && (
                    <>

                        <div className="header d-flex justify-content-between mb-6 p-5">
                            <h3 className="text-center mb-3"> Manage Chapters Book</h3>

                        </div>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Chapter Title</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>


                            <tbody>
                                {book.result.chapters.map((chapters) =>
                                    <tr key={chapters.id}>
                                        <td>{chapters.id}</td>
                                        <td>{chapters.title}</td>
                                        <td>{chapters.description}</td>
                                        <td>
                                            <button className="btn btn-sm btn-danger" onClick={(e) => { deletechapter(chapters.id) }}>Delete</button>
                                            <Link to={'/Update/' + chapters.id} className="btn btn-sm btn-primary mx-2">Update</Link>
                                        </td>
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

                    </>
                )}
                {/* error handling */}
                {book.loading === false && book.err != null && (
                    <Alert variant="danger" className="p-2">
                        {book.err}
                    </Alert>

                )}
            </div>

            <div className="Add-container" >
                <h1>Add New Chapter</h1>


                <Form onSubmit={CreateChapter}>
                    <Form.Group className="mb-3" >
                        <Form.Control type="text" placeholder="Please enter vaild Chapter Title lease 10 characters" value={chapter.title} onChange={(e) => setChapter({ ...chapter, title: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <textarea placeholder="Description lease 20 characters" className="form-control" rows={5} value={chapter.description} onChange={(e) => setChapter({ ...chapter, description: e.target.value })}></textarea>
                    </Form.Group>
                    <Button className="btn btn-dark w-100" variant="primary" type="submit">
                        Add New Chapter
                    </Button>
                </Form>
            </div>




        </>



    );
};
export default Managechapter;
