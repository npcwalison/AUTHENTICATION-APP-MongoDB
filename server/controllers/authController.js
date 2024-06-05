const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const createError = require('../utils/appError');

// REGISTER USER
exports.signup = async (req, res, next) => {
    try{
        // faz uma busca especifica pelo email
        const user = await User.findOne({ email: req.body.email })

        // confere se o usuario existe
        if(user) {
            return next(new createError('User already exists!', 400))
        }

        // cria um hash para criptografar a senha
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        // cria um novo usuario recebendo os dados do usuario antigo + a senha nova criptografada.
        const newUser = await User.create({
            ...req.body,
                password: hashedPassword,
        })

        // Assign JWT ( Json Web Token ) to user
        const token = jwt.sign({ _id: newUser._id }, 'secretkey123', {
            expiresIn: '90d'
        })

        res.status(201).json({
            status: 'success',
            message: 'User registered sucessfully',
            token
        })

    } catch (error) {
        next(error);
    }
};

// LOGGING USER
exports.login = async (req, res, next) => {};