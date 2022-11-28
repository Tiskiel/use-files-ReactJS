import React from 'react'

export default function ShowDataChoice({ files, headers }) {
    // console.log(files)

    const cleanHeadersList = []
    const allData = []
    const dataValue = []

    for (let i = 0; i < files.length; i++) {
        for (let j = 0; j < files[i].file.length; j++) {
            allData.push({ _id: `${i}${j}`, ...files[i].file[j] })
        }

    }

    const head = [];

    allData.forEach(it => {
        for (let key in it) {
            if (key == '_id') continue;
            let finded = head.find(it => it.key && it.key == key);
            if (!finded) {
                head.push({ key, data: [] });
            }
        }

        for (let col of head) {
            const value = it[col.key] || " ";
            col.data.push({ id: it._id, value });
        }
    });

    const showTable = head.map((it, i) => {
        return (
            <div key={'col-' + i}>
                <p className='font-bold border-2 p-1'>{it.key}</p>
                {
                    allData.map((data, row) => {
                        const index = it.data.find(item => item.id == data._id);
                        if (!index || index.value == ' ') {
                            return <p key={it.key + '-' + row} className='border-2 p-1'>NULL</p>
                        } else {
                            return <p key={it.key + '-' + row} className='border-2 p-1'>{index.value}</p>
                        }
                    })
                }
            </div>)
    });

    for (let i = 0; i < headers.length; i++) {
        if (!cleanHeadersList.includes(headers[i])) {
            cleanHeadersList.push(headers[i])
        }
    }


    for (let cHeader of cleanHeadersList) {
        let isFind = head.find(it => it.key === cHeader);
        if (!isFind) {
            head.push({ key: cHeader, values: [], data: [] });
        }
    }


    for (let i = 0; i < allData.length; i++) {
        dataValue.push(Object.values(allData[i]))
    }

    return (
        <div className='flex flex-row'>
            {showTable}
        </div>
    )
}
