"use server"
import {db} from "@/database/drizzle";
import {board_list, master_board_list} from "@/database/schema";


export  const createDefaultBoardColumns=async (board_id:string) => {
    const master_list = await db.select().from(master_board_list);
    const boardItems = master_list.map((item,index) =>({
        board_id:board_id,
        list_name:item.column_name,
        position:index+1
    }))

    try{
        await db.insert(board_list).values(boardItems);
    }
    catch(error){
        return{status:"FAILED",error:error};
    }

    return {status:"SUCCESS"}
}
