"use server"
import {db} from "@/database/drizzle";
import {board, board_list, usersTable} from "@/database/schema";
import {eq} from "drizzle-orm";


export const getUserData = async (id:any)=>{
   return db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
}
export const getBoardId = async (id:any)=>{
   const data = await getUserData(id)
   const userID = data[0]?.id;

   return db.select({id:board.id}).from(board).where(eq(board.user_id, userID)).limit(1);
}

export const getBoardColumnNames = async (id:any)=>{
   return db.select().from(board_list).where(eq(board_list.board_id,id))
}
