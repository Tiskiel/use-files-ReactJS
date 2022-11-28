import {  useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import * as xlsx from 'xlsx'


export default function FilesUpload(props)
{   
    const [file, setFile] = useState([])
    const [headers, setHeaders] = useState([])
    const [goodHeaders, setGoodHeaders] = useState([])
    const navigate = useNavigate()
    
    const readUploadFile = (e) => {
        e.preventDefault()
        if (e.target.files) {

            for(let i in e.target.files) {
                if (isNaN(i)) continue;
                console.log(i);
                const file = e.target.files[i];
                const fileName = file.name
            
                const reader = new FileReader()
                reader.onload = (e) => {
                    const data = e.target.result
                    const workbook = xlsx.read(data, { type: "array"})
                    const sheetName = workbook.SheetNames[0]
                    const worksheet = workbook.Sheets[sheetName]
                    const json = xlsx.utils.sheet_to_json(worksheet)
                    const newObj = {
                        name: fileName,
                        file: json
                    }
                    setFile(current => [...current, newObj])
                }
                

            reader.readAsArrayBuffer(file)
            }
        
        }
            
    }
    
    const readUploadHeaderFile = (e) => {

        if(e.target.files)
        {   
            
            for (let i in e.target.files){
                const fileName = e.target.files[0].name
                const reader = new FileReader()
                
                reader.onload = (e) => {
                    
                    const data = e.target.result
                    const workbook = xlsx.read(data, { type : 'binary'})
                    const header = getHeader(workbook)
                    setHeaders(current => [...current, ...header])
                    for ( let i = 0; i < headers.length; i++ ) {
                        if (!goodHeaders.includes(headers[i])) {
                            setGoodHeaders(current => [...current, headers[i]])
                        }
                    }
                }
                reader.readAsArrayBuffer(e.target.files[0])
            }
        }
    }

    const navigateToView = () => {
        navigate('/home/upload-files/view-files', { state: {files: file, headers: headers} })
    }

    const onChange = (e) => {
        readUploadHeaderFile(e)
        readUploadFile(e)
        e.target.value = null
    }

    
    return (
        <form>
            <label htmlFor="upload">Up file</label>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={onChange}
                multiple
            />
            <button onClick={navigateToView}>
                View files
            </button>
        </form>

    )
}


function getHeader(workbook)
{
    const workbookDone= workbook.Sheets[workbook.SheetNames[0]]
    const header = []
    const columnCount = xlsx.utils.decode_range(workbookDone['!ref']).e.c + 1

    for (let i = 0; i < columnCount; i++)
        header[i] = workbookDone[`${xlsx.utils.encode_col(i)}1`].v
    return header 
}

