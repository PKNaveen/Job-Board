"use server"
import {db} from "@/database/drizzle";
import {board, board_list, usersTable} from "@/database/schema";
import {eq, max, sql} from "drizzle-orm";



export const getUserData = async (id:string)=>{
   const result = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
   return result
}
export const getUserID = async (id:string)=>{
   const result = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
   return result[0]?.id
}
export const getBoardId = async (userId:string)=>{
   const data = await getUserID(userId)
   const result = await db.select({id:board.id}).from(board).where(eq(board.user_id, data)).limit(1);

   return result[0]?.id
}

export const getBoardColumnNames = async (id:string)=>{
   const result = await db.select().from(board_list).orderBy(sql`${board_list.position}`).where(eq(board_list.board_id,id))
   return result
}

export const getBoardListPosition = async (board_id:string) => {
   const result = await db.select({position_id:max(board_list.position)}).from(board_list).where(eq(board_list.board_id,board_id));
   return result;
}

