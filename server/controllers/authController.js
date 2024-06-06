const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const createError = require("../utils/appError");

// REGISTER USER
exports.signup = async (req, res, next) => {
    try {
        // faz uma busca especifica pelo email
        const user = await User.findOne({ email: req.body.email });

        // confere se o usuario existe
        if (user) {
            return res
                .status(422)
                .json({ msg: "Por Favor, utilize outro email!" });
        }

        // cria um hash para criptografar a senha
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        // cria um novo usuario recebendo os dados do usuario antigo + a senha nova criptografada.
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        // secretkey123 - chave secreta para incriptação

        // Assign JWT ( Json Web Token ) to user
        const token = jwt.sign({ _id: newUser._id }, "secretkey123", {
            expiresIn: "90d",
        });

        res.status(201).json({
            status: "success",
            message: "User registered sucessfully",
            token,
        });
    } catch (error) {
        next(error);
    }
};

// LOGGING USER
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // confere os campos preenchidos
    if (!email) {
        return res.status(201).json({ msg: "O email é obrigatório!" });
    }
    if (!password) {
        return res.status(201).json({ msg: "A senha é obrigatória!" });
    }

    // faz uma busca especifica pelo email
    const user = await User.findOne({ email: req.body.email });

    // confere se o usuario está cadastrado
    if (!user) {
        return res.status(422).json({ msg: "Usuairo não cadastrado!" });
    }

    // checa se a senha está correta
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(422).json({ msg: "Senha Inválida!"})
    }

    try{

        const secret = 'secretkey123'

        // verificando token
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret, {
                expiresIn: '90d',
            }
        );

        // acima o 3º atributo indica que a chave pode inspirar em 90 dias

        return res.status(200).json({
            status: 'success',
            token,
            message: "Autenticação realizada com secesso!",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "AutntiAconteceu um erro no servidor, tente novamente mais tarde!",
        });
    }
};
