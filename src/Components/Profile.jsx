import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { userProfile } from '../Redux/Profile/action';
  
const Profile = ()=>{
    const [registerBtnVisible, setRegisterBtnVisible] = useState(false)
    const loginData = useSelector(state => state.login.data)
    const loginUser = useSelector(state => state.login.username)
    const data = useSelector(state => state.profile.data)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(()=>{
        let token = loginData.token
        console.log("token",token);
        dispatch(userProfile(loginUser, token))

        Object.keys(data).length === 0 ? setRegisterBtnVisible(true) : setRegisterBtnVisible(false)
     
    },[])
    console.log("data",data);
   
    const {name, username, email,  description} = data
    return(
        <>
        {
            registerBtnVisible ? (<Button color="primary" variant="contained" onClick={()=>history.push("/register")}>REGISTER</Button>):(

                <div style={{border:"1px solid grey",borderRadius: "5px", margin: "auto",  width: "90%"}}>
                    <h2>Profile Details</h2>
                    <hr/>
                    <h3>Name : {name}</h3>
                    <h4>Username : {username}</h4>
                    <p>Email : {email}</p>
                    <p>Description : {description}</p>
                </div>

            ) 
        }
        </>
    )
}


export default Profile
