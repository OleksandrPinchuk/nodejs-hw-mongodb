import { Router } from "express";
import {
    getContactsController,
    getContactsByIdController,
    createContactController,
    upsertContactController,
    deleteContactController,
    patchContactController
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidId } from "../middlewares/isValidId.js";
import validateBody from "../middlewares/validateBody.js";
import { contactsAddSchema, contactUpdateSchema } from "../validation/contacts.js";

const router = Router();

router.get("/contacts", ctrlWrapper(getContactsController));

router.get("/contacts/:contactId", isValidId, ctrlWrapper(getContactsByIdController));

router.post("/contacts", validateBody(contactsAddSchema), ctrlWrapper(createContactController));

router.put("/contacts/:contactId", isValidId, validateBody(contactsAddSchema), ctrlWrapper(upsertContactController));

router.patch("/contacts/:contactId", isValidId, validateBody(contactUpdateSchema), ctrlWrapper(patchContactController));

router.delete("/contacts/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default router;