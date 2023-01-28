import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function EditPost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [file, setFile] = useState('');
    const [content, setContent] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();
    console.log(id);
    //FILLING THE DATA: 
    useEffect(() => {
        fetch(`http://localhost:5000/post/${id}`)
          .then(response => {
            response.json().then(postInfo => {
              setTitle(postInfo.title);
              setContent(postInfo.content);
              setSummary(postInfo.summary);
            });
          });
      }, []);


    async function updatePost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (file?.[0]) {
            data.set('file', file?.[0]);
        }
        const response = await fetch('http://localhost:5000/post', {
        method: 'PUT',
        body: data,
        credentials: 'include',
        });
        if (response.ok) {
        setRedirect(true);
        }
    }
    if(redirect){
        return <Navigate to="/"/>
    }


    return (
        <>
        <h1 className="text-2xl font-bold ml-14">Update the blog</h1>
            
        <form className="p-10" onSubmit={updatePost}>
          {/*Title*/}
             <input type="title" 
             placeholder="Title" 
             className="block w-10/12 outline outline-slate-600 focus:outline-dashed rounded-md h-10 p-3 m-4 -mt-4"
             value={title} 
             onChange={e => setTitle(e.target.value)}/>
             {/*Summary*/}
             <input type="summary" 
             placeholder="Add a summary" 
             className="block w-10/12 outline outline-slate-600 focus:outline-dashed rounded-md h-10 p-3 m-4"
             value={summary} 
             onChange={e => setSummary(e.target.value)}/>
             {/*File*/}
             <input type="file" 
             placeholder="Upload a file" 
             className="block w-10/12 outline outline-slate-600 focus:outline-dashed rounded-md h-12 p-2 m-4"
             onChange={e => setFile(e.target.files)} />
             {/*Content*/}
             <ReactQuill className="m-4 w-10/12 rounded-md" 
                 value={content}
                 onChange={newValue => setContent(newValue)}
             />

             <button className="w-10/12 h-10 m-4 -mt-4 bg-blue-500 hover:bg-blue-400 text-white rounded-md">Publish Updated Blog</button>
        </form>
     </>
    )
}