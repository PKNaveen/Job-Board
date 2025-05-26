
export const sidebarLinks=[
    {
        imgUrl:"/clipboard-list.png",
        route:(id:string) => `/boards/${id}`,
        label:"Boards",
    },
    {
        imgUrl:"/contact.png",
        route:(id:string)=>`/contacts/${id}`,
        label:"Contacts",
    },
    // Calendar should be a future enhancement as I have to research on libraries such as schedule-x
    {
        imgUrl:"/chart.png",
        route:(id:string)=>`/analytics/${id}`,
        label:"Analytics",
    }

]

export const MainNavLinks = [
    {
        label:"About",
        route: "/"
    },
    {
        label: "Contact",
        route: "/"
    },
    {
        label: "Blog",
        route:"/",
    },
]




