import './App.css';
import Login from './pages/Login';
import {AuthProvider} from './contexts/AuthContext';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TasksList from './pages/TasksList';
import Register from './pages/Register';
import TodayTask from './pages/TodayTask';
import TomorowTask from './pages/TomorowTask';
import PrivateRoute from './components/PrivateRoute';
import Logout from './pages/Logout';
import Dashbord from './pages/Dashbord';
import CreateTask from './pages/CreateTask';
import UpdateTask from './pages/UpdateTask';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <div className="App">
            <Routes>
              <Route element={<PrivateRoute><Dashbord/></PrivateRoute>} path='/dashbord'>
                <Route index element={<PrivateRoute><TasksList/></PrivateRoute>}/>
                <Route element={<PrivateRoute><TodayTask/></PrivateRoute>} path='/dashbord/tasks/today'/>
                <Route element={<PrivateRoute><TomorowTask/></PrivateRoute>} path='/dashbord/tasks/tomorow'/>
                <Route element={<PrivateRoute><CreateTask/></PrivateRoute>} path='/dashbord/tasks/add'/>
                <Route element={<PrivateRoute><UpdateTask/></PrivateRoute>} path='/dashbord/tasks/update/:pk'/>
              </Route>
              <Route element={<PrivateRoute><Home/></PrivateRoute>} path='/'/>
              <Route element={<Login/>} path='/login'/>
              <Route element={<Logout/>} path='/logout'/>
              <Route element={<Register/>} path='/register'/>
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
