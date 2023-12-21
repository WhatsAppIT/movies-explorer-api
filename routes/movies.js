const router = require("express").Router();
const {
  getAllSavedMovie,
  postMovie,
  deleteMovieById,
} = require("../controllers/movies");

router.get("/", getAllSavedMovie);
router.post("/", postMovie);
router.delete("/_id", deleteMovieById);

module.exports = router;
