import { Navbar } from "./Navbar"
import { Outlet } from "react-router-dom"

export function Layout() {

    return (
        <div style={{flexWrap: "wrap"}}>
            <Navbar />
            <Outlet />
        </div>
    )
}