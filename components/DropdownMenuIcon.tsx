"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {Ellipsis, Pencil} from "lucide-react";
import DeleteListButton from "@/components/DeleteListButton";
import {MoveListButton} from "@/components/MoveListButton";

const DropdownMenuIcon = ({data,item,board_id}:{data:any,item:any,board_id:string}) => {
    // Check delete list button
    // console.log(data.map(item => item.id));
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
            <DropdownMenuContent className="">
                <DropdownMenuItem className="uppercase flex-between">Rename
                    <Pencil className="size-5"/>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem  asChild>
                    <DeleteListButton board_list_id={item.id} position={item.position} board_id={board_id} />
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                    <MoveListButton board_data={data} current_item={item} board_id={board_id}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}
export default DropdownMenuIcon
