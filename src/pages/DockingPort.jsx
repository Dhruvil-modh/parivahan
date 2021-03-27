import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function DockingPort() {
    return (
        <>
            <h1>Docking Port Page</h1>
            <br/><br />
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <Link to={"/"}>
                        <Button type="submit" name="logout" className="userProfileButton"
                            style={{ border: '1px solid black' }}>
                            Home
                        </Button>
                    </Link>
                </div>
                {/* &nbsp;&nbsp; */}
                <div>
                    <Link to={"/newride"}>
                        <Button type="submit" name="logout" className="userProfileButton"
                            style={{ border: '1px solid black' }}>
                            New Ride
                        </Button>
                    </Link>
                </div>
                {/* <div>
                    <Link to={"/notifications"}>
                        <Button type="submit" name="logout" className="userProfileButton"
                            style={{ border: '1px solid black' }}>
                            Notifications
                        </Button>
                    </Link>
                </div> */}
                <div>
                    <Link to={"/wallet"}>
                        <Button type="submit" name="logout" className="userProfileButton"
                            style={{ border: '1px solid black' }}>
                            Wallet
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default DockingPort
