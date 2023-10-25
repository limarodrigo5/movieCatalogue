const knex = require('../database/knex');

class MovieNotesController {
    async create(request, response) {
        try {
            const { title, description, rating, tags, links } = request.body;
            const { user_id } = request.params;

            if (rating < 1 || rating > 5) {
                return response.status(400).json({ error: 'Rating must be between 1 and 5.' });
            }
           
           
            const [note_id] = await knex('movie_notes').insert({
                title,
                description,
                rating,
                user_id
            });

            const linksInsert = links.map(link => ({ note_id, url: link }));
            await knex('links').insert(linksInsert);

            const tagsInsert = tags.map(name => ({ note_id, name, user_id }));
            await knex('movie_tags').insert(tagsInsert);

            response.status(201).json({ message: 'Movie note created successfully', note_id });
        } catch (error) {
           console.log(error)
            response.status(500).json({ error: 'Failed to create movie note.'  });
        }
    }

    async show(request, response) {
        const { id } = request.params;
        const note = await knex('movie_notes').where({ id }).first();
        const tags = await knex('movie_tags').where({ note_id: id }).orderBy('name');
        const links = await knex('links').where({ note_id: id }).orderBy('created_at');

        if (!note) {
            return response.status(404).json({ error: 'Movie note not found.' });
        }

        response.json({
            ...note,
            tags,
            links
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        const note = await knex('movie_notes').where({ id }).first();

        if (!note) {
            return response.status(404).json({ error: 'Movie note not found.' });
        }

        await knex('movie_notes').where({ id }).delete();

        response.json({ message: 'Movie note deleted successfully.' });
    }

    async index(request, response) {
        const { title = '', user_id, tags } = request.query;
        
        let notesQuery = knex('movie_notes').where({ user_id }).where('title', 'like', `%${title}%`);
        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());
            notesQuery = notesQuery.join('movie_tags', 'movie_tags.id', 'movie_tags.note_id').whereIn('name', filterTags);
        }

        const notes = await notesQuery.orderBy('title');
        const userTags = await knex('movie_tags').where({ user_id });

        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id); 

            return {
                ...note,
                tags: noteTags
            };
        });

        response.json(notesWithTags);
    }
}

module.exports = MovieNotesController;
