import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faBiking, faAnchor, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../css/header.css';

function HeaderIcons() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px' }}>
                <div>
                    <Link to={"/"}>
                        <FontAwesomeIcon icon={faHome} className="headerTabIcons" />
                    </Link>
                </div>
                <div>
                    <Link to={"/wallet"}>
                        <FontAwesomeIcon icon={faWallet} className="headerTabIcons" />
                    </Link>
                </div>
                <div>
                    <Link to={"/newride"}>
                        <FontAwesomeIcon icon={faBiking} className="headerTabIcons" />
                    </Link>
                </div>
                {/* <div>
                    <Link to={"/notifications"}>
                        <FontAwesomeIcon icon={faBell} className="headerTabIcons" />
                    </Link>
                </div> */}
                <div>
                    <Link to={"/dockingports"}>
                        <FontAwesomeIcon icon={faAnchor} className="headerTabIcons" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HeaderIcons
