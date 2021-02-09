import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {loginUserData} from '../Redux/Login/action'
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
const Login = () =>{
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    console.log(username, password,"username","password");
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.login.isLoading)
    const isError = useSelector(state => state.login.isError)
    const isAuth = useSelector(state => state.login.isAuth)

    const handleClick = () =>{
        dispatch(loginUserData({password, username}))
        
    }
       
    return(
        <div>
            <Wrapper>
                {
                    !isAuth ? <div>
                        <input required type="text" value={username} name="username" placeholder="Username" onChange={e=> setUsername(e.target.value)}/>
                        <input required type="text" value={password} name="password" placeholder="Password" onChange={e=> setPassword(e.target.value)}/>
                        <button onClick={handleClick}>LOGIN</button>
                        <br/>
                        <br/>
                        <Link to="/register">Sign Up</Link>
                    </div> : <Redirect to="/" />
                }
                {isLoading && <div>Loading...</div>}
                {isError && <div>something went wrong...</div>}
            </Wrapper>
        </div>
    )
    
}


export default Login