import ContactsCollection from "../db/models/contacts.js";

export const getContacts = () => ContactsCollection.find();

export const getContactById = id => ContactsCollection.findById(id);

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const updateContact = async ({ _id, payload, options = {} }) => {
    const rawResult = await ContactsCollection.findOneAndUpdate({ _id }, payload,
        { ...options, new: true, includeResultMetadata: true,  });
    
    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted)
    };
};

export const deleteContact = async (contactId) => {
    const contact = await ContactsCollection.findOneAndDelete({_id: contactId});
    return contact;
};