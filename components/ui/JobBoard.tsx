
import React from 'react'
import {getBoardColumnNames} from "@/lib/actions/searchActions";
import AddListButton from "@/components/AddListButton";
import DropdownMenuIcon from "@/components/DropdownMenuIcon";





const JobBoard = async ({board_id}: { board_id: string }) => {
    const data = await getBoardColumnNames(board_id)

    console.log(data)



    return (
        <section className="my-20 p-10">
            <ul className="flex space-x-8 min-w-max">
                {data.map((item) => (


                    // Map runs and mounts the below elements into the DOM based on the array data
                    // Due to this each list will have its unique id, which helps in running custom processes on any list column
                    <div
                    key={item.position}
                    className="min-w-[250px] p-2  rounded-md bg-blue-500 shadow-md flex justify-between items-center">
                        <h3 className="uppercase ">{item.list_name}</h3>
                        <DropdownMenuIcon data={data} item={item} board_id={board_id}/>
                    </div>
                ))}
                <div
                    className="min-w-[250px] p-2 rounded-md bg-blue-500 shadow-md hover:bg-blue-700 justify-between items-center">
                    <AddListButton board_id={board_id}/>
                </div>
            </ul>
        </section>
    )
}
export default JobBoard
