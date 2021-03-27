import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Notifications() {
    return (
        <>
            <h1>Notifications Page</h1>
            <br/><br />
            <Link to={"/"}>
                <Button type="submit" name="home" className="userProfileButton"
                    style={{ border: '1px solid black', backgroundColor: 'black' }}>
                    Home
                </Button>
            </Link>
            &nbsp;&nbsp;
            <Link to={"/wallet"}>
                <Button type="submit" name="logout" className="userProfileButton"
                    style={{ border: '1px solid black', backgroundColor: 'black' }}>
                    Wallet
                </Button>
            </Link>
            &nbsp;&nbsp;
            <Link to={"/newride"}>
                <Button type="submit" name="logout" className="userProfileButton"
                    style={{ border: '1px solid black', backgroundColor: 'black' }}>
                    New Ride
                </Button>
            </Link>
            &nbsp;&nbsp;
            <Link to={"/notifications"}>
                <Button type="submit" name="logout" className="userProfileButton"
                    style={{ border: '1px solid black', backgroundColor: 'black' }}>
                    Notifications
                </Button>
            </Link>
            &nbsp;&nbsp;
            <Link to={"/dockingports"}>
                <Button type="submit" name="logout" className="userProfileButton"
                    style={{ border: '1px solid black', backgroundColor: 'black' }}>
                    Docking Port
                </Button>
            </Link>
        </>
    )
}

export default Notifications
