const router = require("express").Router();
const { getProfile, patchUpdateProfile } = require("../controllers/users");

router.use("/me", getProfile);
router.use("/me", patchUpdateProfile);

module.exports = router;
