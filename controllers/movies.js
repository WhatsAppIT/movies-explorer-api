const Movie = require("../models/movie");

const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const DeleteMovieError = require("../errors/DeleteMovieError");

const getAllSavedMovie = (req, res, next) => {
  Movie.find({ owner: req.body._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError("Нет сохраненных фильмов. M/C");
      }
      return res.send(movies);
    })
    .catch((err) => {
      return next(err);
    });
};

const postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.body._id,
  })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError("Нет сохраненных фильмов. M/C");
      }
      return res.send(movie);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new ValidationError("Переданы некорректные данные при поиске фильма.")
        );
      }

      return next(err);
    });
};

const deleteMovieById = (req, res, next) => {
  const owner = req.body._id;

  Movie.findById(req.params.movieId)

    .then((movie) => {
      if (!movie) {
        throw new NotFoundError("Фильм по указанному _id не найден.");
      }
      if (movie.owner.toString() !== owner) {
        throw new DeleteMovieError("Нельзя удалить фильм.");
      }

      return Movie.deleteOne(movie);
    })
    .then((myMovie) => {
      res.send(myMovie);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(
          new ValidationError(
            "Переданы некорректные данные при поиске карточки."
          )
        );
      }
      return next(err);
    });
};

module.exports = { getAllSavedMovie, postMovie, deleteMovieById };
