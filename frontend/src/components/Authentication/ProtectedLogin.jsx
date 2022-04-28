import React from 'react';
import {Route, Navigate} from 'react-router-dom';
function ProtectedLogin({auth, elem:Element, ...rest})
{
    return(
        <Route {...rest} render = {props => {
            if(auth)
            {
                return <Navigate to = "/landing" />
            }
            else
            {
                return <Element {...props}/>
            }
        }
            } />
    );
}
export default ProtectedLogin;