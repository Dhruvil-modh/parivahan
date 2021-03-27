import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';

function BikeTaken() {
    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Bike is not Available</h2>
                            <Card.Text>
                                Sorry, this bike is taken by another User. <br/>
                                Please, Pick up the another one from the nearby docking port. <br/>
                                Thank you for Coparating!!
                            </Card.Text>
                            <br />
                            <div className="w-100 text-center mt-2">
                                <Link to={"/dockingports"}>
                                    <Button type="submit" name="logout" className="userProfileButton"
                                        style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                        Docking Port
                                    </Button>
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default BikeTaken
