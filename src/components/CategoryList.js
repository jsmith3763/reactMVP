import SingleCategory from "./SingleCategory";


const CategoryList = (props) => {

    return (
        <div className="category-list">
            {props.category.map((category) => (
                <SingleCategory category={category.category} id={category.category_id} key={category.category_id} />
            ))}
        </div>
    );
}

export default CategoryList;