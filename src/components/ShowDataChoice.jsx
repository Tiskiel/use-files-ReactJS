import React from 'react'

export default function ShowDataChoice({files, headers}) {
    // console.log(files)

    const cleanHeadersList = []
    const allData = []
    const dataValue = []

    for (let i = 0; i < files.length; i++) {
        for (let j = 0; j< files[i].file.length; j++) {  
            allData.push(files[i].file[j])
        }
        
    }

    const head = [];

    allData.forEach(it => {
        for(let key in it) {
            let finded = head.find(it => it.header && it.header == key);

            if (!finded) {
                head.push({header: key, values: []});
            }

            finded = head.find(it => it.header == key)

            finded.values.push(it[key])
        }
    })

    // console.log(allData, head);
    
    for (let i = 0; i < headers.length; i++) {
        if(!cleanHeadersList.includes(headers[i])) {
            cleanHeadersList.push(headers[i])
        }
    }

    // for (let i = 0; i < cleanHeadersList.length; i++) {
    //     for(let j = 0; j < cleanHeadersList.length; j++) {
    //         if(head[i].header != cleanHeadersList[j]){
    //             head.push({header: cleanHeadersList[j], values: []})
    //         }
    //     }
    // }

    for(let cHeader of cleanHeadersList) {
        let isFind = head.find(it => it.header === cHeader);
        if (!isFind) {
            head.push({header: cHeader, values: []});
        }
    }
    console.log(head); 
    console.log(cleanHeadersList)

    const showTable = head.map((el, n) => (
        <div key={'col- '+ n}>
            <p key={'row-title'+ n}>{el.header}</p>
            {
                el.values.map((it, i) => (
                    <p key={'col-'+ i}>{it}</p>
                ))
            }
        </div>
    ))

    for (let i = 0; i < allData.length; i++) {
        dataValue.push(Object.values(allData[i]))
    }

    

    return (
        <div>
            {showTable}
        </div>
    )
}
