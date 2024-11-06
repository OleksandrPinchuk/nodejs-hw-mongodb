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

const router = Router();

router.get("/contacts", ctrlWrapper(getContactsController));

router.get("/contacts/:contactId", ctrlWrapper(getContactsByIdController));

router.post("/contacts", ctrlWrapper(createContactController));

router.put("/contacts/:contactId", ctrlWrapper(upsertContactController));

router.patch("/contacts/:contactId", ctrlWrapper(patchContactController));

router.delete("/contacts/:contactId", ctrlWrapper(deleteContactController));

export default router;