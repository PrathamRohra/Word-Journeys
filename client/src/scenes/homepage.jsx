import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Route, Router, Routes, Link } from 'react-router-dom'
import Post from './posts';

export default function HomePage(){
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/post')
        .then(res => res.json())
        .then(posts => setPosts(posts));
    }, []);

    return (
        <>
           {/* {posts.length > 0 && posts.map(
              (post) => { <Post {...post}/> }
           )} */}
           {posts.length>0 && posts.map( post =>  <Post {...post} />)}
        </>
    )
}