"use server"
import {db} from "@/database/drizzle";
import {board, board_list} from "@/database/schema";
import {eq} from "drizzle-orm";
import {getBoardListPosition} from "@/lib/actions/searchActions";

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
    console.log(count)
    console.log("Position", count[0]?.position_id)
    console.log("Next position_id:", position_id);

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
