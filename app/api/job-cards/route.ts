// app/api/job-cards/route.ts
// update the path
import { NextResponse } from "next/server";
import {getAllCards} from "@/lib/actions/searchActions";

export async function POST(req: Request) {
    const { board_id } = await req.json();
    const cards = await getAllCards(board_id);
    return NextResponse.json({ cards });
}
