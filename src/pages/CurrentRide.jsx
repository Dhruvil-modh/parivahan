import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import moment from 'moment';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../models/Header';

// For Timer
import useTimer from '../Services/useTimer';
import { formatTime, charge } from '../utils';

function CurrentRide() {
    const { currentUser } = useAuth();
    const [ride, setRide] = useState(null);
    const [rideId, setRideId] = useState(null);
    const [port, setPort] = useState(null);
    const [bike, setBike] = useState(null);
    const history = useHistory();
    const { timer, isActive, isPaused, handleStart, handlePause, handleResume, handleReset } = useTimer(0);

    if (!isActive && !isPaused) {
        handleStart();
    }

    React.useEffect(() => {
        axios({
            url: '/rides/currentride',
            method: 'GET',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            const data = response.data;
            setRide(data);
            setRideId(data.rideId);
            fetchPort(data.startingPort);
            fetchBike(data.bikeId);
        }).catch(() => {
            alert("Error in retrieving Data of Ride Data!!");
        });
    }, [currentUser]);

    const fetchPort = async (sp) => {
        await axios({
            url: '/ports/' + sp,
            method: 'GET',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            const data = response.data;
            setPort(data);
        }).catch(() => {
            alert("Error in retrieving Data of Port Data!!");
        });
    }

    const fetchBike = async (bikeId) => {
        await axios({
            url: '/bikes/' + bikeId,
            method: 'GET',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            const data = response.data;
            setBike(data);
        }).catch(() => {
            alert("Error in retrieving Data of Bike Data!!");
        });
    }

    const chargePoints = async () => {
        const points = charge(timer);
        await axios({
            url: '/wallet/charges',
            method: 'POST',
            data: {
                points: points
            },
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            handleReset();
            history.replace('/ridesummary/' + rideId);
        }).catch(() => {
            alert("Error in retrieving Data of Wallet!!");
        });
    }

    const endRide = async () => {
        const tt = timer;
        const points = charge(tt);
        await axios({
            url: '/rides/endride',
            method: 'POST',
            data: {
                rideId: rideId,
                tt: tt,
                points: points
            },
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            chargePoints();
        }).catch(() => {
            alert("Error in retrieving Data of Ride Ending!!");
        });
    }

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <Card style={{ marginRight: '20px', marginBottom: '10px', marginLeft: '20px', border: '1px solid black' }}>
                    <Card.Body>
                        <Card.Title>Current Ride</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"><b>Ride ID:</b> {ride && ride._id}</Card.Subtitle>
                        <Card.Text>
                            <br />
                            <b>Bike:</b> {bike && bike.model} <br/>
                            <b>Name of Rider:</b> {currentUser.name} <br />
                            <b>PickUp Station:</b> {port && port.name} <br />
                            <b>Starting Time:</b> {moment.unix((ride && ride.startingTime) / 1000).format("DD MMM, YYYY hh:mm a")}
                        </Card.Text>
                        <br />
                        <Card.Footer className="text-muted">{formatTime(timer)}</Card.Footer>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            {
                                !isActive && !isPaused ?
                                    <Button type="submit" name="logout" onClick={handleStart} className="userProfileButton"
                                        style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                        Start Ride
                                    </Button>
                                    : (
                                        isPaused ?
                                            <Button type="submit" name="logout" onClick={handlePause} className="userProfileButton"
                                                style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                                Pause Ride
                                            </Button> :
                                            <Button type="submit" name="logout" onClick={handleResume} className="userProfileButton"
                                                style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                                Resume Ride
                                            </Button>
                                    )
                            }
                            <Button type="submit" name="logout" onClick={endRide} className="userProfileButton"
                                style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                End Ride
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default CurrentRide
