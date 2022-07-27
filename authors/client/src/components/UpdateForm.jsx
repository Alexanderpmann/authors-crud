import axios from 'axios';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

const UpdateForm = props => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
    });
    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/" + _id)
            .then(res => setForm(res.data[0]))
            .catch(err => console.log(err))
    }, [_id]);
    const [errors, setErrors] = useState({});
    const onChangeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const formHandler = e => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/authors/update/" + _id, form)
            .then(res => {
                // we did it wrong
                if(res.data.err) {
                    console.log("Something went wrong!")
                    setErrors(res.data.err.errors)
                } else {
                    // we did it right
                    console.log("we made it!")
                    navigate("/");
                }
            })
            .catch(err => console.log(err))
    }

const formStyle1 = {
        border: "2px solid black",
        background: "ghostwhite",
        borderRadius: "20px",
        margin: "100px",
        padding: "10px",
        boxShadow: "5px 5px 5px black"
    }

const label1 = {
    padding: "5px",
    margin: "10px",
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
        <div style={formStyle1}>
            <h2>Update Author Name</h2>
            <form onSubmit={formHandler}>
                <div style={label1}>
                    <label htmlFor="name">Name  </label>
                    <input type="text" name="name" value={form.name} onChange={onChangeHandler} />
                    { errors.name ? <span>{errors.name.message}</span> : "" }
                </div>
                <div>
                    <input style={buttonstyle3} type="submit" value="Update Author Name" />
                </div>
            </form>
        </div>
    );
}

export default UpdateForm;