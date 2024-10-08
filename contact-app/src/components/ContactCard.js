import React from "react";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import user from "../images/user.png";

const ContactCard = (props) => {
    const {removeContactHandler} = useContactsCrud();

    const deleteContact = (id) => {
        removeContactHandler(id);
    }
    const {id, name, email} = props.contact;
    return(
        <div className="item">
            <img className="ui avatar image" src={user} alt="user"/>
            <div className="content">
                <Link to={`/contact/${id}`} state={{contact: props.contact}}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            <Link to={`/edit/${id}`} state = { {contact: props.contact} } >
                <i 
                className="edit alternate outline icon " 
                style={{color:"pink", marginTop:"7px", marginLeft: "10px"}}
                />
            </Link>
            <Link to={`/delete/${id}`}>
                <i 
                className="trash alternate outline icon " 
                style={{color:"pink", marginTop:"7px"}}
                
                />
            </Link>
            
        </div>
    );
};

export default ContactCard;