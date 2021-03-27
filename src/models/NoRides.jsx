import React from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NoRides() {
    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Oops..</h2>
                            <br />
                            <p className="text-center mb-4">No Ride Found..!!</p>
                            <br />
                            <Link to="/newride">
                                <Button className="w-100"
                                    type="submit" name="rideNow"
                                    style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                    Ride Now
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default NoRides
