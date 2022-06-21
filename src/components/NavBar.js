import { Link } from "react-router-dom";

const NavBar = (props) => {
    return (
        <nav className="navbar">
            <h1>Welcome to your Personal Goal Tracker</h1>
            <div className="links">
                {/* <Link to="/">Home</Link> */}
                {/* Need to change these links but setting them now for aesthetics */}
                {/* <Link to="/completedgoals">Accomplished Goals</Link> */}
                {/* <a href="https://www.google.com/">Get Motivated</a> */}
                <Link to="/createcategory">New Category</Link>
            </div>
        </nav>
    );
}

export default NavBar;