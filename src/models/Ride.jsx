import React, { useState } from 'react';
import axios from '../Services/axios';
import { useAuth } from '../contexts/AuthContext';
import { formatTime, charge } from '../utils';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiking, faUser, faLocationArrow, faMapMarkedAlt, faHourglassStart, faHourglassEnd, faStopwatch, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';

function Ride({ rideId }) {
    const { currentUser } = useAuth();
    const [ride, setRide] = useState(null);
    const [port, setPort] = useState(null);
    const [bike, setBike] = useState(null);

    const fetchPort = async (sp) => {
        axios({
            url: '/ports/' + sp,
            method: 'GET'
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
            method: 'GET'
        }).then((response) => {
            const data = response.data;
            setBike(data);
        }).catch(() => {
            alert("Error in retrieving Data of Bike Data!!");
        });
    }

    React.useEffect(() => {
        axios({
            url: '/rides/ridesummary/' + rideId,
            method: 'GET'
        }).then((response) => {
            const data = response.data;
            setRide(data);
            fetchPort(data.startingPort);
            fetchBike(data.bikeId);
        }).catch(() => {
            alert("Error in retrieving Data of Ride!!");
        });
        return () => {
            setRide(null);
        }
    }, [currentUser, rideId]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px', width: '100%' }}>
            <Card style={{ marginRight: '20px', marginBottom: '10px', marginLeft: '20px', border: '1px solid black' }}>
                <Card.Body>
                    <Card.Title>Ride Summary</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{ride && ride._id}</Card.Subtitle>
                    <Card.Text>
                        <br />
                        <FontAwesomeIcon icon={faBiking}/> - {bike && bike.model} <br />
                        <FontAwesomeIcon icon={faUser}/> -  {currentUser.name} <br />
                        <FontAwesomeIcon icon={faLocationArrow}/> - {port && port.name} <br />
                        <FontAwesomeIcon icon={faMapMarkedAlt}/> - Remaining <br />
                        <FontAwesomeIcon icon={faHourglassStart}/> -  {moment.unix((ride && ride.startingTime) / 1000).format("DD MMM, YYYY hh:mm a")} <br />
                        <FontAwesomeIcon icon={faHourglassEnd}/> - {moment.unix((ride && ride.endingTime) / 1000).format("DD MMM, YYYY hh:mm a")} <br />
                        <FontAwesomeIcon icon={faStopwatch}/> -  {formatTime(ride && ride.totalTime)} <br />
                        <FontAwesomeIcon icon={faMoneyBillAlt}/> - {charge(ride && ride.totalTime)} Points <br />
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Ride
