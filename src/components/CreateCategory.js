import { useState } from "react";
import { Link } from 'react-router-dom';

const CreateCategory = () => {
    let [category, setCategory] = useState('');
    const [isPending, setIsPending] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        category = { category, category_id: 1 };
        setIsPending(true);

        fetch('https://shielded-springs-77634.herokuapp.com/goalcategories', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(category)
        }).then(() => {
            console.log('New category added');
            setIsPending(false);
        })
    }

    return (
        <div className="create">
            <h2>Create New Category</h2>
            <form onSubmit={handleSubmit}>
                <label>Category:</label>
                <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                {!isPending && <button>Add Category</button>}
                {isPending && <button disabled>Adding Category...</button>}
            </form>
            <Link to="/">Home</Link>
        </div>
    );
}

export default CreateCategory;