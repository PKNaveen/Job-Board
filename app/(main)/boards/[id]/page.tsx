import React from 'react'
import {db} from "@/database/drizzle";
import {board} from "@/database/schema";
import {eq} from "drizzle-orm";

const Page = async ({params}:{params:any}) => {
    const id = (await params).id

    /*
    Returns an array object of JSON in the following manner
    [ { name: 'BoardName' } ]  Or [ { name: 'Board Name' } ]
    Access this into JSX using array call method data[0]?.id
    */

    const board_name = await db.select({name:board.board_name}).from(board).where(eq(board.user_id, id)).limit(1);
    console.log(board_name)

    return (
        <div className="">{board_name[0]?.name}</div>
    )
}
export default Page
