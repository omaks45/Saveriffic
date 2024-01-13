const express = require('express')
const router = express.Router()
const {signup} = require('../controller/user')
const { check } = require('express-validator')

router.post('/signup', [
    check("name", "Name atleast should be 3 characters").isLength({min: 3}),
    check("email", "Email should be valid").isEmail(),
    check("password", "Password atleast should be 6 characters").isLength({min: 6}),
], signup)


module.exports = router;