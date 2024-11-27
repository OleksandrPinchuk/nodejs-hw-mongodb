import Joi from "joi";
import { typeList } from "../constants/contacts.js";

export const contactsAddSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Contact name should be a string',
    'string.min': 'Contact name should have at least {#limit} characters',
    'string.max': 'Contact name should have at most {#limit} characters',
    'any.required': 'Contact name is required',
    }),
    phoneNumber: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(30),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList).required(),
    userId: Joi.string().required(),
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(30).messages({
    'string.base': 'Contact name should be a string',
    'string.min': 'Contact name should have at least {#limit} characters',
    'string.max': 'Contact name should have at most {#limit} characters',
    'any.required': 'Contact name is required',
    }),
    phoneNumber: Joi.string().min(3).max(30),
    email: Joi.string().min(3).max(30),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...typeList),
});