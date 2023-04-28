const { Router } = require('express');

const router = Router();


router.get('/', (req, res) => {
    res.json({
        message: 'Hola mundo',
        message2: 'Hola mundo 2'
    })
})








module.exports = router;