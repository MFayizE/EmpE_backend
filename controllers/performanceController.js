const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Performance = require('../models/performanceModel')

const createPerformance = asyncHandler(async (req, res) => {
    try {
        const { title, rating, addedFor } = req.body

        const user = await User.findById(req.user.id)
        if (!user) {
            res.status(401)
            throw new Error('User not found')
        }
        if (user.role !== 'HR') {
            res.status(401);
            throw new Error('Only HR users are allowed to create');
        }
    
        const performance = new Performance({
            title,
            rating,
            addedFor,
            addedBy: req.user.id
        })
    
        await performance.save();
        res.status(200).json(performance);    
    } catch (error) {
        res.status(400);
        throw new Error(error);
    }
   
    
})


module.exports = {
    createPerformance
 }