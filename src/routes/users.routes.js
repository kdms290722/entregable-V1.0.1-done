const { Router } = require('express');
const router = Router();

router.get("/users", (req, res) => {
    res.json({message: "obteniendo todo los usuario"});
});
   
module.exports = router;
