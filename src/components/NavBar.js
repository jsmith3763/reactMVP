import { Link } from "react-router-dom";

const NavBar = (props) => {
    return (
        <nav className="navbar">
            <h1>Welcome to your Personal Goal Tracker</h1>
            <div className="links">
                <Link to="/createcategory">New Category</Link>
            </div>
        </nav>
    );
}

export default NavBar;