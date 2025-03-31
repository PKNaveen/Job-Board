import React, {ReactNode} from 'react'
import Image from "next/image";

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <main className="auth-container">
            {/*form section*/}
            <section className="auth-form">
                <div className="auth-box ">
                    <div className="flex flex-row gap-3">
                        <Image src="/vercel.svg" alt="icons" width={24} height={24}/>
                        <h1 className="text-2xl font-semibold text-white">Job Board</h1>
                    </div>
                    <div>{children}</div>
                </div>
            </section>


            {/*Image section*/}
            <section>

            </section>
        </main>
    )
}
export default Layout
