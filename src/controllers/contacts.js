import createHttpError from "http-errors";
import { createContact, deleteContact, getContactById, getContacts, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const contacts = await getContacts({ page, perPage, });
    
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    })
};

export const getContactsByIdController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, "Contact not found");
    };

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    })
};

export const upsertContactController = async (req, res) => {
    const { contactId: _id } = req.params;
    const result = await updateContact({ _id, payload: req.body, options: { upsert: true, }});
    const status = result.isNew ? 201 : 200;

    if (!result) {
        throw (createHttpError(404, "Contact not found"));
    }

    res.status(status).json({
        status,
        message: "Successfully upserted a contact!",
        data: result
    })
};

export const patchContactController = async (req, res) => {
    const { contactId: _id } = req.params;
    const result = await updateContact({ _id, payload: req.body });

    if (!result) {
        throw (createHttpError(404, "Contact not found"));
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.contact,
    })
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await deleteContact(contactId);

    if (!contact) {
    throw (createHttpError(404, `Contact not found`));
    }
    res.status(204).send();
};