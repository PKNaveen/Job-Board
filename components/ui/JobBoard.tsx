import { JobBoardWrapper } from "@/components/ui/JobBoardWrapper";
import { getBoardColumnNames, getAllCards } from "@/lib/actions/searchActions";

const JobBoard = async ({ board_id }: { board_id: string }) => {
    // Fetch board columns and cards data
    const data = await getBoardColumnNames(board_id);
    const card_list = await getAllCards(board_id);

    return <JobBoardWrapper board_id={board_id} data={data} card_list={card_list} />;
};

export default JobBoard;
