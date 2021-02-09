import React from 'react';
import { Sidebar } from './Sidebar';
import {Grid, Paper} from '@material-ui/core'
import {Category} from './Category'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme=>({
    root :{
        width: "100%",
        display: "flex"
    },
    grid:{
        minWidth:300,
    },
    paper:{
        width : 300
    }
}))

export const Dashboard = () =>{
   const classes = useStyles()
    return(
        <>
        <Sidebar/>
            <div className={classes.root}>
                <Grid container spacing={1} >
                    {["todo", "inProgress", "done"].map((value) => (
                        <Grid key={value} item sm={4} className={classes.grid}>
                            <Paper className={classes.paper} >
                                <Category categoryName={value} />
                            </Paper>
                        </Grid>
                    ))}
                   
                </Grid>
            </div>

        </>
    )
}
