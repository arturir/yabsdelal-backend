const router = require('express').Router();
const basicAuth = require('express-basic-auth');
const {USER, PASSWORD} = process.env;

router.use(basicAuth({
    users: { [USER]: PASSWORD }
}))

module.exports = router;