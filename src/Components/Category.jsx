import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubTask, deleteTask, getTask, toggleSubTask } from '../Redux/Task/action';
import ClearIcon from '@material-ui/icons/Clear'
import DeleteIcon from '@material-ui/icons/Delete'
import {Button, Card, CardContent, CardActions,Typography,IconButton,List,ListItem,ListItemIcon,Checkbox,ListItemText,ListItemSecondaryAction} from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
    root: {
      width: "95%",
      background:"#f5f5f5",
      margin : "20px auto"
    },
    icon:{
        marginTop: "-8px",
        color:"red",
        marginRight:"-20px"
    },
    tag:{
        display:"flex",
        width : "68%",
        justifyContent: "space-between",
        border: "1px solid grey"
    },
    button:{
        margin:"auto"
    }
  });
  
export const Category = ({categoryName}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const todo = useSelector(state => state.tasks.todo)
    const todoByCategory = todo.filter(ele => ele.category === categoryName)
    useEffect(()=>{
        dispatch(getTask())
    },[])

    const handleEdit=(id, item)=>{
        history.push({
            pathname: `/edit_task/${id}`,
            state : item
        })
    }
    const handleSubTaskToggle = (subTasks,taskId, id) =>{
        const toggledSubTask = subTasks.map(item => item.id === id ? {...item, status:!item.status} : item)
      
        dispatch(toggleSubTask(toggledSubTask, taskId))
    }
    const handleSubTaskDelete = (subTasks,taskId, id) =>{
        const newSubTask = subTasks.filter(item => item.id !== id )
      
        dispatch(deleteSubTask(newSubTask, taskId))
    }
 
    return(
        <>
            <h1>{categoryName}</h1>
            <hr/>
            {
                todoByCategory && todoByCategory.map(task=>{
                    return(
                        <Card className={classes.root} key={task.id}>
                            <CardContent>
                            <div style={{display:"flex", justifyContent: "space-around"}}>

                              <Typography variant="h6" component="h3">
                                    {task.title}
                              </Typography>
                                <IconButton onClick={()=> dispatch(deleteTask(task.id))}>
                                    <ClearIcon className={classes.icon} />
                                </IconButton>
                            </div>
                            <div style={{display:"flex", justifyContent: "space-around"}}>

                                <div className={classes.tag}>
                                    {
                                        task.tags.map((tag,i)=>(
                                            <Typography key={i}>
                                               {tag}
                                            </Typography>         
                                        ))
                                    }
                                </div>
                             
                              <Typography variant="body2" component="p">
                                    {task.date}
                              </Typography>
                            </div>
                              <Typography variant="body2" component="p">
                                    {task.description}
                              </Typography>
                                <List>
                                    {task.subTasks && task.subTasks.map(item=>(
                                        <ListItem key={item.id} dense button>
                                        <ListItemIcon>
                                          <Checkbox
                                            edge="start"
                                            checked={item.status}
                                            tabIndex={-1}
                                            onChange={()=> handleSubTaskToggle(task.subTasks, task.id, item.id)}
                                          />
                                        </ListItemIcon>
                                        <ListItemText  primary={item.title} />
                                        <ListItemSecondaryAction>
                                          <IconButton edge="end" aria-label="delete" onClick={()=>handleSubTaskDelete(task.subTasks,task.id, item.id)}>
                                            <DeleteIcon  />
                                          </IconButton>
                                        </ListItemSecondaryAction>
                                      </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                            <CardActions>
                                <Button className={classes.button} size="small" variant="contained" color="primary" onClick={()=> handleEdit(task.id, task)}>Edit</Button>
                            </CardActions>
                        </Card>
                    )
                })
            }
        </>
    )
}