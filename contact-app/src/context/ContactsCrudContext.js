import {createContext, useContext, useState} from "react";
import api from '../api/contacts';
import {v4 as uuid} from 'uuid';

const contactsCrudContext = createContext();

export function ContactsCrudContextProvider ({children}) {
    const [contacts, setContacts] = useState([ ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    //Retrieve contacts
    const retrieveContacts = async () => {
        const response = await api.get("/contacts")
        if(response.data) setContacts(response.data);
    };

    //Add contacts
    const addContactHandler = async (contact) => {
        const request = {
          id: uuid(),
          ...contact
        }
        
        //create api call
        const response = await api.post("/contacts", request)
        console.log(response);
        setContacts([...contacts, response.data]);
    };

    //edit contact detail function
    const updateContactHandler = async (contact) => {
        const response = await api.put(`/contacts/${contact.id}`,  contact);
        const {id} = response.data;
        setContacts(contacts.map((contact) => {
            return contact.id ===id ?  {...response.data} : contact
        }));
    };

    //Delete contacts
    const removeContactHandler = async (id) => {
        await api.delete(`/contacts/${id}`);
        const newContactList = contacts.filter((contact) => {
          return contact.id !==id;
        });
        setContacts(newContactList);
    };

    //search bar function
    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if(searchTerm !== ""){
        const newContactList = contacts.filter((contact) => {
            return Object.values(contact)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        });
        setSearchResults(newContactList);
        } else {
        setSearchResults(contacts);
        }
    };

    const value = {
        contacts,
        searchTerm,
        searchResults,
        searchHandler,
        retrieveContacts,
        removeContactHandler,
        addContactHandler,
        updateContactHandler 
    }
    return <contactsCrudContext.Provider value={ value }>
        {children}
    </contactsCrudContext.Provider>
}

export function useContactsCrud() {
    return useContext(contactsCrudContext);
}