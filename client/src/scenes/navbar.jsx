import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { UserContext } from '../UserContext';

export default function NavBar(){
    const [userName, setUserName] = useState(null);
    const {setUserInfo, userInfo} = useContext(UserContext);
//Get username
    useEffect(()=>{
        fetch('http://localhost:5000/profile', {
            credentials: 'include',
        })
        .then((res)=>res.json())
        .then((data)=>{
            setUserName(data.userName);
        });
    }, []);
    // const userName = userInfo?.userName;
//LOGOUT 
function logout(){
    fetch('http://localhost:5000/logout',{
        method: 'POST',
        credentials: 'include',
    });
    setUserInfo(null);
}

    return (
        <nav className="nav-bar flex justify-between border-x-2 mt-3 mb-4 shadow-sm pb-4">
            <div>
                <h1 className="nav--logo text-2xl inline ml-8 font-bold text-blue-400">Word Journeys</h1>
            </div>
            {
                userName && (<div className="nav--log-sign mt-2 mr-8">
                    <a href="/create" className="mr-4">{userName},  Create a Post</a>
                    {/* <button onClick={logout} className="w-20 h-8 bg-blue-500 rounded-md text-white hover:bg-blue-400">Logout</button> */}
                    <a href="" onClick={logout} className="mr-4">Logout</a>
                    </div>)
            }
            {
                !userName && (<div className="nav--log-sign mt-2 mr-8">
                    <a href="/login" className="mr-4">Login</a>
                    <a href="/register" className="">Register</a>
                    </div>)
            }

          
        </nav>
    )
}