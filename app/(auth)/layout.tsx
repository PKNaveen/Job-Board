import React, {ReactNode} from 'react'
import Image from "next/image";

const Layout = ({children}: { children: ReactNode }) => {
    return (
        <main className="auth-container">
            {/*form section*/}
            <section className="auth-form">
                <div className="auth-box ">
                    <div className="flex flex-row gap-3">
                        <Image src="/logo.svg" alt="icons" width={48} height={48}/>
                        <h1 className="text-3xl font-bold text-text-header">Seeker</h1>
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
