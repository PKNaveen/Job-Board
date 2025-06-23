"use server"
import {db} from "@/database/drizzle";
import {board, board_list, card, usersTable} from "@/database/schema";
import {eq, max, sql} from "drizzle-orm";
import {Contact} from "@/lib/props";

type card ={

    id: string,
    list_id: string,
    card_name: string,
    description: string,
    created_at: string,
    position: number

}

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

export const getAllCards = async (board_id:string) => {
    const cardsQuery = sql`
  SELECT card.*
  FROM card
  JOIN board_list ON card.list_id = board_list.id
  WHERE board_list.board_id = ${board_id}
`;
  const result = await db.execute(cardsQuery)
   return result.rows as card []
}

export const getMaxCardPositionId= async (list_id:string) => {
    const result = await db.select({position_id:max(card.position)}).from(card).where(eq(card.list_id,list_id));
    return result
}

export const getCountOfCards = async (id:string) => {
    const board_id = await getBoardId(id);
    const countCardsQuery = sql`
    select board_list.list_name, count(card.card_name)
     from board_list 
     join card on board_list.id=card.list_id
      where board_id=${board_id} 
      group by board_list.list_name
    `;
    const result = await db.execute(countCardsQuery)
    return result.rows
}

export const getAllApplications =  async (id:string)=>{
    const board_id=await getBoardId(id);
    const total = sql `
    SELECT SUM(card_count) AS total_card_count
    FROM (
    SELECT COUNT(card.card_name) AS card_count
    FROM board_list
    JOIN card ON board_list.id = card.list_id
    WHERE board_id = ${board_id}
    GROUP BY board_list.list_name
    ) AS counts;
`;
    const result = await db.execute(total);
    return result.rows
}

export const getAllContacts = async (id:string)=>{
    const query = sql`
    SELECT all_contacts.*
    FROM all_contacts
    JOIN board ON all_contacts.board_id = board.id
    WHERE board.user_id = ${id};
`;
    const result = await db.execute(query)
    return result.rows as Contact[]
}
