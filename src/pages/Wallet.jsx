import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Header from '../models/Header';
import HeaderIcons from '../models/HeaderIcons';
import '../css/wallet.css';
import { amountToPoint } from '../utils';
import Transection from '../models/Transection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

function Wallet() {
    const { currentUser } = useAuth();
    const [wallet, setWallet] = React.useState(null);
    const [transections, setTransections] = React.useState(null);
    const amountRef = React.useRef(null);
    const [error, setError] = React.useState('');

    React.useEffect(() => {
        axios({
            url: '/wallet/',
            method: 'GET',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            const data = response.data;
            setWallet(data);
            cashTransections();
        }).catch(() => {
            alert("Error in retrieving Data of Wallet Data!!");
        });
        return () => {
            setWallet(null);
        }
    }, [currentUser]);

    const addMoney = (e) => {
        if (!Number(amountRef.current.value))
            return setError('Amount must be a Number');
        if (amountRef.current.value < 50)
            return setError('Amount must be more than 50 INR.');
        const points = amountToPoint(amountRef.current.value);
        axios({
            url: '/wallet/addpoints',
            method: 'POST',
            data: {
                points: points,
                amount: amountRef.current.value,
            },
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            const data = response.data;
            // history.replace('/wallet');
            setError('');
            amountRef.current.value = null;
            setWallet(data);
            cashTransections();
        }).catch(() => {
            alert("Error in retrieving Data of Wallet Data!!");
        });
    }

    const cashTransections = () => {
        axios({
            url: '/wallet/transactions',
            method: 'GET',
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("parivahan_access")
            }
        }).then((response) => {
            const data = response.data;
            setTransections(data.reverse());
        }).catch(() => {
            alert("Error in retrieving Data of Wallet Data!!");
        });
    }

    const onSubmit = e => {
        e.preventDefault();

        addMoney();
    }

    const autoPay = () => {
        alert("Auto Pay on Low Points Feature will be enabled soon...")
    }

    return (
        <>
            <Header />
            <HeaderIcons />
            <div style={{ margin: '10px', padding: '5px', justifyContent: 'center' }}>
                <h3>Parivahan Wallet <br /> <font style={{ fontSize: '15px', fontWeight: 'normal' }}> Total Points: <b> {wallet && wallet.points} </b> Points</font>
                    <br /> <font style={{ fontSize: '15px', fontWeight: 'normal' }}>Total Transected Points:<b>{wallet && wallet.totalPointsUsed}</b> Points</font> </h3>
            </div>
            <div style={{ height: '55vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                <div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form onSubmit={onSubmit} encType="multipart/form-data" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <input type="text" ref={amountRef} placeholder="  &#xF156; Enter Amount" className="addAmount" />
                            <Button type="submit" name="addamount" onClick={onSubmit}
                                style={{ border: '1px solid black', backgroundColor: 'black', marginTop: '20px', marginBottom: '15px' }}>
                                Add
                            </Button>
                        </div>
                        <b style={{ fontSize: '20px'}}> <FontAwesomeIcon icon={faRupeeSign} style={{ fontSize: '16px', marginLeft: '20px' }} /> 1 = 5 Points </b>
                    </form>
                </div>
                <div style={{ margin: '10px', padding: '5px', justifyContent: 'center' }}>
                    <div onClick={autoPay}>
                        <FontAwesomeIcon icon={faStopwatch} style={{ marginRight: '2px' }}/> Auto Pay
                    </div>
                </div>
                <div style={{ margin: '10px', padding: '5px', justifyContent: 'center' }}>
                    <font style={{ fontSize: '20px' }}><b>Transaction History</b></font>
                </div>
                <div>
                    {
                        transections && transections.length !== 0 && transections.map((transection) => (
                            <Transection transectionId={transection} key={transection} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Wallet
