import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import AuthService from '../Services/AuthService';

function NewPassword() {
    const passwordRef = React.useRef();
    const cnfPasswordRef = React.useRef();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const params = useParams();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            changePassword();
        } catch {
            setError('Failed to Sign In');
        }
        setLoading(false);
    }

    const changePassword = () => {
        if (passwordRef.current.value !== cnfPasswordRef.current.value) {
            return setError('Password doesn\'t Match');
        }
        AuthService.changePassword({
            username: params.email,
            password: passwordRef.current.value,
        }).then(data => {
            const { isPasswordChanged, message } = data;
            if(isPasswordChanged) {
                setMessage(message);
                history.replace('/login');
            } else {
                setError(message);
            }
        }).catch(error => {
            setError(error.err);
        })
    };
    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">New Password</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="email">
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <Form.Control type="password" ref={cnfPasswordRef} required />
                                </Form.Group>
                                <Button className="w-100" disabled={loading}
                                    type="submit" name="login"
                                    style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                    Change Password
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default NewPassword
