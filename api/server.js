const express = require('express');

const db = require('../data/gamesModel.js');

const server = express();
server.use(express.json());


server.get('/games', async (req, res) => {
    const list = await db.get();

    res.status(200).json(list);
});

server.get('/games/:id', (req, res) => {
    let { id } = req.params;

    db.get()
        .then(games => {
            let found = false;
            for (let i = 0; i < games.length; i++) {
                if (games[i].id == id) {
                    found = true;
                    break;
                }
            }
            if (found) {
                db.get(id)
                    .then(list => {
                        res.status(200).json(list);
                    })
            } else {
                res.status(404).json({ msg: 'project with Id not found' });
            }
        })
});

server.post('/games', async (req, res) => {
    const gameInfo = req.body;
    if (gameInfo.title && gameInfo.genre) {
        db.insert(gameInfo).then(response => {
            res.status(201).json(response);
        })
            .catch(err => res.status(405).json({ err, msg: 'title must be unique' }))
    } else {
        res.status(422).json('Must include title and genre');
    }
})

server.delete('/games/:id', (req, res) => {
    let { id } = req.params;

    db.get()
        .then(games => {
            let found = false;
            for (let i = 0; i < games.length; i++) {
                if (games[i].id == id) {
                    found = true;
                    break;
                }
            }
            if (found) {
                db.remove(id)
                    .then(count => {
                        res.status(200).json(count);
                    })
            } else {
                res.status(404).json({ msg: 'project with Id not found' });
            }
        })
})

module.exports = server;