import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';



const style1 = {
    background: "#b1f5f5",
    color: "black",
    border: "2px solid black",
    boxShadow: "2px 2px 2px black",
    margin: "50px"
}

const buttonStyle = {
    borderRadius: "10px",
    padding: "5px",
    margin: "10px",
    background: "white",
    color: "black",
    boxShadow: "0px 2px 2px green"
}

const ViewOne = props => {
    const [oneAuthor, setOneAuthor] = useState(null)
    const navigate = useNavigate();
    const { _id } = useParams();
    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/" + _id)
            .then(res => setOneAuthor(res.data[0]))
            .catch(err => console.log(err))
    }, [_id])

const handleDelete = id => {
    axios.delete("http://localhost:8000/api/authors/delete/" + id)
        .then(() => navigate("/"))
        .catch(err => console.log("issue removing", err))
}

    return(
        <div>
            <div style={style1}>
            {
                oneAuthor ? <div>
                    <h2>Author Name:  {oneAuthor.name}</h2>
                    <hr/>
                    <button style ={buttonStyle} onClick={() => handleDelete(oneAuthor._id)}>Remove</button>
                </div> : ""
            }
            </div>
        </div>
    );
}

export default ViewOne;