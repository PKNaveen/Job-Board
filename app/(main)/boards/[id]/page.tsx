import React from 'react'
import PopUpDialogBox from "@/components/PopUpDialogBox";
import JobBoard from "@/components/ui/JobBoard";
import {getBoardId, getUserID} from "@/lib/actions/searchActions";


const Page = async ({params}: {params: Promise<{id: string}>}) => {
    // console.log(params);
    const {id} = await params;
    const userID = await getUserID(id)
    const boardId = await getBoardId(userID)


    /*
    board_data returns a board ID as string. No need to destructure further
    */

    return (
        <>
            {boardId  && <JobBoard board_id={boardId} />}

            {!boardId ? <PopUpDialogBox userID={userID} /> : null}

        </>
    )
}
export default Page
