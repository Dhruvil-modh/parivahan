import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px' }}>
            <div className="headerLogo" onClick={() => { history.push('/masthead'); }} style={{ cursor: 'pointer' }}>
                Parivahan
            </div>
            <div>
                <FontAwesomeIcon icon={faUser} className="headerIcons" onClick={() => { history.push('/userprofile'); }}
                    style={{ cursor: 'pointer' }} />
            </div>
        </div>
    )
}

export default Header
