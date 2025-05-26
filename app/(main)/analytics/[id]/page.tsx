import React from 'react'
import Pie from "@/components/Pie";
import {getAllApplications, getCountOfCards} from "@/lib/actions/searchActions";

const Page =  async ({params}: { params: Promise<{id:string}>}) => {
    const {id} = await params;
    const getCards = await getCountOfCards(id);
    const getTotalCards = await getAllApplications(id);
    const totalCards = getTotalCards[0]?.total_card_count;
    const interview = getCards.find(item => item.list_name === 'interview');
    const offer = getCards.find(item => item.list_name === 'offer');
    const rejected = getCards.find(item => item.list_name === 'rejected');
    console.log(getCards);

    return (

        <main>
            <div className="grid grid-cols-2 items-center px-32 py-32">
                <div className="grid grid-cols-2 gap-8 px-12">
                    {/* Applications */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-text-main">Applications</h1>
                        <p className="text-xl font-medium text-text-main-sub">{Number(totalCards)}</p>
                    </div>

                    {/* Interview */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-text-main">Interview</h1>
                        <p className="text-xl font-medium text-text-main-sub">{interview ? Number(interview.count) : 0}</p>
                    </div>

                    {/* Offer */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-text-main">Offer</h1>
                        <p className="text-xl font-medium text-text-main-sub">{offer ? Number(offer.count) : 0}</p>
                    </div>

                    {/* Rejected */}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-text-main">Rejected</h1>
                        <p className="text-xl font-medium text-text-main-sub">{rejected ? Number(rejected.count) : 0}</p>
                    </div>
                </div>

                {/* Pie chart */}
                <div className="flex flex-col rounded-md">
                    <Pie/>
                </div>
            </div>
        </main>

    )
}
export default Page
