import React, { useEffect } from 'react'
import {List, ListItem, ListItemText, Divider} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import { getTask } from '../Redux/Task/action';
import { Sidebar } from './Sidebar';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: 300,
      backgroundColor: theme.palette.background.paper,
        border:"1px solid grey",
        height: "140px",
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        margin: "20px"
    }
  }));
export const Summary =() =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTask())
    },[])
    const todo = useSelector(state => state.tasks.todo)
    let todoTasks = 0, inProgressTask = 0, doneTask = 0
    todo.map(item =>{
        if(item.category === "todo"){
            todoTasks++
        }else if(item.category === "inProgress"){
            inProgressTask++
        }else{
            doneTask++
        }
    })
    return(
        <>
        <Sidebar/>
       <div style={{width: "100%"}}>
        <List component="nav" className={classes.root} aria-label="summary folders">
            <ListItem divider>
              <ListItemText primary="Todo" />
              <ListItemText primary={todoTasks}  />
            </ListItem>
            <Divider />
            <ListItem  divider>
              <ListItemText primary="In Progress" />
              <ListItemText primary={inProgressTask} />
            </ListItem>
            <ListItem divider>
              <ListItemText primary="Done" />
              <ListItemText primary={doneTask} />
            </ListItem>
            
        </List>
        </div>
        </>
    )
}