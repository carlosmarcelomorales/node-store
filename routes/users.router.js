const express = require('express');
const {faker} = require("@faker-js/faker");

const router = express.Router();


router.get('/', (req, res) => {
    const {id} = req.query;
    res.json({
        id: id
    })
})

module.exports = router;