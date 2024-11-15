import mongoose from 'mongoose';
import { typeList } from '../../constants/contacts.js';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    contactType: {
        type: String,
        enum: typeList,
        required: true,
        default: 'personal',
    },
},
    {
        timestamps: true, 
        versionKey: false
    }
);

const ContactsCollection = mongoose.model('contacts', contactSchema);

export default ContactsCollection;