import {USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAILURE} from './actionTypes';
import axios from 'axios'

export const userProfileRequest = () => ({
    type : USER_PROFILE_REQUEST
})

export const userProfileSuccess = payload =>({
    type : USER_PROFILE_SUCCESS,
    payload
})

export const userProfileFailure = payload =>({
    type : USER_PROFILE_FAILURE,
    payload
})

export const userProfile = (username,token) => dispatch =>{
    console.log(username, token);
    dispatch(userProfileRequest())
    var config = {
        method: 'GET',
        url: `https://masai-api-mocker.herokuapp.com/user/${username}`,
        headers: { 
          'Authorization': `Bearer ${token}`
        }
    };

    return axios(config)
        .then(res=> dispatch(userProfileSuccess(res.data)))
        .catch(err => dispatch(userProfileFailure(err)))
}
