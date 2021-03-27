import React, { useState } from 'react';
import axios from '../Services/axios';
import { useAuth } from '../contexts/AuthContext';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarDay, faWallet, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

function Transection({ transectionId }) {
    const { currentUser } = useAuth();
    const [transection, setTransection] = useState(null);

    React.useEffect(() => {
        axios({
            url: '/wallet/transaction/' + transectionId,
            method: 'GET'
        }).then((response) => {
            const data = response.data;
            setTransection(data);
        }).catch(() => {
            alert("Error in retrieving Data of Transection!!");
        });
        return () => {
            setTransection(null);
        }
    }, [currentUser, transectionId]);

    return (
        <div>
            <Card style={{ marginRight: '20px', marginBottom: '10px', marginLeft: '20px', border: '1px solid black' }}>
                <Card.Body>
                    <Card.Title><FontAwesomeIcon icon={faRupeeSign}/> {transection && transection.amount}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{transection && transection._id}</Card.Subtitle>
                    <Card.Text style={{ marginTop: '12px' }}>
                        <FontAwesomeIcon icon={faWallet}/> - {transection && transection.points} Points <br />
                        <FontAwesomeIcon icon={faUser}/> -  {currentUser.name} <br />
                        <FontAwesomeIcon icon={faCalendarDay}/> -  {moment.unix((transection && transection.date) / 1000).format("DD MMM, YYYY hh:mm a")}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Transection
