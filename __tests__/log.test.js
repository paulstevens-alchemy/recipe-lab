const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

const testLog = {
    id: '1',
    recipeId: 1,
    dateOfEvent: 'Last Thursday',
    notes: 'notes notes notes',
    rating: 5
}

const testLog2 = {
    id: '2',
    recipeId: 1,
    dateOfEvent: 'This Friday',
    notes: 'notes notes notes',
    rating: 3
}


describe('log routes', () => {
    beforeAll(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });

    it('creates a log', async () => {
        const { body } = await request(app)
            .post('/api/v1/logs')
            .send(testLog)

        expect(body).toEqual(testLog)
    });

    it('creates a log', async () => {
        const { body } = await request(app)
            .post('/api/v1/logs')
            .send(testLog2)

        expect(body).toEqual(testLog2)
    });

    it('finds all logs', async () => {
        const { body } = await request(app)
            .get('/api/v1/logs');

        expect(body).toEqual([testLog, testLog2])
    })

    it('finds a log by id', async () => {
        const { body } = await request(app)
            .get('/api/v1/logs/1');

        expect(body).toEqual(testLog);
    })


})