import ContactsCollection from "../db/models/ccontacts.js";

export const getContacts = () => ContactsCollection.find();

export const getContactById = id => ContactsCollection.findById(id);