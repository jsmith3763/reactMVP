DROP DATABASE IF EXISTS goals_db;

CREATE DATABASE goals_db;

DROP TABLE IF EXISTS goalcategories CASCADE;
DROP TABLE IF EXISTS goals;

CREATE TABLE goalcategories (
    category_id SERIAL NOT NULL,
    category TEXT,
    PRIMARY KEY (category_id)
);

CREATE TABLE goals (
    goal_id SERIAL NOT NULL,
    category_id INTEGER,
    goal TEXT,
    isGoalComplete BOOLEAN,
    PRIMARY KEY (goal_id),
    FOREIGN KEY (category_id) REFERENCES goalcategories(category_id)
);