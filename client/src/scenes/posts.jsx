import { Link } from 'react-router-dom';

export default function Post(props){
    // console.log(props);
    console.log(props.cover);
    return (
        <>
            <div className="flex flex-row p-4 max-w-7xl relative mb-9 max-w-full">
            <div className="max-w-xs">
                <Link to={`/post/${props._id}`}>
                <img src={`http://localhost:5000/${props.cover}`} alt="some-alt" className="max-w-xs rounded-md max-h-28"/>
                </Link>
            </div>
           <div className="flex flex-col max-w-xs p-4">
                <h2 className="block font-bold text-2xl">{props.title}</h2>
                <p className="">
                    <a href="" className="font-medium">Author: {props.author.userName}</a>
                    <p className="mb-4">{props.createdAt}</p>
                </p>
                <p className="absolute bottom-0 mb-4 mt-2 overflow-ellipsis max-h-8 text-ellipsis">{props.summary}</p>
           </div>
        </div>
        </>
    )
}