import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {CreateSubTask} from './CreateSubTask'
import { addTask } from '../Redux/Task/action';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import { Sidebar } from './Sidebar';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export const CreatePage = () =>{
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [taskStatus, setTaskStatus] = React.useState("")
    const [official, setOfficial] = React.useState(false)
    const [personal, setPersonal] = React.useState(false)
    const [others, setOthers] = React.useState(false)
    const [createDate, setCreateDate] = React.useState("")
    const [subTasks, setSubTasks] = React.useState([])
    const [alert, setAlert] = React.useState(false)
    const tag = []

    const classes = useStyles();
    const dispatch = useDispatch()

    official && tag.push("official");
    personal && tag.push("personal");
    others && tag.push("others")

    const handleSubtask =(payload) =>{
        const value = payload ? payload : [...subTasks]
        setSubTasks(value)
    }
    const history = useHistory()
    const handleClick =()=>{
        let payload ={
            title,
            date : createDate,
            description,
            category : taskStatus,
            tags : [...tag],
            subTasks
        }
        if(title === "" || createDate=== "" || taskStatus === "" || tag.length === 0){
            setAlert(true)
            let timeId = setTimeout(()=>{
                setAlert(false)
            },1000)

            
        }else{

            dispatch(addTask(payload)).then(setAlert(false)).then(history.push("/"))
        }
    }
    console.log(alert);
    return(
        <>
        <Sidebar/>
        <div style={{display: "flex", width:"80%", justifyContent: "space-around", margin:"20px 0"}}>
            <div className="left-part" style={{display:"flex", flexDirection:"column",width:"25%", textAlign:"left"}}>
                <input type="text" placeholder="Title" value={title} onChange={e =>setTitle(e.target.value)}/>
                <textarea cols="30" rows="5" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>

                    <h4>select task status</h4>
                    <div>

                        <input type="radio"
                                value="todo"
                                checked={taskStatus === "todo"}
                                onChange={e => setTaskStatus(e.target.value)} />todo
                    </div>
                    <div>

                        <input type="radio"
                                value="inProgress"
                                checked={taskStatus === "inProgress"}
                                onChange={e => setTaskStatus(e.target.value)} />In Progress
                    </div>
                    <div>

                        <input type="radio"
                                value="done"
                                checked={taskStatus === "done"}
                                onChange={e => setTaskStatus(e.target.value)} />Done
                    </div>
               
                    <h4>Tag (multiple possible)</h4>
                    <div>

                        <input type="checkbox"
                                    value = "official"
                                    checked={official}
                                    onChange={e => setOfficial(e.target.checked)}/>
                        Official
                    </div>
                    <div>

                        <input type="checkbox"
                                    value = "personal"
                                    checked={personal}
                                    onChange={e => setPersonal(e.target.checked)}/> personal
                    </div>
                    <div>

                        <input type="checkbox"
                                    value = "others"
                                    checked={others}
                                    onChange={e => setOthers(e.target.checked)}/> Others
               
                    </div>
            </div>
            <div className="mid-part">
               <CreateSubTask handleSubtask={handleSubtask}/>
            </div>
            <div>
                <div className={classes.container} >

                    <TextField
                        id="date"
                        type="date"
                        value={createDate}
                        className={classes.textField}
                        onChange={e=> setCreateDate(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                    />
                </div>

                <Button 
                     variant="contained" 
                     color="primary" 
                     style={{marginTop : "120px"}}
                     onClick={handleClick}>  
                        CREATE A NEW TASK 
                </Button>
                {
                alert &&  <Alert severity="info">All fields are mendetory - Fill all the fields!</Alert> 
            }
            </div>
            
        </div>
    </>
    )
}