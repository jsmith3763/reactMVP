require("dotenv").config();
const express = require("express");
const db = require("./db/conn");
const app = express();
const path = require('path');
const cors = require('cors');
const publicPath = path.join(__dirname, "..", 'public');

const PORT = process.env.PORT || 5555;

app.use(express.static(publicPath));
app.use(express.static("public"));
app.use(express.json());
app.use(cors())

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})


app.get("/api", (req, res) => {
    res.send('hello world')
});

//getall
app.get('/api/goals', async (req, res) => {
    try {
        let client = await db.connect();
        const result = await db.query("SELECT * FROM goals");
        res.send(result.rows);
        console.log(result.rows)
        client.release();
    } catch (error) {
        console.error(error);
        res.send("Error: ", error);
    }
});


//getall
app.get('/api/goalcategories', async (req, res) => {
    try {
        let client = await db.connect();
        const result = await db.query("SELECT * FROM goalcategories");
        res.send(result.rows);
        console.log(result.rows)
        client.release();
    } catch (error) {
        console.error(error);
        res.send("Error: ", error);
    }
});


//get
app.get('/api/goals/:id', async (req, res) => {
    try {
        let client = await db.connect();
        const result = await db.query("SELECT * FROM goals WHERE category_id = $1", [req.params.id]);
        res.send(result.rows);
        client.release();
    } catch (error) {
        console.error(error);
        res.send("Error: ", error);
    }
});

//getone
app.get('/api/goalcategories/:id', async (req, res) => {
    try {
        let client = await db.connect();
        const result = await db.query("SELECT * FROM goalcategories WHERE category_id = $1", [req.params.id]);
        res.send(result.rows);
        client.release();
    } catch (error) {
        console.error(error);
        res.send("Error: ", error);
    }
});


//update
app.patch('/api/goals/:id', async (req, res) => {
    try {
        let client = await db.connect();
        const { goal, isGoalComplete } = req.body;
        const currentGoal = await db.query('SELECT * FROM goals WHERE goal_id = $1', [req.params.id]);
        const goalObj = {
            goal: goal || currentGoal.rows[0].goal
            //may need to add isGoalComplete
        }

        const updatedGoal = await db.query('UPDATE goals SET goal = $1 WHERE goal_id = $2 RETURNING *', [goalObj.goal, req.params.id]);
        res.send(updatedGoal.rows[0]);
        client.release()
    } catch (error) {
        res.send(error.message);
    }
})

//update
app.patch('/api/goalcategories/:id', async (req, res) => {
    try {
        let client = await db.connect();
        const { category } = req.body;
        const currentCategory = await db.query('SELECT * FROM goalcategories WHERE category_id = $1', [req.params.id]);
        const categoryObj = {
            category: category || currentCategory.rows[0].goal
            //may need to add isGoalComplete
        }

        const updatedCategory = await db.query('UPDATE goalcategories SET category = $1 WHERE category_id = $2 RETURNING *', [categoryObj.category, req.params.id]);
        res.send(updatedCategory.rows[0]);
        client.release()
    } catch (error) {
        res.send(error.message);
    }
})

//post - May need to change category_id from SERIAL and pass in category id from textBox?
app.post('/api/goals', async (req, res) => {
    try {
        let client = await db.connect();
        const { goal, category_id, isgoalcomplete } = req.body;
        const { rows } = await db.query('INSERT INTO goals (goal, category_id, isgoalcomplete) VALUES($1, $2, $3) RETURNING *', [goal, category_id, isgoalcomplete]);
        res.send({ data: (rows), message: "New goal has been created" });
        console.log({ rows });
        client.release();
    } catch (error) {
        console.error(error);
    }
});

//post - May need to change category_id from SERIAL and pass in category id from textBox?
app.post('/api/completedgoals', async (req, res) => {
    try {
        let client = await db.connect();
        const { goal, category_id, isgoalcomplete } = req.body;
        const { rows } = await db.query('INSERT INTO completedGoals (goal, category_id, isgoalcomplete) VALUES($1, $2, $3) RETURNING *', [goal, category_id, isgoalcomplete]);
        res.send({ data: (rows), message: "Goal has been completed" });
        console.log({ rows });
        client.release();
    } catch (error) {
        console.error(error);
    }
});


//post - May need to change category_id from SERIAL and pass in category id from textBox?
app.post('/api/goalcategories', async (req, res) => {
    try {
        let client = await db.connect();
        const { category } = req.body;
        const { rows } = await db.query('INSERT INTO goalcategories (category) VALUES($1) RETURNING *', [category]);
        res.send({ data: (rows), message: "New category has been created" });
        console.log({ rows });
        client.release();
    } catch (error) {
        console.error(error);
    }
});

//delete
app.delete('/api/goals/:id', async (req, res) => {
    try {
        let client = await db.connect();
        const deletedGoal = await db.query('SELECT * FROM goals WHERE goal_id = $1', [req.params.id]);
        const deleted = await db.query('DELETE FROM goals WHERE goal_id = $1', [req.params.id]);
        res.send(deletedGoal.rows);
        client.release();
    } catch (error) {
        console.error(error);
    }
})

//delete
app.delete('/api/goalcategories/:id', async (req, res) => {
    try {
        let client = await db.connect();
        const deletedCategory = await db.query('SELECT * FROM goalcategories WHERE category_id = $1', [req.params.id]);
        const deletedGoals = await db.query('DELETE FROM goals where category_id = $1', [req.params.id]);
        const deleted = await db.query('DELETE FROM goalcategories WHERE category_id = $1', [req.params.id]);
        res.send(deletedCategory.rows);
        client.release();
    } catch (error) {
        console.error(error);
    }
})


app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
})