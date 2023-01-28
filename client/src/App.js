import NavBar from './scenes/navbar';
import HomePage from './scenes/homepage';
import LoginPage from './scenes/login'
import RegisterPage from './scenes/RegisterPage'
import CreatePost from './scenes/CreatePost';
import { BrowserRouter, Route, Router, Routes, Link } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './UserContext';
import IndividualPost from './scenes/IndividualPost';
import EditPost from './scenes/EditPost';
import DeletePost from './scenes/DeletePost';


function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <NavBar/>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<HomePage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/register' element={<RegisterPage/>}/>
              <Route path='/create' element={<CreatePost/>}/>
              <Route path='/post/:id' element={<IndividualPost/>} />
              <Route path='/edit/:id' element={<EditPost/>}/>
              <Route path='/delete/:id' element={<DeletePost/>}/>
            </Routes>
          </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
