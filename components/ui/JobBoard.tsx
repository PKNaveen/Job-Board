import React from 'react'
import {getBoardColumnNames} from "@/lib/actions/searchActions";


const JobBoard = async ({board_id}: { board_id: any }) => {
    const id = board_id[0]?.id;
    const data = await getBoardColumnNames(id)
    // console.log(data)

    return (
        <>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.list_name}</li>
                ))}
            </ul>
        </>
    )
}
export default JobBoard
