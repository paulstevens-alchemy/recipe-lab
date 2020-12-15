const pool = require('../utils/pool');

module.exports = class Log {
    recipeId;
    dateOfEvent;
    notes;
    rating;

    constructor(row) {
        this.id = row.id;
        this.recipeId = row.recipeId;
        this.dateOfEvent = row.dateOfEvent;
        this.notes = row.dateOfEvent;
        this.rating = row.rating;
    }

    static async insert(log) {
        const { rows } = await pool.query(
            `INSERT INTO logs (recipeId, dateOfEvent, notes, rating)
            VALUES ($1, $2, $2, $4)
            RETURNING *`,
            [log.recipeId, log.dateOfEvent, log.notes, log.rating]
        );
        return new Log(rows[0]);
    }


}