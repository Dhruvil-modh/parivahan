import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import AuthService from '../Services/AuthService';
import Header from '../models/Header';

function UserProfile() {
    const { currentUser } = useAuth();
    const [error, setError] = React.useState('');
    const history = useHistory();
    const authContext = React.useContext(AuthContext);

    async function handleLogOut() {
        setError('');

        try {
            await AuthService.logout().then(data => {
                if (data.success) {
                    authContext.setCurrentUser(data.user);
                    authContext.setIsAuthenticated(false);
                }
            });
            history.replace("/login");
        } catch {
            setError('Shuny Networks does not want you to leave!!!');
        }
    }

    return (
        <>
            <Header />
            <br/>
            <div>
                <h1>Welcome, {currentUser.name} &nbsp;&nbsp;
                    <Button type="submit" name="logout" onClick={handleLogOut} className="userProfileButton"
                            style={{ border: '1px solid black', backgroundColor: 'black' }}>
                            Log Out
                    </Button>
                </h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>User Details</h1>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <br/><br />
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div>
                    <Link to={"/"}>
                        <Button type="submit" name="home" className="userProfileButton"
                            style={{ border: '1px solid black', backgroundColor: 'black' }}>
                            Home
                        </Button>
                    </Link>
                </div>
                <div>
                    <Link to={"/wallet"}>
                        <Button type="submit" name="wallet" className="userProfileButton"
                            style={{ border: '1px solid black', backgroundColor: 'black' }}>
                            Wallet
                        </Button>
                    </Link>
                </div>
                <div>
                    <Link to={"/newride"}>
                        <Button type="submit" name="newRide" className="userProfileButton"
                            style={{ border: '1px solid black', backgroundColor: 'black' }}>
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
                    <Link to={"/dockingports"}>
                        <Button type="submit" name="ports" className="userProfileButton"
                            style={{ border: '1px solid black', backgroundColor: 'black' }}>
                            Docking Port
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default UserProfile
