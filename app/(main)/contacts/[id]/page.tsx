import React from 'react'
import AddContacts from "@/components/AddContacts";
import ContactCard from "@/components/ui/ContactCard";
import {getAllContacts} from "@/lib/actions/searchActions";

const Page = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    const contactData = await getAllContacts(id)
    return (

        <main>
            <div className="flex items-center px-32 py-16">
                <div className="flex flex-row justify-between items-end w-full">
                    <h1 className="text-text-main font-bold text-2xl px-16">All Contacts</h1>
                    <AddContacts/>
                </div>
            </div>
            <div className="flex flex-wrap gap-6 px-32">
                {contactData.length === 0 ? (
                    <div className="flex justify-center items-center w-full my-16">
                        <p className="text-text-main font-semibold">You have not added any contacts!</p>
                    </div>
                ) : (
                    contactData.map((contact, index) => (
                        <div key={index} className="w-[calc(24%-1rem)]"> {/* 4 items per row with 16px gap */}
                            <ContactCard
                                id={contact.id}
                                name={contact.name}
                                email={contact.email}
                                phone={contact.phone}
                                linkedin={contact.linkedin}
                                twitter={contact.twitter}
                                company={contact.company}
                                title={contact.title}
                            />
                        </div>
                    ))
                )}
            </div>
        </main>
    )
}
export default Page
