import React from 'react'
import {Dialog, DialogTrigger} from "@/components/ui/dialog";
import {Linkedin, Mail, Phone} from "lucide-react";

const ContactCard = () => {
    return (
         <Dialog>
             <DialogTrigger asChild>
                 <div
                     className="mx-28 px-4 bg-dark-test p-2 rounded-xl shadow text-sm border-dark-275 border border-solid outline-none cursor-pointer w-[250px] h-full">

                     <div className="flex-col flex items-start px-2 pb-2 gap-2">


                         <div className="flex-between w-full">
                             <p className="font-extrabold text-[#DFDFDF]">Test</p>
                         </div>
                         <div className="flex-between gap-4">
                             <h4 className="font-light text-[#DFDFDF]">test</h4>
                         </div>
                         <div className="w-full h-px bg-gray-500 my-2"/>
                         <div className="flex-between w-full py-2">
                             <div className="flex-col flex items-start gap-2 ">
                                 <div className="flex flex-row gap-2">
                                     <Mail color="#ffffff" className="size-4"/>
                                     <h4 className="font-light text-[#DFDFDF]">test</h4>
                                 </div>
                                 <div className="flex flex-row gap-2">
                                     <Phone color="#ffffff" className="size-4"/>
                                     <h4 className="font-light text-[#DFDFDF]">test</h4>
                                 </div>
                                 <div className="flex flex-row gap-2">
                                     <Linkedin color="#ffffff" className="size-4"/>
                                     <h4 className="font-light text-[#DFDFDF]">test</h4>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </DialogTrigger>
         </Dialog>
    )
}
export default ContactCard
