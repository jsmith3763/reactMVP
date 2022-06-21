import { useState } from "react";
import { useParams } from "react-router";
import SingleGoal from "./SingleGoal";
import useFetch from "./useFetch";
import CreateGoal from "./CreateGoal";
import { Link } from "react-router-dom";
//may want to pass props in?
const GoalsList = (props) => {
    const { id } = useParams();
    const { data: category, error, isPending } = useFetch(`http://localhost:3000/goalcategories/${id}`);
    const { data: goals } = useFetch(`http://localhost:3000/goals/${id}`);
    console.log(category)


    return (
        <div className="goal-list">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {category && <h1>{category[0].title}</h1>}
            {goals && goals.map((goal) => (
                <SingleGoal goal={goal.goal} id={goal.goal_id} key={goal.goal_id} />
            ))
            }
            <CreateGoal id={id} />
            <Link to="/">Back To Categories</Link>
        </div>

    );
}

export default GoalsList;

/* {props.goals.map((goal) => (
                <SingleGoal goal={goal.goal} allGoals={props.goals} id={goal.goal_id} key={goal.goal_id} />
            ))} */