const { check } = require('express-validator')
const {validateResult} = require("../utils/validateResult")

const validateLogin = [
    check('contact')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    check('password')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    (req, res, next) => {
        validateResult(req, res, next)
    }
]

module.exports = { validateLogin }
