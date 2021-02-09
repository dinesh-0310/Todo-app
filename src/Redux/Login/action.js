import axios from 'axios'
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE} from './actionTypes'

export const loginReq = () =>({
    type: LOGIN_REQUEST
})

export const loginSuccess = (payload) =>({
    type: LOGIN_SUCCESS,
    payload
})

export const loginFailure = (err) => ({
    type: LOGIN_FAILURE,
    payload: err
})

export const loginUserData = ({password, username}) => dispatch =>{
    dispatch(loginReq());

    var config = {
        method: 'POST',
        url: 'https://masai-api-mocker.herokuapp.com/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : {
            password, username
        }
    };
    axios(config)
        .then(res => dispatch(loginSuccess({data: res.data, username: username})))
        .catch(err => dispatch(loginFailure(err)))
}