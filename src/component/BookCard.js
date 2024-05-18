import React from "react";
import Card from 'react-bootstrap/Card';
import "../css/BookCard.css";
import { Link } from "react-router-dom";

const BookCard = (props) => {
    return (
        <div>
            <Card>
                <Card.Img className="card-image" variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        {props.description}
                    </Card.Text>
                    <Link className="btn btn-dark w-100" to={"/" + props.id}>Shom More</Link>
                </Card.Body>
            </Card>
        </div>
    );
};
export default BookCard;