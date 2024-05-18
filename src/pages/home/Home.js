import React, { useEffect, useState } from "react";
import BookCard from "../../component/BookCard";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { getAuthUser } from "../../helper/Storege";


const Home = () => {
    const auth = getAuthUser();

    const [books, setBooks] = useState({
        loading: true,
        results: [],
        err: null,
        reload: 0
    });
    const [search, setSearch] = useState("");

    useEffect(() => {
        setBooks({ ...books, loading: true });
        axios
            .get("http://localhost:4000/books",
                {
                    params: { search: search },
                    headers: {
                        token: auth.token,
                    },
                }

            )
            .then((resp) => {
                setBooks({ ...books, results: resp.data, loading: false, err: null });
            })
            .catch((err) => {
                setBooks({ ...books, loading: false, err: "something went wrong please try agein later" });
            })
    }, [books.reload]);
    const searchBooks = (e) => {
        e.preventDefault();
        setBooks({ ...books, reload: books.reload + 1 });
    };

    return (
        <div className="home-container p-5">
            {/* loader */}
            {books.loading === true && (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            {/* List of books */}
            {books.loading === false && books.err == null && (
                <>
                    {/* filter books */}
                    <Form onSubmit={searchBooks}>
                        <Form.Group className="mb-3 d-flex">
                            <Form.Control type="text" placeholder="Search For Books" className="rounded-0" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className="btn btn-dark rounded-0">Search</button>
                        </Form.Group>
                    </Form>
                    {/* lists of books */}
                    <div className="row">
                        {books.results.map((book) => (
                            <div className="col-3 card-book-container" key={book.id}>

                                <BookCard name={book.name} description={book.description} image={book.image_url} id={book.id} />
                            </div>
                        ))}

                    </div>
                </>

            )}
            {/* error handling */}
            {books.loading === false && books.err != null && (
                <Alert variant="danger" className="p-2">
                    {books.err}
                </Alert>

            )}
            {books.loading === false && books.err == null && books.results.length === 0 && (
                <Alert variant="danger" className="p-2">
                    No Books found ,please try agein !
                </Alert>

            )}

        </div>


    );
};
export default Home;