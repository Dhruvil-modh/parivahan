import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser, isAuthenticated } = useAuth();

    return (
        <>
            {
                isAuthenticated ?
                    (
                        <Route
                            {...rest}
                            render={props => {
                                return currentUser.active === 1 ? <Component {...props} /> : <Redirect to={"/deactive"} />
                            }}>

                        </Route>
                    )
                    :
                    (
                        <Redirect to={"/login"} />
                        // verified === false ? (
                        //     (
                        //         <Redirect to={"/sendemail"} />
                        //     )
                        // ) : (
                        //         // active === 0 ? (
                        //         //     (
                        //         //         <Redirect to={"/deactive"} />
                        //         //     )
                        //         // ) : (
                        //         //         <Redirect to={"/login"} />
                        //         //     )
                        //         <Redirect to={"/login"} />
                        //     )
                    )
            }
        </>
    )
}

export default PrivateRoute
