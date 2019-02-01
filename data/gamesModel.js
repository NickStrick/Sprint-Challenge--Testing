const db = require('./dbConfig.js');

module.exports = {
    insert,
    get,
};

function get(id) {
    let query = db('games');

    if (id) {
        return query
            .where('id', id)
            .first()

    }
    return query;
}

async function insert(game) {
    const [id] = await db('games').insert(game);

    return db('games').where({ id })
        .first();
}