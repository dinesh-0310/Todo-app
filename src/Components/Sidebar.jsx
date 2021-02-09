import React,{useEffect} from 'react';
import Profile from './Profile'
import {List, ListItemText,ListItem, Button} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'
import {getTask} from '../Redux/Task/action'

export const Sidebar =()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getTask())
    },[])
    const todo = useSelector(state => state.tasks.todo)
    let all = 0, personal = 0, official = 0,others = 0;
    todo.map(item=>{
        let tag  = item.tags
        tag.map(ele =>{
            if(ele === "personal"){
                personal++
            }else if(ele === "official"){
                official++
            }else if(ele === "others"){
                others++
            }
        })
        all += tag.length
    })
    return(
        <div style={{width:"25%", background:"#f5f5f5",height: "95vh"}}>
            <Profile />
            <br/>
            <br/>
            <hr/>
            <div>
            <List>
                <ListItem  button>
                    <ListItemText primary="ALL" />
                    <ListItemText primary={all} />

                </ListItem>
                <ListItem  button>
                    <ListItemText primary="PERSONAL" />
                    <ListItemText primary={personal} />

                </ListItem>
                <ListItem  button>
                    <ListItemText primary="OFFICIAL" />
                    <ListItemText primary={official} />

                </ListItem>
                <ListItem  button>
                    <ListItemText primary="OTHERS" />
                    <ListItemText primary={others} />

                </ListItem>
      
            </List>
              
            </div>
        <hr/>
            <Button color="primary" variant="contained" size="large">LOGOUT</Button>
        </div>
    )
}