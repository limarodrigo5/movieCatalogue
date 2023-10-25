const knex = require('../database/knex');

class MovieTagsController {
    async index(request, response) {
        try {
            const { user_id } = request.params;

            if (!user_id) {
                return response.status(400).json({ error: 'User ID is required.' });
            }

            const tags = await knex('movie_tags').where({ user_id });
            return response.json(tags);
        } catch (error) {
            response.status(500).json({ error: 'Failed to retrieve movie tags.' });
        }
    }

    async create(request, response) {
        const { name } = request.body; 
        const { user_id } = request.params; 
    
        const tag = await knex('movie_tags').insert({
            name,
            user_id
        });
    
        return response.status(201).json(tag);
    }
}

module.exports = MovieTagsController;

