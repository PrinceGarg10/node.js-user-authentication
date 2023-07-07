const userService = require('../services/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function loginUser(contact, password) {
    const findUser = await userService.findOneUserByQuery({
        contact
    })
    if (!findUser) {
        throw "User Not Found"
    }
    const validatePassword = await bcrypt.compare(password, findUser.password)
    if(!validatePassword) {
        throw "Incorrect Password"
    }
    const token = jwt.sign({ contact, id: findUser._id }, process.env.JWT_SECERT, { expiresIn: '1h' });
    return { token, findUser }
}

module.exports = loginUser