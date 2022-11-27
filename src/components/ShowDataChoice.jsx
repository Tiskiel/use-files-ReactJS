import React from 'react'

export default function ShowDataChoice({files, headers}) {
    console.log(files)

    const cleanHeadersList = []
    const allData = []
    const dataValue = []

    for (let i = 0; i < files.length; i++) {
        for (let j = 0; j< files[i].file.length; j++) {  
        allData.push(files[i].file[j])
        }
        
    }
    console.log(allData);
    
    for (let i = 0; i < headers.length; i++) {
        if(!cleanHeadersList.includes(headers[i])) {
            cleanHeadersList.push(headers[i])
        }
    }

    const showHeader = cleanHeadersList.map(el => (
        <th scope='col' colSpan="2" id={el} key={el}>{el}</th>
    ))

    for (let i = 0; i < allData.length; i++) {
        dataValue.push(Object.values(allData[i]))
    }

    const showData = dataValue.map( (el, i) => (
        <tr key={i}>
            <th scope='row'> => </th>
            {el.map(el => (
                <td key={el}>
                    {el}
                </td>
            ))}
        </tr>
    ))

    return (
        <table>
            <thead>
            <tr>
                {showHeader}
            </tr>
            </thead>
            <tbody>
                {showData}
            </tbody>
        </table>
    )
}
