import { useContext } from "react";
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from "../UserContext";

export default function Login(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);
   // const navigate = useNavigate();

    async function login(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          body: JSON.stringify({userName, password}),
          headers: {'Content-Type':'application/json'},
          credentials: 'include',
        });
        if (response.ok) {
          response.json()
          .then(userInfo => {
            setUserInfo(userInfo);
            setRedirect(true);
          });
        } else {
          alert('wrong credentials');
        }
      }
      if (redirect) {
        return <Navigate to={'/'} />
      }

    return(
        <>
        <div className="p-20 outline-dashed max-w-4xl m-8 rounded-md mt-16 flex flex-col">
            <h2 className="text-3xl font-bold mb-10">Login</h2>
            <form onSubmit={login}>
                <input placeholder="Enter your username" type="text" className="block w-96 h-10 focus:outline-none p-4 mb-4 outline rounded-md max-w-full"
                value = {userName}
                onChange = { (e) => { setUserName(e.target.value) } } 
                />
                <input placeholder="Enter your Name" type="password" className="block w-96 h-10 focus:outline-none p-4 mb-4 outline rounded-md max-w-full"
                value = {password}
                onChange = { (e) => { setPassword(e.target.value) } }
                />
                <button className="w-36 h-10 bg-blue-500 rounded-md text-white text-center hover:bg-blue-400 mb-12">Login</button>
            </form>
            <div>New to Word Journeys? <a href="/register" className="underline">Sign Up</a></div>
        </div>
        </>
    )
}