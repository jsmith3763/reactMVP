import { useState } from "react";


const CreateGoal = (props) => {

    let [goal, setGoal] = useState('');
    const [isPending, setIsPending] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        goal = { goal, goal_id: 2, category_id: props.id, isGoalComplete: "false" };
        setIsPending(true);

        fetch('https://shielded-springs-77634.herokuapp.com/goals', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(goal)
        }).then(() => {
            console.log('New goal added');
            setIsPending(false);
        })
    }

    return (
        <div className="create">
            <h3>Create New Goal</h3>
            <form onSubmit={handleSubmit}>
                <label>Goal:</label>
                <input
                    type="text"
                    required
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                />
                {!isPending && <button>Add Goal</button>}
                {isPending && <button disabled>Adding goal...</button>}
            </form>
        </div>
    );
}

export default CreateGoal;