import { SORT_ORDER } from "../constants/index.js";
import ContactsCollection from "../db/models/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getContacts = async ({ page = 1, perPage = 10, sortOrder = SORT_ORDER.ASC, sortBy = "_id", filter = {}, }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;
    const contactsQuery = ContactsCollection.find();
    if (filter.contactType) {
        contactsQuery.where("contactType").equals(filter.contactType);
    };
    if (filter.isFavourite) {
        contactsQuery.where("isFavourite").equals(filter.isFavourite);
    };
    if (filter.userId) {
        contactsQuery.where("userId").equals(filter.userId);
    };

    const contactsCount = await ContactsCollection.find().merge(contactsQuery).countDocuments();
    const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();
    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts,
        ...paginationData
    }
};

export const getContactById = async (id, userId) => {
    const contact = await ContactsCollection.findOne({ _id: id, userId });
    return contact;
}

export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};

export const updateContact = async (contactId, payload, options = {}, userId ) => {
    const rawResult = await ContactsCollection.findOneAndUpdate({ _id: contactId, userId }, payload,
        { ...options, new: true, includeResultMetadata: true,  });
    
    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted)
    };
};

export const deleteContact = async (contactId, userId) => {
    const contact = await ContactsCollection.findOneAndDelete({_id: contactId, userId});
    return contact;
};