TRUNCATE goalcategories RESTART IDENTITY CASCADE;
TRUNCATE goals RESTART IDENTITY CASCADE;

INSERT INTO goalcategories (category) VALUES ('Short Term Goals');
INSERT INTO goals (goal, isGoalComplete, category_id) VALUES ('Begin adding new categories/goals', 'false', 1);