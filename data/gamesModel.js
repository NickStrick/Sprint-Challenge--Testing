const db = require('./dbConfig.js');

module.exports = {
    insert,
    get,
};

function get() {
    return db('games');
}

function insert(id) {
    const [id] = await db('songs').insert(song);

    return db('songs').where({ id })
        .first();
}