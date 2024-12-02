import createHttpError from "http-errors";
import { createContact, deleteContact, getContactById, getContacts, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { requestResetToken } from "../services/auth.js";

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    // const userId = req.user._id;
    const { _id: userId } = req.user;
    filter.userId = userId;
    
    const contacts = await getContacts({ page, perPage, sortBy, sortOrder, filter, userId });
    
    res.status(200).json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    })
};

export const getContactsByIdController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const contact = await getContactById(contactId, userId);

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
    const userId = req.user._id;
    const contact = await createContact({...req.body, userId});

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    })
};

export const upsertContactController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const result = await updateContact(contactId, req.body, { upsert: true, }, userId);
    const status = result.isNew ? 201 : 200;

    if (!result) {
        throw createHttpError(404, "Contact not found");
    }

    res.status(status).json({
        status,
        message: "Successfully upserted a contact!",
        data: result
    })
};

export const patchContactController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const result = await updateContact(contactId, req.body, {}, userId);

    if (!result) {
        throw createHttpError(404, "Contact not found");
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result.contact,
    })
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const contact = await deleteContact(contactId, userId);

    if (!contact) {
    throw createHttpError(404, `Contact not found`);
    }
    
    res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
    res.json({
        message: "Reset password email was successfully sent!",
        status: 200,
        data: {},
    });
};