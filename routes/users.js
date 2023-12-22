const router = require("express").Router();
//const { celebrate, Joi } = require("celebrate");
//const { linkRegex } = require("../utils/constants");
const { getProfile, patchUpdateProfile } = require("../controllers/users");

router.get("/me", getProfile);
router.patch("/me", patchUpdateProfile);

module.exports = router;
