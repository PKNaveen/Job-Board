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
import {BoardItem, data} from "@/lib/props";


const DropdownMenuIcon = ({data,item,board_id,onSuccess}:{data:data[],item:BoardItem,board_id:string,onSuccess:any}) => {
    // Check delete list button
    // console.log(data.map(item => item.id));
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis color="#ffff"/></DropdownMenuTrigger>
            <DropdownMenuContent className="bg-dark-300 shadow-md border-dark-275 text-text-header">
                <DropdownMenuItem className="uppercase flex-between ">Rename
                    <Pencil className="size-5"/>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem  asChild>
                    <DeleteListButton board_list_id={item.id} position={item.position} board_id={board_id} onSuccess={onSuccess} />
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem asChild>
                    <MoveListButton board_data={data} current_item={item} board_id={board_id} onSuccess={onSuccess}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}
export default DropdownMenuIcon
