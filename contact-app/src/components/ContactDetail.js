import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import user from "../images/user.jpg";

const ContactDetail = (props) => {
    const {id} = useParams();
    const { contacts } = useContactsCrud();    
    const {name, email} = contacts.find(contact => contact.id === id);     

    return(
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="center-div">            
                <Link to="/">
                    <button className="ui button pink center">
                        Back to Contact List
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;