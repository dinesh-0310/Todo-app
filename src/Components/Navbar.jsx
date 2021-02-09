import React from 'react';
import { Link } from 'react-router-dom';

const links =[
    {
        title : "Dashboard",
        to : "/"
    },
    {
        title: "CREATE TASK",
        to:"/create_task"
    },
    {
        title: "Summary",
        to : "/summary"
    },
    {
        title: "Login",
        to : "/login"
    }
]

export const Navbar = ()=>{
    return(
        <div style={{background:"#f5f5f5", height:"30px"}} >
        {
            links.map(item=>(
                <Link style={{padding : "5px 20px"}} key={item.title} to={item.to}>{item.title}</Link>
            ))
        }
        </div>
    )
} 