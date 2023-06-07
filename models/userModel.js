const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an Email'],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    // role: {
    //     type: String,
    //     required: [true, 'Please add a role']
    // },
    imageURL: {
        data:Buffer,
        type: String,
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema)