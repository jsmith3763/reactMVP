
import { useState } from "react";

const SingleGoal = (props) => {
    const id = props.id;
    const [currentGoal, setGoal] = useState(props.goal);
    let [newGoal, setNewGoal] = useState('');
    const [button, setButton] = useState(true);
    const [updateText, setUpdateText] = useState(false);
    const [isPending, setIsPending] = useState(false);


    const deleteClick = () => {
        fetch(`https://shielded-springs-77634.herokuapp.com/api/goals/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setGoal(null)
            setButton(false)
        }
        )
    }

    const updateClick = () => {
        setUpdateText(true);
    }

    const updateGoal = (e) => {
        setGoal(newGoal);
        let updateObj = { goal: newGoal }
        e.preventDefault();
        console.log(newGoal)
        fetch(`https://shielded-springs-77634.herokuapp.com/api/goals/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateObj)
        }).then(() => {
            console.log('Goal updated');
        })
    }



    return (
        <div className="singleGoal">
            <h3>{currentGoal}</h3>
            {button && <button onClick={(updateClick)}>Update</button>}
            {button && <button onClick={(deleteClick)}>Delete</button>}
            {updateText && <form onSubmit={updateGoal}>
                <label>Update:</label>
                <input
                    type="text"
                    required
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                />
                {!isPending && <button>Update Goal</button>}
                {isPending && <button disabled>Updating goal...</button>}
            </form>}
        </div>
    );
}

export default SingleGoal;