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
import RenameListButton from "@/components/ui/RenameListButton";


const DropdownMenuIcon = ({data,item,board_id,onSuccess}:{data:data[],item:BoardItem,board_id:string,onSuccess:any}) => {
    // Check delete list button
    // console.log(data.map(item => item.id));
    const [showRename, setShowRename] = React.useState(false);
    return (
        <>
        <DropdownMenu>
            <DropdownMenuTrigger><Ellipsis color="#ffff"/></DropdownMenuTrigger>
            <DropdownMenuContent className="bg-dark-300 shadow-md border-dark-275 text-text-header">
                <DropdownMenuItem asChild>


                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault(); // prevent menu from closing immediately
                            setTimeout(() => setShowRename(true), 10);
                            setShowRename(true); // open dialog
                        }}
                    >
                        <div className="flex-between w-full uppercase text-base  py-1  gap-8">
                        Rename
                        <Pencil className="mr-2 h-4 w-4" />
                        </div>
                    </DropdownMenuItem>
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
            {showRename && (
                <RenameListButton
                    name={item.list_name}
                    id={item.id}
                    open={showRename}
                    setOpen={setShowRename}
                    onSuccess={onSuccess}
                />
            )}
        </>
    )
}
export default DropdownMenuIcon
