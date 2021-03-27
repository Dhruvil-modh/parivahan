import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import QrReader from 'react-qr-scanner';
import axios from 'axios';
import Header from '../models/Header';
import HeaderIcons from '../models/HeaderIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode, faWindowClose, faAnchor } from '@fortawesome/free-solid-svg-icons';
import '../css/ride.css';

function NewRide() {
    // const bikeId = '604d200827c51f2d28d567be';
    const [bikeId, setBikeId] = React.useState(null);
    const [qrScan, setQrScan] = React.useState(false);
    const history = useHistory();

    const handleError = (err) => {
        console.error(err)
    }

    const handleScanOperation = async (data) => {
        setBikeId(data && data.text);
        if (bikeId !== null || bikeId === undefined) {
            setQrScan(false);
            await axios({
                url: '/bikes/' + bikeId,
                method: 'GET',
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
                }
            }).then((response) => {
                const data = response.data;
                if (data.currentRider === null) {
                    history.push("/bookride/" + bikeId);
                } else {
                    history.push("/biketaken");
                }
            }).catch(() => {
                alert("Error in retrieving Data of Bike Ride!!!");
            });
        }
    }

    const handleScan = () => {
        if (qrScan) {
            setQrScan(false);
        } else {
            setQrScan(true);
        }
    }
    return (
        <>
            <Header />
            <HeaderIcons />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                {
                    qrScan ?
                        (<QrReader
                            delay={100}
                            style={{
                                height: 240,
                                width: 320,
                            }}
                            onError={err => handleError(err)}
                            onScan={data => handleScanOperation(data)}
                        />)
                        :
                        null
                }
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '60px' }}>
                <div>
                    {!qrScan ? (
                        <FontAwesomeIcon icon={faQrcode} className="newRideIcons"
                            onClick={handleScan} />
                    ) : (
                        <FontAwesomeIcon icon={faWindowClose} className="newRideCloseIcon"
                            onClick={handleScan} />
                    )}
                </div>
                <div>
                    <Link to={"/dockingports"}>
                        <FontAwesomeIcon icon={faAnchor} className="newRideIcons"
                            onClick={handleScan} />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NewRide
