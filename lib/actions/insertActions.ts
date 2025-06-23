"use server"
import {db} from "@/database/drizzle";
import {all_contacts, board, board_list, card} from "@/database/schema";
import {eq} from "drizzle-orm";
import {getBoardId, getBoardListPosition, getMaxCardPositionId} from "@/lib/actions/searchActions";

export const insertIntoBoardTable = async (id:string, name:string)=>{
    const existingBoard = await db
        .select()
        .from(board)
        .where(eq(board.user_id,id))
        .limit(1)

    if(existingBoard.length === 0){
        try {
        await db.insert(board).values({
            user_id:id,
            board_name:name,
        })
        }

        catch (error) {
            return {status:"FAILED", error: error};
        }
    }
    return {status:"SUCCESS"}
}

export const insertIntoBoardListTable = async (id:string)=>{


    const count = await getBoardListPosition(id);
    const position_id = count[0]?.position_id || 0

    const name ="List Name";
    try{
        await db.insert(board_list).values({
            board_id:id,
            list_name:name,
            // Change position here
            position: position_id+1
        })
        return {status:"SUCCESS"}
    }
    catch (e) {
        return {status:"FAILED", error: e};
    }

}

export const insertIntoCardTable = async (list_id:string,company:string,title:string,post_url:string)=>{
    const count = await getMaxCardPositionId(list_id);
    const position_id = count[0]?.position_id || 0
    const salary:string="Enter your salary"
    const location:string="Enter your location"

    try {
        await db.insert(card).values({
            list_id:list_id,
            title:company,
            description:title,
            position:position_id+1,
            post_url:post_url,
            location:location,
            salary:salary,
        })
        return {status:"SUCCESS"}
    }

    catch (e) {
        return {status:"FAILED", error: e};
    }
}

export const insetIntoAllContactsTable  = async (id:string,Name:string,Company:string,Title:string,Email:string,Phone:string,LinkedIn:string,Twitter:string)=> {
    const boardId=await getBoardId(id);


    try{
        console.log(boardId)
        await db.insert(all_contacts).values({
            board_id:boardId,
            name:Name,
            company:Company,
            title:Title,
            email:Email,
            phone:Phone,
            linkedin:LinkedIn,
            twitter:Twitter,
        })
        return {status:"SUCCESS"}
    }
    catch (e) {
        return {status:"FAILED", error: e};
    }
}

