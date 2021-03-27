import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../models/Header';
import moment from 'moment';

function BookRide() {
    const { currentUser } = useAuth();
    const params = useParams();
    const bikeId = params.bikeId;
    const [port, setPort] = useState(null);

    const history = useHistory();
    const [portId, setPortId] = useState(null);

    useEffect(() => {
        axios({
            url: '/bikes/' + bikeId,
            method: 'GET',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            const data = response.data;
            const port = data.portId;
            fetchPort(port);
        }).catch(() => {
            alert("Error in retrieving Data of Bike Ride!!!");
        });
    }, [bikeId]);

    const fetchPort = async (port) => {
        await axios({
            url: '/ports/' + port,
            method: 'GET',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            const data = response.data;
            setPort(data.name);
            setPortId(data._id);
        }).catch(() => {
            alert("Error in retrieving Data of Port Data!!");
        });
    }

    const cancel = () => {
        history.replace('/');
    }

    const startRide = async () => {
        await axios({
            url: '/rides/startride',
            method: 'POST',
            data: {
                bikeId: bikeId,
                startingPort: portId
            },
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            history.replace('/currentride');
        }).catch(() => {
            alert("Error in adding Data of Current Ride!!");
        });
    }

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <Card style={{ marginRight: '20px', marginBottom: '10px', marginLeft: '20px', border: '1px solid black'}}>
                    <Card.Body>
                        <Card.Title>Booking Summary</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"><b>Bike:</b> {bikeId}</Card.Subtitle>
                        <Card.Text>
                            <br/>
                            <b>Name of Rider:</b> {currentUser.name} <br/>
                            <b>PickUp Station:</b> {port} <br />
                            <b>Starting Time:</b> {moment.unix((Date.now()) / 1000).format("DD MMM, YYYY hh:mm a")}
                        </Card.Text>
                        <br/>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Card.Link><Button type="submit" name="logout" onClick={startRide} className="userProfileButton"
                                style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                Start Ride
                            </Button></Card.Link>
                            <Card.Link><Button type="submit" name="logout" onClick={cancel} className="userProfileButton"
                                style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                Cancel Ride
                            </Button></Card.Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default BookRide
