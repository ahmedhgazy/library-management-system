import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import "../../css/AddBooks.css";
const Add = () => {
    return (
        <div className="Add-container" >
            <h1>Add New Chapter</h1>
            <Alert variant="danger" className="p-2">
                This is a sample Alert
            </Alert>
            <Alert variant="success" className="p-2">
                This is a sample Alert
            </Alert>


        </div>
    );
};
export default Add;