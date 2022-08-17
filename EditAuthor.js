import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";

const EditAuthor = (props) => {
    const {id} = useParams();
    const [authorName, setAuthorName] = useState("");
    const [errors, setErrors] = useState("")
    const [authorNotFoundError, setAuthorNotFoundError] = useState("");
    const navigate = useNavigate();
    console.log(id);
    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/author/${id}`)
        .then((response) => {
            console.log(response.data);
            setAuthorName(response.data.name);
        })
        .catch((err) => {
            console.log(err.response);
            setAuthorNotFoundError("Author not found with that id");
        });
    }, []);

    const submitHandler = (e) =>{
        e.preventDefault();
        axios
        .put(`http://localhost:8000/api/author/${id}`, { name: authorName})
        .then((response) =>{
            console.log(response);
            navigate("/");
        })
        .catch((err) =>{
            console.log(err.response.data);
            setErrors(err.response.data);
        });
    };

    return (
        <form onSubmit={submitHandler}>
            {authorNotFoundError ? (<h2>{authorNotFoundError} <Link to="/new">Click here to add a new author</Link></h2>): null}
            <Link to="/">Home</Link>
            <div>
                <label>Name</label>
                <input type="text" id="name" value={authorName} onChange={(e) => setAuthorName(e.target.value)}></input>
                {errors.name ? <p>{errors.name.message}</p> : null} 
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default EditAuthor;