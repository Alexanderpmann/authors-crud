import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewAll = props => {
    const [authors, setAuthor] = useState(null);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
        .then(res => setAuthor(res.data))
        .catch(err => console.log(err))
    }, [update])
    const handleDelete = id => {
        axios.delete("http://localhost:8000/api/authors/delete/" + id)
            .then(() => setUpdate(!update))
            .catch(err => console.log("issue removing", err))
    }

const buttonstyle2 = {
    marginRight: "4px",
    border: "2px solid black",
    borderRadius: "10px",
    background: "white",
    color: "black",
    boxShadow: "0px 2px 2px green"
}

const buttonstyle3 = {
    marginLeft: "4px",
    border: "2px solid black",
    borderRadius: "10px",
    background: "red",
    color: "white",
    boxShadow: "0px 2px 2px black"
}

    return(
        <div>
            <h2>Favorities most competent authors!</h2>
            <div className="flex">
            {
                authors ? authors.map((item, i) => <div key={i} className="card">
                    <Link to={`/author/${item._id}`}>
                        <h3>Name: {item.name}</h3>
                    </Link>
                    <button style={buttonstyle2} onClick={() => handleDelete(item._id)}>Remove</button>
                    <Link to={`/update/${item._id}`}><button style={buttonstyle3}>Edit</button></Link>
                </div>) : ""
        }
            </div>
        </div>
    );
}

export default ViewAll;