import axios from 'axios'
import {ADD_TASK_REQUEST, ADD_TASK_SUCCESS, ADD_TASK_FAILURE,
        EDIT_TASK_REQUEST, EDIT_TASK_SUCCESS, EDIT_TASK_FAILURE,
        DELETE_TASK_REQUEST,DELETE_TASK_SUCCESS, DELETE_TASK_FAILURE,
        GET_TASK_REQUEST,GET_TASK_SUCCESS,GET_TASK_FAILURE,
        TOGGLE_SUBTASK_REQUEST,TOGGLE_SUBTASK_SUCCESS, TOGGLE_SUBTASK_FAILURE , 
        DELETE_SUBTASK_REQUEST,DELETE_SUBTASK_SUCCESS,DELETE_SUBTASK_FAILURE 
} from './actionType'

export const addTaskReq = () => ({
    type : ADD_TASK_REQUEST
})

export const addTaskSuccess = () =>({
    type : ADD_TASK_SUCCESS
})

export const addTaskFailure = () =>({
    type : ADD_TASK_FAILURE
})

export const addTask = payload => dispatch =>{
    dispatch(addTaskReq())

    const config ={
        method: "POST",
        url:`https://assignment-tasks.herokuapp.com/todo`,
        data : payload
    }

    return axios(config)
        .then(res => dispatch(getTask()))
        .catch(err => dispatch(addTaskFailure()))

}

export const getTaskReq = () =>({
    type : GET_TASK_REQUEST
})

export const getTaskSuccess = payload =>({
    type : GET_TASK_SUCCESS,
    payload
})

export const getTaskFailure = payload =>({
    type : GET_TASK_FAILURE,
    payload
})

export const getTask = () => dispatch =>{
    dispatch(getTaskReq())

    const config={
        method:"GET",
        url:"https://assignment-tasks.herokuapp.com/todo"

    }
    axios(config)
        .then(res => dispatch(getTaskSuccess(res.data)))
        .catch(err => dispatch(getTaskFailure(err)))

}

export const deleteTaskReq = () => ({
    type : DELETE_TASK_REQUEST
})

export const deleteTaskSuccess = () =>({
    type : DELETE_TASK_SUCCESS
})

export const deleteTaskFailure = () =>({
    type : DELETE_TASK_FAILURE
})

export const deleteTask = (id) => dispatch =>{
    dispatch(deleteTaskReq())

    const config ={
        method: "DELETE",
        url:`https://assignment-tasks.herokuapp.com/todo/${Number(id)}`
    }

    return axios(config)
        .then(res => dispatch(getTask()))
        .catch(err => dispatch(deleteTaskFailure()))

}


export const editTaskReq = () => ({
    type : EDIT_TASK_REQUEST
})

export const editTaskSuccess = () =>({
    type : EDIT_TASK_SUCCESS
})

export const editTaskFailure = () =>({
    type : EDIT_TASK_FAILURE
})

export const editTask = (payload, id) => dispatch =>{
    dispatch(editTaskReq())

    const config ={
        method: "PATCH",
        url:`https://assignment-tasks.herokuapp.com/todo/${Number(id)}`,
        data : payload
    }

    return axios(config)
        .then(res => dispatch(getTask()))
        .catch(err => dispatch(getTaskFailure(err)))

}

export const toggleSubTaskReq = ()=>({
    type : TOGGLE_SUBTASK_REQUEST
})
export const toggleSubTaskSuccess =(payload)=>({
    type: TOGGLE_SUBTASK_SUCCESS
})
export const toggleSubTaskFailure = payload =>({
    type : TOGGLE_SUBTASK_FAILURE,
    payload
})

export const toggleSubTask = (payload, taskId) => dispatch =>{
    dispatch(toggleSubTaskReq())
    const config ={
        method: "PATCH",
        url:`https://assignment-tasks.herokuapp.com/todo/${Number(taskId)}`,
        data : {
            subTasks : payload
        }
    }

    return axios(config)
        .then(res => dispatch(getTask()))
        .catch(err => dispatch(toggleSubTaskFailure(err)))
}

export const deleteSubTaskReq = ()=>({
    type : DELETE_SUBTASK_REQUEST
})
export const deleteSubTaskSuccess =(payload)=>({
    type: DELETE_SUBTASK_SUCCESS
})
export const deleteSubTaskFailure = payload =>({
    type : DELETE_SUBTASK_FAILURE,
    payload
})

export const deleteSubTask = (payload, taskId) => dispatch =>{
    dispatch(deleteSubTaskReq())
    const config ={
        method: "PATCH",
        url:`https://assignment-tasks.herokuapp.com/todo/${Number(taskId)}`,
        data : {
            subTasks : payload
        }
    }

    return axios(config)
        .then(res => dispatch(getTask()))
        .catch(err => dispatch(deleteSubTaskFailure(err)))
}