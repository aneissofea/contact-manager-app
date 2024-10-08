import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import api from './api/contacts';
import './App.css';
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetail from './components/ContactDetail';
import DeletePage from './components/DeletePage';
import EditContact from './components/EditContact';
import { ContactsCrudContextProvider } from './context/ContactsCrudContext';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";

  return (
      <div className="ui container">
        <Router>
          <Header />
          <div style={{marginTop: "50px"}}>
          <ContactsCrudContextProvider>
          <Routes>
            <Route 
              path='/' 
              exact
              element={<ContactList/>}
            />
            <Route 
              path='/add' 
              element={<AddContact />}
            />
            <Route path="/edit:id" element={<EditContact />}
            />
            <Route path="/contact/:id" element={<ContactDetail />} />
            <Route 
              path="/delete/:id" element={<DeletePage />} 
            />
          </Routes>
          </ContactsCrudContextProvider>
          </div>
        </Router>
      </div>
  );
};

export default App;
