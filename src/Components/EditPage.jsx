import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {CreateSubTask} from './CreateSubTask'
import { editTask } from '../Redux/Task/action';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { useLocation, useParams,useHistory } from 'react-router-dom';
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

export const EditPage = () =>{
    const params = useParams()
    const location = useLocation()
    console.log(location.state.date ,params);
    const [title, setTitle] = React.useState(location.state.title || "")
    const [description, setDescription] = React.useState(location.state.description || "")
    const [taskStatus, setTaskStatus] = React.useState(location.state.category || "")
    const [official, setOfficial] = React.useState(false) 
    const [personal, setPersonal] = React.useState(false) 
    const [others, setOthers] = React.useState(false) 
    const [createDate, setCreateDate] = React.useState(location.state.date || "")
    const [subTasks, setSubTasks] = React.useState([...location.state.subTasks] || [])
    
    useEffect(()=>{

        const {tags} = location.state
        console.log(tags);
        tags.map(item=>{
            if(item === "official"){
                setOfficial(true)
            }
            if(item === "personal"){
                setPersonal(true)
            }
            if(item === "others"){
                setOthers(true)
            }
        })
        console.log(personal, official, others);
    },[])
    const classes = useStyles();
    const dispatch = useDispatch()

    console.log(createDate);

    const handleSubtask =(payload) =>{
        const value = payload ? payload : [...subTasks]
        setSubTasks(value)
    }

    let tag = []
    official && tag.push("official");
    personal && tag.push("personal");
    others && tag.push("others")
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
        dispatch(editTask(payload, params.id)).then(history.push("/"))
    }
    return(
        <>
        <Sidebar/>
        <div style={{display: "flex", width:"100%", justifyContent: "space-around", margin:"20px 0"}}>
            <div className="left-part" style={{display:"flex", flexDirection:"column",width:"30%", textAlign:"left"}}>
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
               <CreateSubTask handleSubtask={handleSubtask} taskId = {params.id}/>
            </div>
            <div>
                <div className={classes.container} >

                    <TextField
                        id="date"
                        type="date"
                        value={createDate}
                        className={classes.textField}
                        onChange={e=> setCreateDate(e.target.value)}
                       
                    />
                </div>

                <Button 
                     variant="contained" 
                     color="primary" 
                     style={{marginTop : "120px"}}
                     onClick={handleClick}>  
                        EDIT TASK 
                </Button>
            </div>
        </div>
        </>
    )
}