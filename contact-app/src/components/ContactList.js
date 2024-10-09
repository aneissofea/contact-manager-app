import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    console.log(props);
    const {contacts, retrieveContacts, searchTerm, searchResults, searchHandler} = useContactsCrud();


    useEffect(() => {
        retrieveContacts();
    }, []);

    const renderContactList = (searchTerm.length < 1 ? contacts: searchResults).map((contact) => {
        return (
            <ContactCard 
                contact={contact} 
                key={contact.id}
            />
        );
    });

    const onUserSearch = (e) => {
        searchHandler(e.target.value);
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
                    className="prompt" 
                    type="text" 
                    placeholder="Search Contacts" 
                    value={searchTerm} 
                    onChange={(e) => onUserSearch(e)}
                    />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list"> {renderContactList.length >0 ? renderContactList : "No Contacts Available"} </div>
        </div>
        
    );
};

export default ContactList;