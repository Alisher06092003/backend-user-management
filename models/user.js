import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    phone1: String,
    phone2: String,
    team: String
});

export const User = mongoose.model('User', userSchema);