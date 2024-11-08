import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const EditContact = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state.contact); // Check if contact data is available
    const {id, name, email} = location.state.contact;
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const {updateContactHandler} = useContactsCrud();


    const update = (e) => {
        e.preventDefault();
        if(newName === "" || newEmail === "") {
            alert("All the fields are mandatory!");
            return;
        };
        updateContactHandler({id, name:newName, email:newEmail});
        setNewName("");
        setNewEmail("");
        //for the button to go back to contact list (/) page upon clicking
        navigate("/");        
    };

        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={update}>
                    <div className="field">
                        <label>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name"
                            value={newName}
                            onChange={ (e) => setNewName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Email"
                            value={newEmail}
                            onChange={ (e) => setNewEmail(e.target.value)}
                        />
                    </div>
                    <button className="ui button pink">Update</button>
                </form>
            </div>
        );

};

export default EditContact;