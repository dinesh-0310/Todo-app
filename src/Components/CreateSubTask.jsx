import React, { useState } from 'react';
import {TextField,Button, List,ListItem,ListItemIcon,Checkbox,IconButton,ListItemText,ListItemSecondaryAction} from '@material-ui/core'
import {v4 as uuidv4} from 'uuid'
import { useSelector,useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import {toggleSubTask,deleteSubTask} from '../Redux/Task/action'

export const CreateSubTask =({handleSubtask, taskId = null})=>{
    const todo = useSelector(state => state.tasks.todo)
    console.log(taskId);
    const todoObj = todo.find(ele=> ele.id == taskId)
    console.log(todoObj);
    const [task, setTask] = useState("")
    let initsubTask = taskId === null ? [] : todoObj.subTasks
    const [subTask, setSubTask] = useState(initsubTask)
    console.log(subTask);
    const dispatch = useDispatch()
    const handleSubtasks = () =>{
        const payload ={
            title : task,
            status : false,
            id : uuidv4()
        }
        console.log(payload);
        const newSubTask = [...subTask, payload]
        setSubTask(newSubTask)
        handleSubtask(newSubTask)
    }

    const handleToggle = (id) =>{
        const toggledSubTask = subTask.map(item => item.id === id ? {...item, status:!item.status} : item)
        setSubTask(toggledSubTask)
        handleSubtask(toggledSubTask)
        dispatch(toggleSubTask(toggledSubTask, taskId))
    }

    const handleDelete = (id) =>{
        const newSubTask = subTask.filter(item => item.id !== id )
        setSubTask(newSubTask)
        handleSubtask(newSubTask)
        dispatch(deleteSubTask(newSubTask, taskId))
    }
    return(
        <>
            <TextField
            label="Enter Sub task"
            variant="outlined"
            value={task}
            onChange={e => setTask(e.target.value)}
            />
            <Button variant="outlined" color="primary" onClick={handleSubtasks}>ADD</Button>
            <List>
                {subTask && subTask.map(item=>(
                    <ListItem key={item.id} dense button>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={item.status}
                        tabIndex={-1}
                        onChange={()=> handleToggle(item.id)}
                      />
                    </ListItemIcon>
                    <ListItemText  primary={item.title} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={()=> handleDelete(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
        </>
    )
}