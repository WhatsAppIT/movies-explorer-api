const router = require("express").Router();
const { getProfile } = require("../controllers/users");

router.use("/me", getProfile);

module.exports = router;
