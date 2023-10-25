const { Router } = require('express');
const MovieTagsController = require('../controllers/MovieTagsController');

const movieTagsRoutes = Router();

const movieTagsController = new MovieTagsController();

movieTagsRoutes.post('/', movieTagsController.create);
movieTagsRoutes.get('/:user_id', movieTagsController.index);

module.exports = movieTagsRoutes;

