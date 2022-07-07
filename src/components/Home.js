import { useState, useEffect } from "react";
import CategoryList from "./CategoryList";
import useFetch from "./useFetch";



const Home = () => {


    const [categories, setCategories] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://shielded-springs-77634.herokuapp.com/api/goalcategories');
            if (!response.ok) {
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
            }
            let actualData = await response.json();
            setCategories(actualData);
            setError(null);
        } catch (error) {
            setError(error.message);
            setAnswer(null);
        }
    }


    return (
        <div className="home">
            {/* evaluates left side and if it is falsy ignores the right side */}
            <h1>All Categories</h1>
            <h3>Click on category to see category goals</h3>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {category && <CategoryList category={categories} />}
        </div>
    );
}

export default Home;