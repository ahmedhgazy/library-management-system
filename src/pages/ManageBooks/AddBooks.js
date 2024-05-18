import React, { useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "../../css/AddBooks.css";
import axios from "axios";
import { getAuthUser } from "../../helper/Storege";




const AddBooks = () => {
    const auth = getAuthUser();

    const [book, setBook] = useState({
        name: "",
        description: "",
        field: "",
        author: "",
        publication_date: "",
        err: "",
        loading: false,
        successMessage: null,
    });
    const image_url = useRef(null);
    const pdf_url = useRef(null);
    const createBook = (e) => {
        e.preventDefault();
        setBook({ ...book, loading: true });
        const formData = new FormData();
        formData.append("name", book.name);
        formData.append("description", book.description);
        formData.append("field", book.field);
        formData.append("author", book.author);
        formData.append("publication_date", book.publication_date);
        if (pdf_url.current.files && pdf_url.current.files[0]) {
            formData.append("pdf_url", pdf_url.current.files[0]);
        }

        if (image_url.current.files && image_url.current.files[0]) {
            formData.append("image_url", image_url.current.files[0]);
        }


        axios
            .post("http://localhost:4000/books", formData, {
                headers: {
                    token: auth.token,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((resp) => {
                setBook({
                    name: "",
                    description: "",
                    field: "",
                    author: "",
                    publication_date: "",
                    err: null,
                    loading: false,
                    successMessage: "Book Created Successfully !"
                });
                image_url.current.value = null;
                pdf_url.current.value = null;

            })
            .catch((err) => {
                setBook({
                    ...book, loading: false, successMessage: null, err: "something went worng please try agein later !"
                });


            })

    };
    return (
        <div className="Add-container" >
            <h1>Add New Book</h1>
            {book.err && (<Alert variant="danger" className="p-2">
                {book.err}
            </Alert>)}
            {book.successMessage && (
                <Alert variant="success" className="p-2">
                    {book.successMessage}
                </Alert>

            )}


            <Form onSubmit={createBook}>
                <Form.Group className="mb-3">
                    <Form.Control value={book.name} onChange={(e) => setBook({ ...book, name: e.target.value })} type="text" placeholder="Please enter vaild Book Name lease 10 characters" required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <textarea value={book.description} onChange={(e) => setBook({ ...book, description: e.target.value })} placeholder="Description lease 20 characters" className="form-control" rows={5} required></textarea>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Please enter vaild Book Author lease 10 characters" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Please enter vaild Book Field lease 10 characters" value={book.field} onChange={(e) => setBook({ ...book, field: e.target.value })} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Please enter vaild Book Publication date" value={book.publication_date} onChange={(e) => setBook({ ...book, publication_date: e.target.value })} required />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>please upload book image here</Form.Label>
                    <Form.Control type="file" ref={image_url} required />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>please upload book pdf here</Form.Label>
                    <Form.Control type="file" ref={pdf_url} required />
                </Form.Group>


                <Button className="btn btn-dark w-100" variant="primary" type="submit">
                    Add New Book
                </Button>
            </Form>
        </div>
    );
};
export default AddBooks;