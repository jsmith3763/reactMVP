import CategoryList from "./CategoryList";
import GoalsList from "./GoalsList";
import useFetch from "./useFetch";
import SingleCategory from "./SingleCategory";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";

const Home = () => {
    //custom hook we created to handle fetch requests
    const { data: category, isPending, error } = useFetch('http://localhost:3000/goalcategories');



    return (
        <div className="home">
            {/* evaluates left side and if it is falsy ignores the right side */}
            <h1>All Categories</h1>
            <h3>Click on category to see category goals</h3>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {category && <CategoryList category={category} />}
        </div>
    );
}

export default Home;