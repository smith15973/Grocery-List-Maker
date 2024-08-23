import { Link } from "react-router-dom"
import { pageData } from "./pageData"

export function Navbar() {

    return (
        <div className="navbar">
            {pageData.map(page => {
                return (
                    <Link key={page.name + page.path} to={page.path} className="navItem">
                        <button>
                            {page.name}
                        </button>
                    </Link>
                )
            })}
        </div>
    )
}