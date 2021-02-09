import {REGISTER_REQUEST, REGISTER_SUCCESS,REGISTER_FAILURE} from './actionTypes';

const initState = {
    isRegister : false,
    isLoading: false,
    isError : false,
    data : []
}

export const reducer = (state = initState, {type, payload}) => {
    switch(type){
        case REGISTER_REQUEST:
            return{
                ...state,
                isLoading : true 
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                isLoading: false,
                isError: payload.error,
                isRegister: true,
                data : payload
            }
        case REGISTER_FAILURE:
            return{
                ...state,
                isLoading : false,
                isError: true
            }
        default:
            return state
    }
}