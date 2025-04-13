import React from 'react'
import {getBoardColumnNames} from "@/lib/actions/searchActions";


const JobBoard = async ({board_id}: { board_id: string }) => {
    const data = await getBoardColumnNames(board_id)
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
