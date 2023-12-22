const router = require("express").Router();
const { getProfile, patchUpdateProfile } = require("../controllers/users");
//console.log(patchUpdateProfile);
router.get("/me", getProfile);
router.patch("/me", patchUpdateProfile);

module.exports = router;
