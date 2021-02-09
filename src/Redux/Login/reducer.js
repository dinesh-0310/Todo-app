import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE } from './actionTypes';

const initState = {
    isAuth : false,
    isLoading: false,
    isError : false,
    data : [],
    username: ""
}

export const reducer = (state = initState, {type, payload}) => {
    console.log("loigin",payload);
    switch(type){
        case LOGIN_REQUEST:
            return{
                ...state,
                isLoading : true 
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                isLoading: false,
                isAuth: true,
                data : payload.data,
                username : payload.username
            }
        case LOGIN_FAILURE:
            return{
                ...state,
                isLoading : false,
                isError: true
            }
        default:
            return state
    }
}