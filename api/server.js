const express = require('express');

const db = require('../data/gamesModel.js');

const server = express();
server.use(express.json());


server.get('/games', async (req, res) => {
    const list = await db.get();

    res.status(200).json(list);
});

server.post('/games', async (req, res) => {
    const gameInfo = req.body;
    if (gameInfo.title && gameInfo.genre) {
        db.insert(gameInfo).then(response => {
            res.status(201).json(response);
        })
            .catch(err => res.status(400).json(err))
    } else {
        res.status(422).json('Must include title and genre');
    }
})

module.exports = server;