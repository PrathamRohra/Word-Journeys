import { useState } from "react"

export default function Register(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    async function register(e) {
        e.preventDefault();
        await fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify({userName, password}),
            headers: {'Content-Type': 'application/json'}
        }
        )
        
        //else{
         //   alert("Registration unsuccessful :(");
        //}
    }


    return(
        <>
        {/* Some form and tailwind stuff */}
        <div className="p-20 outline-dashed max-w-4xl m-8 rounded-md mt-16 flex flex-col">

            <h2 className="text-3xl font-bold mb-10">Register</h2>


            <form onSubmit={register} action="POST">
                
                <input placeholder="Enter a username" type="text" className="block w-96 h-10 focus:outline-none p-4 mb-4 outline rounded-md focus:outline-blue-400 max-w-full" name="userName"
                value = {userName}
                onChange = { (e) => { setUserName(e.target.value) } } 
                />
                <input placeholder="Enter your password" type="password" className="block w-96 h-10 focus:outline-none focus:outline-blue-400 p-4 mb-4 outline rounded-md max-w-full" name="password"
                value = {password}
                onChange = { (e) => { setPassword(e.target.value) } }
                />
                <button className="w-36 h-10 bg-blue-500 rounded-md text-white text-center hover:bg-blue-400 mb-12">Sign Up</button>
            </form>
            <div>Already a user? <a href="/login" className="underline">Login</a></div>
        </div>
        </>
    )
}