import React, { useRef, useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import AuthService from '../Services/AuthService';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not Match');
        }

        try {
            setError('');
            setLoading(true);
            // await signUp(emailRef.current.value, passwordRef.current.value);
            register();
            setLoading(false);
        } catch {
            setError('Failed to Create an Account');
        }
    }

    const register = () => {
        AuthService.register({
            name: nameRef.current.value,
            username: emailRef.current.value,
            contact: contactRef.current.value,
            password: passwordRef.current.value,
          }).then(data=>{
            console.log(data);
            const { isRegisterd } = data;
            if(isRegisterd){
                setMessage('User Registerd!!');
                M.toast({html:"Welcome to Parivahan Inc. Family",classes:"#43a047 green darken-1"});
                history.replace('/login');
            } else if(!isRegisterd) {
                setError('User Already Registered!!');
            }
            else
                setError('Something went wrong!!');
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
                            <h2 className="text-center mb-4">Register</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {/* {error} */}
                            {message && <Alert variant="success">{message}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" ref={nameRef} required/>
                                </Form.Group>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required/>
                                </Form.Group>
                                <Form.Group id="contact">
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Control type="text" ref={contactRef} required/>
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required/>
                                    <span style={{ color: 'grey', fontSize: '10px' }}>&#9679; Password must be 6 characters long</span>
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required/>
                                </Form.Group>
                                <Button className="w-100" disabled={loading}
                                    type="submit" name="sign up"
                                    style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                    Register
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to={"/login"}>Log In</Link>
                    </div>
                    <br/>
                </div>
            </Container>
        </>
    )
}

export default Register
