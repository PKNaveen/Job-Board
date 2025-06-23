"use server"

import {db} from "@/database/drizzle";
import {board_list, card} from "@/database/schema";
import {eq, sql} from "drizzle-orm";


// Swap position using switch case in SQl
// But where condition for typescript safety convert it into number (Number)

// How this query works is as follows:
// First it opens a case check for both positions
// First case: When user wants to swap positions between 2 and 4 , we have to find whether and update position: 2 with position: 4
// Second case: Once the list that needs to be updated is set, the old position 4 must be updated to this list as 4
export const updatePosition= async (position_id1:number, position_id2:string,board_id:string)=>{
    // const current_position = await getBoardListPosition(board_id)
    await db.update(board_list).set({
        position: sql`
            CASE
            WHEN ${board_list.position} = ${position_id1} THEN (SELECT ${board_list.position} FROM ${board_list} WHERE ${board_list.position} = ${position_id2} AND ${board_list.board_id} = ${board_id})
            WHEN ${board_list.position} = ${position_id2} THEN (SELECT ${board_list.position} FROM ${board_list} WHERE ${board_list.position} =${position_id1} AND ${board_list.board_id} = ${board_id})
        ELSE ${board_list.position}
      END
    `,
    })
        .where(sql`${board_list.board_id} = ${board_id} and ${board_list.position} in (${position_id1}, ${position_id2})`);
    return {status:"SUCCESS"}
}

export const updateJobCard = async (company:string, title:string, post_url:string, salary:string, location:string, description:string, card_id:string)=>{

    await db.update(card).set({
        title:company,
        description:title,
        post_url:post_url,
        location:location,
        salary:salary
    }).where(eq(card.id,card_id));

    return {status:"SUCCESS"}
}

export const updateCardPosition = async (cards: { card_id: string; position: number; listId: string }[]) => {

    // Cards is an array of all cards to update
    await Promise.all(cards.map(c =>
        db.update(card).set({
            position: c.position,
            list_id: c.listId
        })
            .where(eq(card.id, c.card_id))
    ));
};
