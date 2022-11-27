import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ViewFiles() {

    const location = useLocation()
    const navigate = useNavigate()

    const [choice, setChoice] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])

    const files = location.state

    useEffect(() => {
        console.log(choice);

        for (let i = 0; i < choice.length; i++) {
            
            for (let j = 0; j < files.length; j++) {
                
                if(choice[i] === files[j].name) {
                    setSelectedFiles([...selectedFiles, files[j]])
                }
            }
        }

    }, [choice])

    
    const file = files.map((el, i) => {
            
            return <option value={el.name} key={i}>{el.name}</option>
        
    })

    const showData = () => {
        navigate('/home/upload-files/view-data', { state: {selectedFiles}})
    }

    return (
        <div>
            <h1>Vos fichiers</h1>
            <br />
            <select value={choice} onChange={({target}) => setChoice([...choice, target.value])} multiple>
                {file}
            </select>
            <br />
            <button onClick={showData}>Show data</button>
        </div>
    )
}
