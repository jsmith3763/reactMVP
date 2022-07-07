import CategoryList from "./CategoryList";
import useFetch from "./useFetch";


const Home = () => {
    //custom hook we created to handle fetch requests
    const { data: category, isPending, error } = useFetch('https://shielded-springs-77634.herokuapp.com/goalcategories');



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