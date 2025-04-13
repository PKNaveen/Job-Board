import React from 'react'
import {db} from "@/database/drizzle";
import {board} from "@/database/schema";
import {eq} from "drizzle-orm";
import PopUpDialogBox from "@/components/PopUpDialogBox";
import JobBoard from "@/components/ui/JobBoard";
import {getUserData} from "@/lib/actions/searchActions";

const Page = async ({params}:{params:any}) => {
    const id = (await params).id
    const data = await getUserData(id)
    const userID = data[0]?.id;


    const board_data = await db.select({id:board.id}).from(board).where(eq(board.user_id, userID)).limit(1);
    // console.log(board_data);
    /*
    Returns an array object of JSON in the following manner
    [ { name: 'BoardName' } ]  Or [ { name: 'Board Name' } ]
    Access this into JSX using array call method data[0]?.id
    */

    const board_name = await db.select({name:board.board_name}).from(board).where(eq(board.user_id, id)).limit(1);

    return (
        <>
            {board_data.length === 0 ? <PopUpDialogBox data={data} /> : null}
            <div className="">{board_name[0]?.name}</div>
            {board_data.length > 0 ? <JobBoard board_id={board_data} /> : null}
            {/*<JobBoard board_id={board_data}/>*/}
        </>
    )
}
export default Page
