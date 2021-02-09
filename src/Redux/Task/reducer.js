import {ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE,
    EDIT_TASK_REQUEST, EDIT_TASK_SUCCESS, EDIT_TASK_FAILURE,
    DELETE_TASK_REQUEST,DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE,
    GET_TASK_REQUEST,GET_TASK_SUCCESS,GET_TASK_FAILURE,
         
} from './actionType'
const initState = {
    todo:[],
    isLoading: false,
    isError : false
}

export const reducer =(state = initState, {type, payload})=>{
    switch(type){
        case GET_TASK_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case GET_TASK_SUCCESS:
            return{
                ...state,
                isLoading: false,
                todo: payload
            }
        case GET_TASK_FAILURE:
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        case ADD_TASK_REQUEST:
            return{
                ...state,
               
            }
        case ADD_TASK_SUCCESS:
            return{
                ...state,
                
            }
        case ADD_TASK_FAILURE:
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        case DELETE_TASK_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case DELETE_TASK_SUCCESS:
            return{
                ...state,
                isLoading: false
            }
        case DELETE_TASK_FAILURE:
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        case EDIT_TASK_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case EDIT_TASK_SUCCESS:
            return{
                ...state,
                isLoading: false
            }
        case EDIT_TASK_FAILURE:
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state
    }
}