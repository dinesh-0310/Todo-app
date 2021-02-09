import React from 'react';

export const  useMergeState = (init)=>{
    const [state, setState] = React.useState(init)

    const updateState = (partialState) =>{
        setState({...state, ...partialState})
    }

    return [state, updateState]
}