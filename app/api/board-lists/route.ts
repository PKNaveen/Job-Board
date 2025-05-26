import { NextResponse } from "next/server";
import { getBoardColumnNames} from "@/lib/actions/searchActions";

export async function POST(req: Request) {
    const { board_id } = await req.json();
    const columns = await getBoardColumnNames(board_id);
    return NextResponse.json({ columns });
}
