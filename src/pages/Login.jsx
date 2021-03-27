import React, { useState, useContext } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import AuthService from '../Services/AuthService';
import M from 'materialize-css';

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const authContext = useContext(AuthContext);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            login();
        } catch {
            setError('Failed to Sign In');
        }
        setLoading(false);
    }

    const login = () => {
        AuthService.login({
            username: loginEmail,
            password: loginPassword,
        }).then(data => {
            console.log(data);
            const { token, isAuthenticated, user } = data;
            if (isAuthenticated) {
                localStorage.setItem("parivahan_access",token);
                authContext.setCurrentUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                setMessage('User Looged In!!');
                M.toast({html:"Welcome back to Parivahan Inc.",classes:"#43a047 green darken-1"});
                history.replace('/');
            }
            else
                setError('Email and Password doesn\'t match!!');
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
                            <h2 className="text-center mb-4">Log In</h2>
                            {/* {error && <Alert variant="danger">{error}</Alert>} */}
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                                    <div className="w-100 mt-2" style={{ fontSize: '14px' }}>
                                        Forget Password? <Link to={"/forgetpassword"}>New Password</Link>
                                    </div>
                                </Form.Group>
                                <Button className="w-100" disabled={loading}
                                    type="submit" name="login"
                                    style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                    Log In
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

export default Login
