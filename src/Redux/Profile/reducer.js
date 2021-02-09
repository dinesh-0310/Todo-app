import {USER_PROFILE_REQUEST,USER_PROFILE_SUCCESS,USER_PROFILE_FAILURE} from './actionTypes';

const initState = {
    isLoading: false,
    isError : false,
    data : []
}

export const reducer = (state = initState, {type, payload}) => {
    console.log(type,payload);
    switch(type){
        case USER_PROFILE_REQUEST:
            return{
                ...state,
                isLoading : true 
            }
        case USER_PROFILE_SUCCESS:
            return{
                ...state,
                isLoading: false,
                data : payload
            }
        case USER_PROFILE_FAILURE:
            return{
                ...state,
                isLoading : false,
                isError: true
            }
        default:
            return state
    }
}