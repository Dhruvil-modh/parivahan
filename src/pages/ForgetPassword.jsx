import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';

function ForgetPassword() {
    const [loginEmail, setLoginEmail] = useState("");
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            forgetPassword();
        } catch {
            setError('Failed to Sign In');
        }
        setLoading(false);
    }

    const forgetPassword = () => {
        AuthService.forgetPassword({
            username: loginEmail,
        }).then(data => {
            const { isMailed, msg } = data;
            if(isMailed){
                setMessage(msg);
                setLoginEmail("");
            } else {
                setError(msg);
            }
        });
    };
    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Forget Password</h2>
                            {/* {error && <Alert variant="danger">{error}</Alert>} */}
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                                </Form.Group>
                                <Button className="w-100" disabled={loading}
                                    type="submit" name="login"
                                    style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                    Generate New Password
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to={"/register"}>Sign Up</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ForgetPassword
