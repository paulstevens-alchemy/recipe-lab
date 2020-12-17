const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Recipe = require('../lib/models/recipe');
const { testLog, testLog2, updatedTestLog, testRecipe, updatedTestRecipe, arrayOfRecipes } = require('../json.js');
const { O_TRUNC } = require('constants');



describe('recipe-lab routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });

  it('creates a recipe', () => {
    return request(app)
      .post('/api/v1/recipes')
      .send(testRecipe)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String), ...testRecipe
        });
      });
  });

  it('gets all recipes', async () => {
    const recipes = await Promise.all(arrayOfRecipes.map(recipe => Recipe.insert(recipe)));

    return request(app)
      .get('/api/v1/recipes')
      .then(res => {
        recipes.forEach(recipe => {
          expect(res.body).toContainEqual(recipe);
        });
      });
  });

  it('gets a recipe by id', async () => {
    const recipes = await Promise.all(arrayOfRecipes.map(recipe => Recipe.insert(recipe)));

    return request(app)
      .get('/api/v1/recipes/2')
      .then(
        res => {
          expect(res.body).toEqual(recipes[1]);
        });
  });

  it('updates a recipe by id', async () => {
    const recipe = await Recipe.insert(testRecipe);

    return request(app)
      .put(`/api/v1/recipes/${recipe.id}`)
      .send(testRecipe)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String), ...testRecipe
        });
      });
  });

  it('deletes a recipe', async () => {
    const recipe = await Recipe.insert(testRecipe);

    return request(app)
      .delete(`/api/v1/recipes/${recipe.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String), ...testRecipe
        })
      })
  })

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
    await request(app)
      .post('/api/v1/recipes')
      .send(testRecipe);

    await request(app)
      .post('/api/v1/logs')
      .send(testLog)

    await request(app)
      .post('/api/v1/logs')
      .send(testLog2)

    const { body } = await request(app)
      .get('/api/v1/logs');

    expect(body).toEqual([testLog, testLog2])
  })


  it('finds a log by id', async () => {
    await request(app)
      .post('/api/v1/recipes')
      .send(testRecipe);

    await request(app)
      .post('/api/v1/logs')
      .send(testLog)

    const { body } = await request(app)
      .get('/api/v1/logs/1');

    expect(body).toEqual({ ...testLog, ...testRecipe });
  })

  it('updates a log', async () => {

    await request(app)
      .post('/api/v1/recipes')
      .send(testRecipe);

    const postedLog = await request(app)
      .post('/api/v1/logs')
      .send(testLog)

    const { body } = await request(app)
      .put(`/api/v1/logs/${postedLog.body.id}`)
      .send(updatedTestLog);

    expect(body).toEqual(updatedTestLog);
  })


  it('deletes a log', async () => {

    await request(app)
      .post('/api/v1/recipes')
      .send(testRecipe);

    const postedLog = await request(app)
      .post('/api/v1/logs')
      .send(updatedTestLog)

    const { body } = await request(app)
      .delete(`/api/v1/logs/${postedLog.body.id}`)

    expect(body).toEqual(updatedTestLog);
  })
});
