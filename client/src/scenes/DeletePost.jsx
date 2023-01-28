import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"

export default function DeletePost(){
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();
    async function deletePost(){
        const response  = await fetch(`http://localhost:5000/post/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        })

        if(response.ok){
            setRedirect(true);
        }
    }
    if(redirect){
        return <Navigate to='/'/>
    }
    return (
        <>
            <div>
                Are you sure, you want to delete the post?
                <button className="text-white bg-red-500 hover:bg-red-400 w-20 rounded-md h-8 m-2 ml-16" onClick={deletePost}>Yes</button>
            </div>
        </>
    )
}