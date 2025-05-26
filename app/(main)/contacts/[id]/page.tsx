import React from 'react'
import AddContacts from "@/components/AddContacts";
import ContactCard from "@/components/ui/ContactCard";

const Page = () => {
    return (
        <main>
            <div className="flex items-center px-32 py-16">
                <div className="flex flex-row justify-between items-end w-full">
                <h1 className="text-text-main font-medium text-2xl">All Contacts</h1>
                    <AddContacts/>
                </div>
            </div>
            <div className="grid grid-cols-5">
                <ContactCard/>
            </div>
        </main>
    )
}
export default Page
