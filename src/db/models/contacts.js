import { model, Schema } from 'mongoose';
import { typeList } from '../../constants/contacts.js';

const contactSchema = new Schema({
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
    userId: { 
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
},
    {
        timestamps: true, 
        versionKey: false
    }
);

const ContactsCollection = model('contacts', contactSchema);

export default ContactsCollection;