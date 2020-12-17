const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

const testLog = {
    id: '1',
    recipeId: '1',
    dateOfEvent: 'Last Thursday',
    notes: 'notes notes notes',
    rating: 5
}

const testLog2 = {
    id: '2',
    recipeId: '1',
    dateOfEvent: 'This Friday',
    notes: 'notes notes notes',
    rating: 3
}

const updatedTestLog = {
    id: '1',
    recipeId: '1',
    dateOfEvent: 'Last Thursday',
    notes: 'notes notes notes',
    rating: 3
}

const testRecipe = {
    name: 'cookies',
    directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
    ],
    ingredients: [
        {
            amount: '1',
            measurement: 'gram',
            name: 'baking powder'
        },
        {
            amount: '5',
            measurement: 'ounces',
            name: 'butter'
        }
    ]
}


describe('log routes', () => {
    beforeAll(() => {
        return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
    })
    afterAll(() => {
        return pool.end();
    });

    it('creates a log', async () => {

        await request(app)
            .post('/api/v1/recipes')
            .send(testRecipe);


        const response1 = await request(app)
            .post('/api/v1/logs')
            .send(testLog)

        const response2 = await request(app)
            .post('/api/v1/logs')
            .send(testLog2)

        expect(response1.body).toEqual(testLog)
        expect(response2.body).toEqual(testLog2)

    });


    it('finds all logs', async () => {
        const { body } = await request(app)
            .get('/api/v1/logs');

        expect(body).toEqual([testLog, testLog2])
    })

    it('finds a log by id', async () => {
        const { body } = await request(app)
            .get('/api/v1/logs/1');

        expect(body).toEqual({ ...testLog, ...testRecipe });
    })

    it('updates a log', async () => {
        const { body } = await request(app)
            .put('/api/v1/logs/1')
            .send(updatedTestLog);

        expect(body).toEqual(updatedTestLog);
    })

    it('deletes a log', async () => {
        const { body } = await request(app)
            .delete('/api/v1/logs/1')

        expect(body).toEqual(updatedTestLog);
    })
})