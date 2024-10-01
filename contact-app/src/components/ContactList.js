import React, {useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    console.log(props);
    const inputEl = useRef("");
    const deleteContactHandler = (id) => {
        props.handleDelete(id);
    };

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard 
            contact={contact} 
            clickHandler={deleteContactHandler} 
            key={contact.id}
            />
        );
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    };

    return (
        <div class="main">
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button pink right" style={{marginLeft:"155px"}}>Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input"> 
                    <input
                    ref={inputEl}
                    className="prompt" 
                    type="text" 
                    placeholder="Search Contacts" 
                    value={props.term} 
                    onChange={getSearchTerm}
                    />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list"> {renderContactList.length >0 ? renderContactList : "No Contacts Available"} </div>
        </div>
        
    );
};

export default ContactList;