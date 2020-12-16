const pool = require('../utils/pool');

module.exports = class Log {
    recipeId;
    dateOfEvent;
    notes;
    rating;

    constructor(row) {
        this.id = row.id;
        this.recipeId = row.recipe_id;
        this.dateOfEvent = row.date_of_event;
        this.notes = row.notes;
        this.rating = row.rating;
    }

    static async insert(log) {
        const { rows } = await pool.query(
            `INSERT INTO logs (recipe_id, date_of_event, notes, rating)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [log.recipeId, log.dateOfEvent, log.notes, log.rating]
        );
        return new Log(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(
            `SELECT *
            FROM logs
            ORDER BY id ASC`
        );

        return rows.map(row => new Log(row))
    }

    static async findById(id) {
        const { rows } = await pool.query(`
        SELECT 
            logs.*,
            recipes.name,
            recipes.directions
        FROM logs
        JOIN recipes
        ON logs.recipe_id = recipes.id
        WHERE logs.id = $1        
        GROUP BY logs.id, recipes.name, recipes.directions
        `, [id])

        return {
            ...new Log(rows[0]),
            directions: rows[0].directions,
            name: rows[0].name
        };
    }

    static async update(id, { recipeId, dateOfEvent, notes, rating }) {
        const { rows } = await pool.query(`
        UPDATE logs
        SET
        recipe_id = $1,
        date_of_event = $2,
        notes = $3,
        rating = $4
        WHERE id = $5
        RETURNING *
        `,
            [recipeId, dateOfEvent, notes, rating, id]
        );

        return new Log(rows[0])
    }

    static async delete(id) {
        const { rows } = await pool.query(`
        DELETE FROM logs
        WHERE id = $1
        RETURNING *
        `, [id]);

        return new Log(rows[0])
    }
}