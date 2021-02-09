import axios from 'axios';
import {REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE} from './actionTypes';

export const registerReq = () =>({
    type : REGISTER_REQUEST
})

export const registerSuccess = payload => ({
    type : REGISTER_SUCCESS,
    payload
})

export const registerFailure = payload =>({
    type : REGISTER_FAILURE,
    payload
})

export const registerUser = payload => dispatch =>{
    dispatch(registerReq())

    var config = {
        method: 'POST',
        url: 'https://masai-api-mocker.herokuapp.com/auth/register',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : payload
    };

    axios(config)
        .then(res=> dispatch(registerSuccess(res.data)))
        .catch(err => dispatch(registerFailure(err)))
}