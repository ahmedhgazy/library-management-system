import React, { useEffect, useRef, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "../../css/AddBooks.css";
import axios from "axios";
import { getAuthUser } from "../../helper/Storege";
import { useParams } from "react-router-dom";
const UpdateBooks = () => {

    const auth = getAuthUser();
    let { id } = useParams();
    const [book, setBook] = useState({
        name: "",
        description: "",
        field: "",
        author: "",
        publication_date: "",
        image_url: null,
        pdf_url: null,
        err: "",
        loading: false,
        successMessage: null,
        reload: false,
    });
    const image_url = useRef(null);
    //  const pdf_url = useRef(null);

    const updateBook = (e) => {
        e.preventDefault();
        setBook({ ...book, loading: true });
        const formData = new FormData();
        formData.append("name", book.name);
        formData.append("description", book.description);
        formData.append("field", book.field);
        formData.append("author", book.author);
        formData.append("publication_date", book.publication_date);
        if (image_url.current.files && image_url.current.files[0]) {
            formData.append("image_url", image_url.current.files[0]);

        }
        // if (pdf_url.current.files && pdf_url.current.files[0]) {
        //     formData.append("pdf_url", pdf_url.current.files[0]);
        // }

        axios
            .put("http://localhost:4000/books/" + id, formData, {
                headers: {
                    token: auth.token,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((resp) => {
                setBook({
                    ...book, loading: false, successMessage: "Book updated successfully", err: null,
                });
            })
            .catch((err) => {
                setBook({
                    ...book, loading: false, successMessage: null, err: "something went worng please try agein later !"
                });


            })
    };
    useEffect(() => {

        axios
            .get("http://localhost:4000/books/" + id)
            .then((resp) => {
                setBook({
                    ...book,
                    name: resp.data.name,
                    description: resp.data.description,
                    author: resp.data.author,
                    field: resp.data.field,
                    publication_date: resp.data.publication_date,
                    image_url: resp.data.image_url,
                    // pdf_url: resp.data.pdf_url,

                });

            })
            .catch((err) => {
                setBook({
                    ...book, loading: false, successMessage: null, err: "something went worng please try agein later !"
                });


            })
    }, [book.reload])

    return (
        <div className="Add-container" >
            <h1>Update This Book</h1>
            {book.err && (<Alert variant="danger" className="p-2">
                {book.err}
            </Alert>)}
            {book.successMessage && (
                <Alert variant="success" className="p-2">
                    {book.successMessage}
                </Alert>

            )}
            <Form onSubmit={updateBook}>
                <img alt={book.name} style={{
                    width: "50%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1px solid #ddd",
                    marginBottom: "10px",
                }} src={book.image_url} />
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Please enter vaild Book Name" value={book.name} onChange={(e) => setBook({ ...book, name: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <textarea placeholder="Description" className="form-control" rows={5} value={book.description} onChange={(e) => setBook({ ...book, description: e.target.value })}></textarea>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Please enter vaild Book Author" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Please enter vaild Book Field" value={book.field} onChange={(e) => setBook({ ...book, field: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Please enter vaild Book Publication date" value={book.publication_date} onChange={(e) => setBook({ ...book, publication_date: e.target.value })} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>please upload book image here</Form.Label>
                    <Form.Control type="file" ref={image_url} />
                </Form.Group>
                {/* <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>please upload book pdf here</Form.Label>
                    <Form.Control type="file" ref={pdf_url} />
                </Form.Group> */}


                <Button className="btn btn-dark w-100" variant="primary" type="submit">
                    Update Book
                </Button>
            </Form>
        </div>
    );
};
export default UpdateBooks;