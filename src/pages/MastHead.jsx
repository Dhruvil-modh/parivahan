import React from 'react';
import { Card, Container } from 'react-bootstrap';

function MastHead() {

    return (
        <div style={{ overflowY: 'scroll', height: '100vh', marginTop: '10px', marginBottom: '10px' }}>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                <div className="w-100">
                    <Card>
                        <Card.Body>
                            <div className="visit">
                                <div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', alignItems: 'center' }}>
                                        <p style={{ fontSize: '30px', fontWeight: 'bold' }}>Team Parivahan</p>
                                        <p style={{ fontSize: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <font><font style={{ fontWeight: 'bold' }}>Co-Founder, CEO &amp; Chief Industrial Designer:</font> Zeelrajsinh Mahida</font>
                                            <font><font style={{ fontWeight: 'bold' }}>Co-Founder &amp; Chief Operating Officer:</font> Dhruvil Modh</font>
                                            <font><font style={{ fontWeight: 'bold' }}>Chief Design Officer:</font> Shubham Patel</font>
                                            <font><font style={{ fontWeight: 'bold' }}>Core Team Member:</font> Keyur Patel</font>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    )
}

export default MastHead