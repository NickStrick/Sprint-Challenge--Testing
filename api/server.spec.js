const request = require('superTest');

const server = require('./server.js');
const db = require('../data/dbConfig.js');
const gameDb = require('../data/gamesModel.js');

afterEach(async () => {
    await db('games').truncate()
});

describe('server.js', () => {
    describe('GET / endpoint', () => {
        it('should respond with status code 200 OK', async () => {
            let response = await request(server).get('/games');

            expect(response.status).toBe(200);
        })

        it('should respond with JSON', async () => {
            let response = await request(server).get('/games');

            expect(response.type).toMatch(/json/i);
        })

        it('should respond with array', async () => {
            const expected = [];
            let response = await request(server).get('/games');

            expect(response.body).toMatchObject(expected);
        })

    })

    describe('Post /games endpoint', () => {
        it('should return status code 201', async () => {
            let response = await request(server).post('/games').send({ title: 'this is a title', genre: 'romance', releaseYear: 1999 });

            expect(response.status).toBe(201);
        })

        it('should return status code 422', async () => {
            let response = await request(server).post('/games').send({ title: 'this is a title', releaseYear: 1999 });

            expect(response.status).toBe(422);
        })

        it('should insert provided game', async () => {
            const game = await gameDb.insert({ title: 'this is a title', genre: 'romance', releaseYear: 1999 })

            let games = await db('games');

            expect(games).toHaveLength(1);
            expect(game.title).toEqual('wow');

            await gameDb.insert({ title: 'final countdown', genre: 'romance', releaseYear: 1999 });
            games = await db('games');
            expect(games).toHaveLength(2);
        })

    })
});

