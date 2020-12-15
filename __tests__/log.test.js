const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

const testLog = {
    id: 1,
    recipeId: 1,
    dateOfEvent: 'Last Thursday',
    notes: 'notes notes notes',
    rating: 5
}


describe('log routes', () => {
    beforeAll(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    });
    afterAll(() => {
        return pool.end();
    });

    it('creates a log', async () => {
        const { body } = await request(app)
            .post('/api/v1/logs')
            .send(testLog)

        expect(body).toEqual(testLog)
    });



})