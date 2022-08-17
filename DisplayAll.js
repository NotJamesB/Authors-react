import {useEffect, useState} from "react";
import axios from "axios";
import{Link} from "react-router-dom";

const DisplayAll = () => {
    const [allAuthors, setAllAuthors] = useState([]);
    useEffect(()=> {
        axios
        .get("http://localhost:8000/api/author")
        .then((response) => {
            console.log(response.data);
            setAllAuthors(response.data);
        })
        .catch((err) => {
            console.log(err.response);
        });
    }, []);
    const handleDelete = (idFromBelow) => {
        axios
        .delete(`http://localhost:8000/api/author/${idFromBelow}`)
        .then((response) => {
            console.log("Author Deleted!");
            console.log(response);
            const filteredAuthors = allAuthors.filter((author) => {
                return author._id !== idFromBelow;
            });
            setAllAuthors(filteredAuthors);
        })
        .catch((err) => {
            console.log("Could not delete author", err.response);
        });
    };

    return (
        <div>
            <Link to="/new">Add a new Author!</Link>
            <p>We have quotes by:</p>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Author</th>
                        <th scope="col">Actions Available</th>
                    </tr>
                </thead>
            </table>
            {allAuthors.map((author, index) => {
                return (
                    <tr key={author._id}>
                        <td>{author.name}</td>
                        <td> <Link to={`/edit/${author._id}`}> <button>Edit</button> </Link> 
                        <button onClick={()=> handleDelete(author._id)}>Delete</button> </td>
                    </tr>
                );
            })}
        </div>
    );
};

export default DisplayAll;