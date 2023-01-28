import { useState, useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { UserContext } from "../UserContext";

export default function IndividualPost(){
    const [userInfo, setUserInfo] = useState('');
    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();
    useEffect(()=>{
        fetch(`http://localhost:5000/post/${id}`)
        .then(res => res.json())
        .then(post => setPostInfo(post));
    },[]);
    useEffect(()=>{
        fetch('http://localhost:5000/profile', {
            credentials: 'include',
        })
        .then((res)=>res.json())
        .then((data)=>{
            setUserInfo(data);
        });
    }, [])

    if(!postInfo){
        return '';
    }


    return (
        <>
            <div className="flex justify-center">
                <img src={`http://localhost:5000/${postInfo.cover}`} alt="Post Photo" className="max-w-screen-lg max-h-40 flex self-center"/>
            </div>
            <h1 className="font-bold text-3xl m-16">{postInfo.title}</h1>
            <p className="ml-16 -mt-12 mb-6">Published on: {postInfo.createdAt} (Will be fixed, pls ignore for now!)</p>
            {/* EDIT BUTTON */}
            {   (userInfo.id === postInfo.author._id) && 
            (<Link to={`/edit/${postInfo._id}`}>
            <a href="" className="ml-16 -mt-18 underline">Edit the blog</a>
            </Link>)
            }
            
            <div className="ml-16 mr-16" dangerouslySetInnerHTML={{__html:postInfo.content}}></div>

            {/* DELETE BUTTON */}
            {   (userInfo.id === postInfo.author._id) && 
            (<Link to={`/delete/${postInfo._id}`}>
            <a className="ml-16 -mt-18 underline">Delete your blog</a>
            </Link>)
            }
        </>
    )
}