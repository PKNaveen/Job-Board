export interface BoardItem{
    board_id:string,
    id:string,
    list_name:string,
    position:number
}

export interface data{
    id:string,
    board_id:string,
    list_name:string,
    position:number
}

export type Contact = {
    id: string;
    board_id: string;
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    twitter: string;
    company: string;
    title: string;
};
