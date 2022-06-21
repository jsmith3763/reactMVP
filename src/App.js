import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import CreateGoal from './components/CreateGoal';
import CreateCategory from './components/CreateCategory';
import GoalsList from './components/GoalsList';



function App() {

  return (
    <Router>
      <div className="App">

        <Routes>
          <Route exact path="/" element={
            <>
              <NavBar />
              <Home />
            </>
          }>
          </Route>
          <Route exact path="/createcategory" element={
            <CreateCategory />
          }>
          </Route>
          <Route exact path="/creategoal" element={
            <CreateGoal />
          }>
          </Route>
          <Route exact path="/goals/:id" element={
            <>
              <GoalsList />
            </>
          }>
          </Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
