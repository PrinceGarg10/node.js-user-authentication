const { check, validationResult } = require('express-validator')
const {validateResult} = require("../utils/validateResult")
/**
 * Validates user registration
 */
const validateUserRegistration = [
    check('name')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
    check('lastName')
        .exists()
        .withMessage('MISSING')
        .not()
        .isEmpty()
        .withMessage('IS_EMPTY')
        .trim(),
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
        // try {
        //     validationResult(req).throw()
        // } catch (e) {
            validateResult(req, res, next)
        // }
    }
]


module.exports = { validateUserRegistration }
