import React from 'react'
import { useLocation } from 'react-router-dom'
import ShowDataChoice from '../components/ShowDataChoice'

export default function ViewDataChoice() {

    const location = useLocation()
    const files = location.state
    console.log(files);
    return (
        <ShowDataChoice files={files}/>
    )
}
