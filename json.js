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

const updatedTestRecipe = {
    name: 'bars',
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

const arrayOfRecipes = [
    { name: 'cookies', directions: [], ingredients: [] },
    { name: 'cake', directions: [], ingredients: [] },
    { name: 'pie', directions: [], ingredients: [] }
];


module.exports = { testLog, testLog2, updatedTestLog, testRecipe, updatedTestRecipe, arrayOfRecipes }