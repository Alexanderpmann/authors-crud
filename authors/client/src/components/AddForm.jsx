import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddForm = props => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
    });
    const [errors, setErrors] = useState({});
    const onChangeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const formHandler = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/authors/create", form)
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

const buttonstyle2 = {
    marginRight: "4px",
    border: "2px solid black",
    borderRadius: "10px",
    background: "white",
    color: "black",
    boxShadow: "0px 2px 2px green"
}

    return(
        <div style={formStyle1}>
            <h2>Add your favorite author!</h2>
            <form onSubmit={formHandler}>
                <div style={label1}>
                    <label htmlFor="name">Name  </label>
                    <input type="text" name="name" value={form.name} onChange={onChangeHandler} />
                    { errors.name ? <span>{errors.name.message}</span> : "" }
                </div>
                <div style={label1}>
                    <input style={buttonstyle2} type="submit" value="Add Author" />
                </div>
            </form>
        </div>

    );
}

export default AddForm;