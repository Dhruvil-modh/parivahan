import React from 'react';
import { Card, Container } from 'react-bootstrap';
import '../App.css';

function Deactive() {

    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center sendMail"
                style={{ height: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">User Account Has been Deactivated!!</h2>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default Deactive
