const useModal = require("../Models/useModel")
const bcrypt = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })

}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await useModal.findOne({ email });


        if (user) return res.status(400).json("user already registered")

        if (!name || !email || !password) return res.status(400).json("All fields are Required")

        if (!validator.isEmail(email)) return res.status(400).json("Email must be a valid email")
        // if (!validator.isStrongPassword(password)) return res.status(400).json("password must be a strong password")

        user = new useModal({ name, email, password })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        await user.save()
        const token = createToken(user._id)
        res.status(200).json({ _id: user._id, name, email, token })

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await useModal.findOne({ email });

        if (!user) return res.status(400).json("Invalid email or password")
        const invalidPassword = await bcrypt.compare(password, user.password)

        console.log(!invalidPassword, "psssss")

        if (!invalidPassword) return res.status(400).json("Invalid password")

        const token = createToken(user._id)
        res.status(200).json({ _id: user._id, name: user.name, email, token })
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
const findUser = async (req, res) => {
    const userId = req.params.userId
    
    try {
        const user = await useModal.findById({ _id: userId })
        res.status(200).json(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}
const getUser = async (req, res) => {

    try {
        const users = await useModal.find()
        res.status(200).json(users)
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)

    }
}


module.exports = { registerUser, loginUser, findUser, getUser }