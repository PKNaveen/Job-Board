"use server"
import {db} from "@/database/drizzle";
import {board} from "@/database/schema";
import {eq} from "drizzle-orm";

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
