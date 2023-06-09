const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Performance = require('../models/performanceModel')
const User = require('../models/userModel')
// const generateToken = require('../utils/generateToken')

const RegisterUser = asyncHandler(async (req, res) => {
    const { name, email, password, role, salary } = req.body
    console.log('name: ', name);

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please include all the fields')
    }

    //If user exist
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }


    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    console.log('helloo');
    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        salary
    })

    if (req.file) {
        console.log('req.file: ', req.file);
        user.imageURL = req.file.path; // Set the imageURL field to the path of the uploaded file
        await user.save();
    }

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            salary: user.salary,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log('password: ', password);
    console.log('email: ', email);

    //check user and password
    const user = await User.findOne({ email })
    if (!user) {
        res.status(400)
        throw new Error('User not Found')
    }
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            salary: user.salary,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid credentials')
    }

})

const listEmployees = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    if (user.role !== 'HR') {
        res.status(401);
        throw new Error('Only HR users are allowed to create');
    }
    const employees = await User.find({}, '_id name email role salary imageURL');
    
    res.status(200).json(employees);
  });

// access private
const getMe = asyncHandler(async (req, res) => {
    const performances = await Performance.find({ addedFor: req.user._id })
    .populate('addedBy', 'name')
    .populate('addedFor', 'name');
    const user = {
        id: req.user._id,
        role: req.user.role,
        salary: req.user.salary,
        email: req.user.email,
        name: req.user.name,
        imageURL: req.user.imageURL,
        performance: performances
    }
    res.status(200).json(user)
})



const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn:'30d'
    } )
}

module.exports = {
    RegisterUser,
    LoginUser,
    getMe,
    listEmployees
}