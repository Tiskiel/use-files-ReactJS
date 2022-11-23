import * as xlsx from 'xlsx'


export default function FilesUpload()
{   
    const listDataFiles = []
    const listHeaders = []
    
    const readUploadFile = (e) => {
        e.preventDefault()
        if (e.target.files) {
            const fileName = e.target.files[0].name
            console.log(typeof fileName);
            const reader = new FileReader()
            reader.onload = (e) => {
                
                const data = e.target.result
                const workbook = xlsx.read(data, { type: "array"})
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const json = xlsx.utils.sheet_to_json(worksheet)
            
                listDataFiles.push(json)
                console.log(`Ceci est la liste des datas :`)
                console.log(listDataFiles)
            }
            reader.readAsArrayBuffer(e.target.files[0])
        }
        
    }
    
    const readUploadHeaderFile = (e) => {

        if(e.target.files)
        {   
            const fileName = e.target.files[0].name
            const reader = new FileReader()
            
            reader.onload = (e) => {
                
                const data = e.target.result
                const workbook = xlsx.read(data, { type : 'binary'})
                const header = getHeader(workbook)
                const newObj = {
                    fileName: fileName,
                    listHeader: header
                }
                listHeaders.push(newObj)
                console.log(`Ceci est la liste des headers : `)
                console.log(listHeaders)
            }
            reader.readAsArrayBuffer(e.target.files[0])
        }
    }

    const onChange = (e) => {
        readUploadHeaderFile(e)
        readUploadFile(e)
    }

    const finalHeaderList = matchHeader(listHeaders)

    return (
        <form>
            <label htmlFor="upload">Up file</label>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={onChange}
            />
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

function matchHeader(listHeader) {

    const finalMatchArray = []

    for (let i = 0; i < listHeader.length-1; i++) {
        
        listHeader[i] === listHeader[i+1] ? finalMatchArray.push(listHeader[i]) : finalMatchArray.push(listHeader[i+1])      
    }

    return finalMatchArray
    
}