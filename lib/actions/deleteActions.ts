"use server"
import {db} from "@/database/drizzle";
import {all_contacts, board_list, card} from "@/database/schema";
import {and, eq, gt, sql} from "drizzle-orm";

export const deleteBoardList= async (board_list_id:string,p:number,board_id:string) =>{

    await db.delete(board_list).where(eq(board_list.id,board_list_id));
    await db.update(board_list).set({position:sql`${board_list.position} -1`}).where(and(gt(board_list.position, p), eq(board_list.board_id,board_id)));
    return {status:"SUCCESS"};
}

export const deleteContactCard = async (contact_id:string) =>{
    await db.delete(all_contacts).where(eq(all_contacts.id,contact_id))

    return {status:"SUCCESS"};
}

export const deleteJobCard = async (card_id:string) =>{
    await db.delete(card).where(eq(card.id,card_id))

    return {status:"SUCCESS"};
}
