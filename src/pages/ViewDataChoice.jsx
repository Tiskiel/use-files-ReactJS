import React from 'react'
import { useLocation } from 'react-router-dom'
import ShowDataChoice from '../components/ShowDataChoice'

export default function ViewDataChoice() {

    const location = useLocation()
    const files = location.state.files
    const headers = location.state.headers
    console.log(files);
    return (
        <ShowDataChoice files={files} headers={headers}/>
    )
}
