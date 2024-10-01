import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import api from './api/contacts';
import './App.css';
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetail from './components/ContactDetail';
import DeletePage from './components/DeletePage';
import EditContact from './components/EditContact';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  //retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts")
    return response.data;
  };

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
    setContacts(contacts.map(contact => {
      return contact.id ===id ? {...response.data} : contact
    }));
  };

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

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };
    
    getAllContacts();
  }, []);

  useEffect(() => {
    
  }, [contacts]);

  return (
      <div className="ui container">
        <Router>
          <Header />
          <div style={{marginTop: "50px"}}>
          <Switch>
            <Route 
              path='/' exact 
              render={(props) => (
                <ContactList 
                  {...props} 
                  contacts={searchTerm.length < 1 ? contacts : searchResults} 
                  handleDelete={removeContactHandler}
                  term = {searchTerm}
                  searchKeyword = {searchHandler}
                />
              )}
            />
            <Route 
              path='/add' 
              render={(props) => ( 
                <AddContact {...props} addContactHandler={addContactHandler}/>
              )}
            />
            <Route 
              path='/edit' 
              render={(props) => ( 
                <EditContact {...props} updateContactHandler={updateContactHandler}/>
              )}
            />
            <Route path="/contact/:id" component={ContactDetail} />
            <Route 
              path="/delete/:id" 
              render={(props) => (
                <DeletePage {...props} handleDelete={removeContactHandler}/>
              )} />
          </Switch>
          </div>
        </Router>
      </div>
  );
};

export default App;
