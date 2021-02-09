import React from 'react';
import {Switch, Route} from 'react-router-dom'
import { Dashboard } from '../Components/Dashboard';
import Login from '../Components/Login';
import Register from '../Components/Register';
import { CreatePage } from '../Components/CreatePage';
import { EditPage } from '../Components/EditPage';
import {Summary} from '../Components/Summary'
import {PrivateRoute} from './PrivateRoutes'

export const Routes = () =>{
    return(
        <>
          
            <Switch>
                <Route path="/register" exact render ={()=> <Register />} />
                <Route path="/login" exact render={()=> <Login />} />
                <Route path="/" exact render={() => <Dashboard/>} />
                <PrivateRoute path="/create_task" exact Component={CreatePage} />
                <PrivateRoute path="/edit_task/:id" exact  Component={EditPage}  />
                <PrivateRoute path="/summary" exact Component={Summary} />
            </Switch>
        </>
    )
}