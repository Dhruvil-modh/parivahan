import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { formatTime, charge } from '../utils';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
import { Button, Card } from 'react-bootstrap';
import Header from '../models/Header';

function RideSummary() {
    const { currentUser } = useAuth();
    const [ride, setRide] = useState(null);
    const [port, setPort] = useState(null);
    const [bike, setBike] = useState(null);
    const params = useParams();
    const rideId = params.rideId;
    const history = useHistory();
    const [wallet, setWallet] = React.useState(null);

    const fetchPort = async (sp) => {
        axios({
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
        axios({
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

    const fetchWallet = async () => {
        axios({
            url: '/wallet/',
            method: 'GET',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            const data = response.data;
            setWallet(data);
        }).catch(() => {
            alert("Error in retrieving Data of Wallet Data!!");
        });
    }

    React.useEffect(() => {
        axios({
            url: '/rides/ridesummary/' + rideId,
            method: 'GET',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            const data = response.data;
            setRide(data);
            fetchPort(data.startingPort);
            fetchBike(data.bikeId);
            fetchWallet();
        }).catch(() => {
            alert("Error in retrieving Data of Ride!!");
        });
    }, [currentUser, rideId]);

    return (
        <div>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                <Card style={{ marginRight: '20px', marginBottom: '10px', marginLeft: '20px', border: '1px solid black' }}>
                    <Card.Body>
                        <Card.Title>Ride Summary</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"><b>Ride ID:</b> {ride && ride._id}</Card.Subtitle>
                        <Card.Text>
                            <br />
                            <b>Bike Model:</b> {bike && bike.model} <br />
                            <b>Name of Rider:</b> {currentUser.name} <br />
                            <b>PickUp Station:</b> {port && port.name} <br />
                            <b>Starting Time:</b> {moment.unix((ride && ride.startingTime) / 1000).format("DD MMM, YYYY hh:mm a")} <br />
                            <b>Ending Time:</b> {moment.unix((ride && ride.endingTime) / 1000).format("DD MMM, YYYY hh:mm a")} <br />
                            <b>Total Time:</b> {formatTime(ride && ride.totalTime)} <br />
                            <b>Total Charge:</b> {charge(ride && ride.totalTime)} Points <br />
                        </Card.Text>
                        <br/>
                        <Card.Footer className="text-muted">Remaining Points: {wallet && wallet.points}</Card.Footer>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button type="submit" name="logout" onClick={() => { history.replace('/'); }} className="userProfileButton"
                                style={{ border: '1px solid black', backgroundColor: 'black' }}>
                                Home
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default RideSummary
