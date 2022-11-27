import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ShowDataChoice() {

    const location = useLocation()
    const files = location.state

    console.log(files);

    return (
        <div>ShowDataChoice</div>
    )
}
