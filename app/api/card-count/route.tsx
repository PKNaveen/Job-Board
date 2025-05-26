import {NextResponse} from "next/server";
import {getCountOfCards} from "@/lib/actions/searchActions";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({error: 'Missing ID'}, {status: 400});

    const data = await getCountOfCards(id);
    return NextResponse.json(data);
}
