import React from 'react'
import {db} from "@/database/drizzle";
import {board} from "@/database/schema";
import {eq} from "drizzle-orm";
import PopUpDialogBox from "@/components/PopUpDialogBox";
import JobBoard from "@/components/ui/JobBoard";
import {getBoardId, getUserID} from "@/lib/actions/searchActions";

const Page = async ({params}: {params: Promise<{id: string}>}) => {
    // console.log(params);
    const {id} = await params;
    const userID = await getUserID(id)



    const boardId = await getBoardId(userID)
    console.log(boardId);

    /*
    board_data returns an board ID as string. No need to destructure further
    */

    const board_name = await db.select({name:board.board_name}).from(board).where(eq(board.user_id, id)).limit(1);

    return (
        <>
            {!boardId ? <PopUpDialogBox userID={userID} /> : null}
            <div className="">{board_name[0]?.name}</div>
            {boardId  && <JobBoard board_id={boardId} />}
            {/*<JobBoard board_id={board_data}/>*/}
        </>
    )
}
export default Page
