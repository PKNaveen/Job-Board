"use client"
import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil,GripHorizontal } from "lucide-react";
import { EditJobCard } from "@/components/EditJobCard";
import {Skeleton} from "@/components/ui/skeleton";

export const JobCard = ({
                            column,
                            dragHandleProps,
                        }: {
    column: any;
    dragHandleProps?: React.HTMLAttributes<HTMLDivElement> | null;
}) => {
    const [viewMode, setViewMode] = useState<"edit" | "contacts">("edit");
    const [loading, setLoading] = useState(true);

    // Simulate loading or fetch
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // Simulate a 1s load
        return () => clearTimeout(timer);
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="bg-dark-test p-2 rounded-xl shadow text-sm border-dark-275 border border-solid outline-none cursor-pointer">

                    <div className="flex-col flex items-start px-2 pb-2 gap-2">

                        <div className="flex-between w-full">
                            <p className="font-extrabold text-[#DFDFDF]">{column.description}</p>
                            <div {...dragHandleProps} className="cursor-grab p-1">
                                <GripHorizontal className="text-gray-400 size-4"/>
                            </div>
                        </div>
                        <div className="flex-between gap-4">
                            {loading ? (
                                <>
                                    <Skeleton className="size-[24px] rounded-xl bg-gray-300" />
                                    <Skeleton className="h-4 w-24 bg-dark-400" />
                                </>
                            ) : (
                                <>
                                    <img
                                        src={`/api/logo?domain=${column.card_name}`}
                                        className="size-[24px] rounded-xl"
                                        alt={column.card_name}
                                    />
                                    <h4 className="font-light text-[#DFDFDF]">{column.card_name}</h4>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </DialogTrigger>

            <DialogContent className="max-w-5xl bg-dark-250 border border-dark-300 [&>button]:text-text-header">
                <DialogHeader>
                    <div className="py-2">
                    <img
                        src={`/api/logo?domain=${column.card_name}`}
                        className="size-[48px] rounded-xl"
                    />
                    </div>
                    <DialogTitle className="title-text-header">{column.card_name}</DialogTitle>
                    <DialogDescription className="title-text-subheader">{column.description}</DialogDescription>
                </DialogHeader>
                <nav>
                    <div className="flex flex-wrap gap-5 py-2">
                        <div
                            className="bg-dark-500 shadow-md rounded-md w-fit p-2 hover:bg-light-100"
                            onClick={() => setViewMode("edit")}
                        >
                            <div className="flex-between gap-2">
                                <Pencil className="size-4" />
                                <label>Edit</label>
                            </div>
                        </div>
                    </div>
                    <hr className="my-2" />
                </nav>
                {viewMode === "edit" && <EditJobCard column={column}/>}
            </DialogContent>
        </Dialog>
    );
};
