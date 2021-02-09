import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useMergeState } from '../Hooks/useMergeState';
import {registerUser} from '../Redux/Register/action'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'

const Wrapper = styled.div`
    width : 50%;
    margin : 10px auto;
    display : flex;
    flex-direction : column;
    & input{
        height : 20px;
        margin : 10px 0;
    }
    & button{
        width : 50%;
        margin 10px auto;
        height : 30px;
    }
   
`;
export const  Register = ()=>{

    const initState = {
        name : "",
        email : "",
        password: "",
        username: "",
        mobile: "",
        description: ""
    }
  
    const [detail, setDetail] = useMergeState(initState)
    const dispatch = useDispatch();
    const handleChange=(e) =>{
       setDetail({
           [e.target.name] : e.target.value
       })
    }
    const handleRegister = (e) =>{
        e.preventDefault();
        const payload = {
            name, email, password, username, mobile, description
        }
        dispatch(registerUser(payload))
    }
    const isLoading = useSelector(state => state.register.isLoading)
    const isError = useSelector(state => state.register.isError)
    const isRegister = useSelector(state => state.register.isRegister)
    
    const {name, email, password, username, mobile, description} = detail
    return isLoading ? (<div>Loading...</div>) : !isLoading && isError ? (<div>something went wrong...</div>): !isRegister ?(
        <div style={{display:"flex", flexDirection:"column",margin: "auto",width:"100%"}}>
        <h1>REGISTRATION</h1>
            <form onSubmit={handleRegister}>
            <Wrapper>
                <input type="text"  name="name" value={name} onChange={handleChange} placeholder="Name" required/>
                <input type="text"  name="email" value={email} onChange={handleChange} placeholder="Email" required/>
                <input type="text"  name="password" value={password} onChange={handleChange} placeholder="password" required/>
                <input type="text"  name="username" value={username} onChange={handleChange} placeholder="username" required/>
                <input type="text"  name="mobile" value={mobile} onChange={handleChange} placeholder="mobile" required/>
                <input type="text"  name="description" value={description} onChange={handleChange} placeholder="description" required/>
                <input type="submit" value="REGISTER"/>
            </Wrapper>
            </form>
        </div>
    ) : (<Redirect to="/login" />)
    
}


export default Register