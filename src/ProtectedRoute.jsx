import React from 'react';
import { Redirect, Route } from 'react-router';

const Protectedroute = ({ auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                auth ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

export default Protectedroute;
