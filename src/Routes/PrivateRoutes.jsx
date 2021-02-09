import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

export const PrivateRoute = ({Component, ...rest})=>{
    const isAuth = useSelector(state => state.login.isAuth)
    return(
        <Route {...rest} render={(props)=> (
            isAuth ? <Component {...props} />
                    : <Redirect to ="/login" />
        )}/>
    )
}
