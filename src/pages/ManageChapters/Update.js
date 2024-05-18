
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "../../css/AddBooks.css";
import { useParams } from "react-router-dom";
import { getAuthUser } from "../../helper/Storege";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Update = (e) => {


    const auth = getAuthUser();

    let { id } = useParams();


    const [chapter, setChapter] = useState({
        title: "",
        description: "",
        book_id: id,
        err: "",
        loading: false,
        successMessage: null,
        reload: 0
    },);


    const updateChapter = (e) => {
        e.preventDefault();
        setChapter({ ...chapter, loading: true, err: [] });

        axios
            .put("http://localhost:4000/chapters/", + id, {
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
                    ...chapter, loading: false, err: null, reload: chapter.reload + 1,

                    successMessage: "chapter Created Successfully !"
                });
            })
            .catch((errors) => {
                setChapter({ ...chapter, loading: false, });
            })
    };


    return (
        <div className="Add-container" >
            <h1>Update This Chapter</h1>
            <Alert variant="danger" className="p-2">
                This is a sample Alert
            </Alert>
            <Alert variant="success" className="p-2">
                This is a sample Alert
            </Alert>

            <Form onSubmit={updateChapter}>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" placeholder="Please enter vaild Chapter Title" value={chapter.title} onChange={(e) => setChapter({ ...chapter, title: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <textarea placeholder="Description" className="form-control" rows={5} value={chapter.description} onChange={(e) => setChapter({ ...chapter, description: e.target.value })}></textarea>
                </Form.Group>
                <Button className="btn btn-dark w-100" variant="primary" type="submit">
                    Update Chapter
                </Button>
            </Form>
        </div>
    );
};
export default Update;