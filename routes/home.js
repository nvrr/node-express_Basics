const express = require('express')
const router = express.Router();


//* for html markup to sent to cutomer so we ned to use templeing like pakagess PUB,EJS
router.get('/', (req,res) => {
    res.render('index',{title:'My Expresss App', message:"Hello"})
})

module.exports = router;