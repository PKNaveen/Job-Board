"use client"
import React, {useState} from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { JobCard } from "@/components/ui/JobCard";
import AddListButton from "@/components/AddListButton";
import DropdownMenuIcon from "@/components/DropdownMenuIcon";
import { AddJobCardButton } from "@/components/AddJobCardButton";
import {updateCardPosition} from "@/lib/actions/updateActions";


export const JobBoardWrapper = ({ board_id, data, card_list }: { board_id: string, data: any[], card_list: any[] }) => {
    const [columnData, setColumnData] = useState(data);
    const [columns, setColumns] = useState(() => {

        // For each column id an array of cards is generated:
        // Eg: "Wishlist" = ["card1","card2"]
        const map: Record<string, any[]> = {};
        data.forEach((col) => {
            map[col.id] = [];
        });

        // Each card contains a list_id which is the id of the column
        // Using  this they are pushed into the respective column arrays
        card_list.forEach((card) => {
            if (!map[card.list_id]) map[card.list_id] = [];
            map[card.list_id].push(card);
        });

        // Sort cards by position inside columns
        // This sorting happens before drag and drop so positions will remain unique for that column
        // For eg: if this the data as inserted into the array

        // Data:
        // { id: "1", list_id: "task_1", title: "Task A", position: 2 },
        //   { id: "2", list_id: "task_1", title: "Task B", position: 1 },
        //   { id: "3", list_id: "in_progress", title: "Task C", position: 3 },

        // Record: <String, Data[]>
        //  task_1: [ { Task A }, { Task B } ], - Before sort
        //   in_progress: [ { Task C }],
        //   done: []

        // After Sort:
        // task_1: [Task B (1), Task A (2)]
        // in_progress: [Task C (1)]

        for (const list of Object.values(map)) {
            list.sort((a, b) => a.position - b.position);
        }

        return map;
    });

    // As seen in the before example Task B and Task C have same position 1, but they are unique for their columns
    // After dropping this position is changed by the below function

    // After dropping result arg gets adjusted below through an example

    //   "test": [
    //     { id: "card-1", title: "Task 1" },
    //     { id: "card-2", title: "Task 2" }
    //   ],
    //   "in-progress": [
    //     { id: "card-3", title: "Task 3" }
    //   ],
    //   "done": []

    const onDragEnd = async (result: DropResult) => {
        const { destination, source } = result;

        // No change to destination break this function
        if (!destination) return;

        // Suppose we move card-1 to in-progress then result gets updated with the following source and destination
        // const result = {
        //   source: {
        //     droppableId: "test",
        //     index: 0
        //   },
        //   destination: {
        //     droppableId: "in-progress",
        //     index: 1
        //   },
        //   draggableId: "card-1",
        //   type: "DEFAULT"
        // };
        const fromListId = source.droppableId;
        const toListId = destination.droppableId;

        // Below sourceCards for vertical movement in same column
        // If its between two columns then use destinationCards
        // Spread checks for all cards inside the given list name
        // Suppose destination is different list i.e. fromList="Test" toList="done" then save the destination cards as toList

        const sourceCards = [...columns[fromListId]];
        const destinationCards = fromListId === toListId ? sourceCards : [...columns[toListId]];

        // Once movement is done we need to remove from source and update in destination
        const [movedCard] = sourceCards.splice(source.index, 1);
        destinationCards.splice(destination.index, 0, movedCard);

        // Then update this into the db
        const  updatedColumns = {
            ...columns,
            [fromListId]: sourceCards,
            [toListId]: destinationCards,
        };

        setColumns(updatedColumns);


        // Persist new position
        const updatedCards = updatedColumns[toListId].map((card, index) => ({
            card_id: card.id,
            position: index,
            listId: toListId,
        }));
        await updateCardPosition(updatedCards);
    };



    const refreshCardsAndLists = async () => {
        const [newColumnsRes, newCardsRes] = await Promise.all([
            fetch("/api/board-lists", {
                method: "POST",
                body: JSON.stringify({ board_id }),
                headers: { "Content-Type": "application/json" },
            }),
            fetch("/api/job-cards", {
                method: "POST",
                body: JSON.stringify({ board_id }),
                headers: { "Content-Type": "application/json" },
            }),
        ]);

        const newColumnsJson = await newColumnsRes.json();
        const newCardsJson = await newCardsRes.json();

        const newData = newColumnsJson.columns;
        const newCardList = newCardsJson.cards;

        // Your logic to rebuild and set state
        const map: Record<string, any[]> = {};
        newData.forEach((col) => {
            map[col.id] = [];
        });
        newCardList.forEach((card) => {
            if (!map[card.list_id]) map[card.list_id] = [];
            map[card.list_id].push(card);
        });
        for (const list of Object.values(map)) {
            list.sort((a, b) => a.position - b.position);
        }

        setColumns(map);
        setColumnData(newData);
    };




    return (
        <section className="my-20 p-10">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex space-x-8 min-w-max items-start">
                    {columnData.map((item) => (
                        <Droppable droppableId={item.id} key={item.id}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={`min-w-[250px] flex flex-col gap-2 bg-dark-900 rounded-xl p-2 ${
                                        snapshot.isDraggingOver ? "bg-dark-800" : ""
                                    }`}
                                >
                                    {/* Column Header */}
                                    <div className="rounded-xl bg-dark-test shadow-md border-dark-275 border border-solid outline-none drop-shadow-md">
                                        <div className="flex justify-between items-center p-2">
                                            <div className="flex-between gap-2">
                                                <h3 className="uppercase text-[#EEEFFC] font-semibold text-base">
                                                    {item.list_name}
                                                </h3>
                                            </div>
                                            <DropdownMenuIcon data={data} item={item} board_id={board_id} onSuccess={refreshCardsAndLists} />
                                        </div>
                                        <div className="w-full mx-36">
                                            <AddJobCardButton item={item} onSuccess={refreshCardsAndLists}/>
                                        </div>
                                    </div>

                                    {/* Cards */}
                                    {(columns[item.id] || []).map((card, index) => (
                                        <Draggable draggableId={card.id} index={index} key={card.id}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                >
                                                    <JobCard
                                                        column={card}
                                                        dragHandleProps={provided.dragHandleProps}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}

                                    {/* If no cards, keep min height to allow drop */}
                                    {columns[item.id].length === 0 && (
                                        <div className="h-24 rounded-lg   flex items-center justify-center text-gray-400 text-sm">
                                        </div>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    ))}
                    <AddListButton board_id={board_id} onSuccess={refreshCardsAndLists} />
                </div>
            </DragDropContext>
        </section>
    );
};
