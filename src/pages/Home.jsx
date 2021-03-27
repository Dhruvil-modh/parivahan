import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Ride from '../models/Ride';
import Header from '../models/Header';
import HeaderIcons from '../models/HeaderIcons';
import '../App.css';
import NoRides from '../models/NoRides';

function Home() {
    const { currentUser } = useAuth();
    const [rides, setRides] = useState([]);

    const fetchRides = async () => {
        await axios({
            url: '/rides/',
            method: 'GET',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            const data = response.data;
            setRides(data.reverse());
        }).catch(() => {
            alert("Error in retrieving Data of Ride Data!!");
        });
    }

    React.useEffect(() => {
        fetchRides();
        return () => {
            setRides([]);
        }
    }, [currentUser]);

    return (
        <>
            <Header />
            <HeaderIcons /> 
            <div style={{ height: '75vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                {
                    rides ?
                    (
                        rides && rides.length !== 0 && rides.map((ride) => (
                        <Ride rideId={ride} key={ride} />
                    ))
                    ) : (
                        <NoRides />
                    )
                }
            </div>
        </>
    )
}

export default Home
