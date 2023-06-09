const mongoose = require('mongoose')

const peformanceSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    rating: {
        type: Number,
        required: [true, 'Please add an Rating'],
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    addedFor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Performance', peformanceSchema)