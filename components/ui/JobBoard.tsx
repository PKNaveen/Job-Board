import React from 'react'
import {getBoardColumnNames} from "@/lib/actions/searchActions";
import AddListButton from "@/components/AddListButton";




const JobBoard = async ({board_id}: { board_id: string }) => {
    const data = await getBoardColumnNames(board_id)
    // console.log(data)


    return (
        <section className="my-20 p-10">
            <ul className="flex space-x-8 min-w-max">
                {data.map((item, index) => (
                    <div
                    key={index}
                    className="min-w-[250px] p-2  rounded-md bg-blue-500 shadow-md">
                        <h3 className="uppercase ">{item.list_name}</h3>
                    </div>
                ))}
                <div
                    className="min-w-[250px] p-2 rounded-md bg-blue-500 shadow-md hover:bg-blue-700">
                    <AddListButton board_id={board_id}/>
                </div>
            </ul>
        </section>
    )
}
export default JobBoard
