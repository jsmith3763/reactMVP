import { useState } from "react";
import { Link } from "react-router-dom";


const SingleCategory = (props) => {

    const id = props.id;
    const [currentCategory, setCurrentCategory] = useState(props.category);
    let [updatedCategory, setUpdatedCategory] = useState('');
    const [button, setButton] = useState(true);
    const [updateText, setUpdateText] = useState(false);
    const [isPending] = useState(false);

    const deleteClick = () => {
        fetch(`https://shielded-springs-77634.herokuapp.com/api/goalcategories/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setCurrentCategory(null)
            setButton(false)
        }
        )
    }

    const updateClick = () => {
        setUpdateText(true);
    }

    const updateGoal = (e) => {
        setCurrentCategory(updatedCategory);
        let updateObj = { category: updatedCategory }
        e.preventDefault();
        console.log(updatedCategory)
        fetch(`https://shielded-springs-77634.herokuapp.com/api/goals/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateObj)
        }).then(() => {
            console.log('Category updated');
        })
    }

    return (
        <div className="single-category">
            <Link to={`goals/${id}`}>
                <h2>{currentCategory}</h2>
            </Link>
            {button && <button onClick={(updateClick)}>Update</button>}
            {button && <button onClick={(deleteClick)}>Delete</button>}
            {updateText && <form onSubmit={updateGoal}>
                <label>Update:</label>
                <input
                    type="text"
                    required
                    value={updatedCategory}
                    onChange={(e) => setUpdatedCategory(e.target.value)}
                />
                {!isPending && <button>Update Goal</button>}
                {isPending && <button disabled>Updating goal...</button>}
            </form>}
        </div >
    );
}

export default SingleCategory; 