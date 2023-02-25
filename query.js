const pool = require("./config.js");
const express = require("express");
const router = express.Router();

router.get("/film", (req, res) => {
    const query =`
    SELECT * FROM film`

    pool.query(query, (err, response) => {
        if(err) throw err
        
        res.status(200).json(response.rows)
    })
})

router.get("/film/:filmId", (req, res) => {
    const {filmId} = req.params;

    const findQuery =`
    SELECT * FROM film
    WHERE film_id = $1`

    pool.query(findQuery, [filmId], (err, response) => {
        if(err) throw err
        
        res.status(200).json(response.rows[0])
    })
})

router.get("/category", (req, res) => {
    const query = `
    SELECT * FROM category`

    pool.query(query, (err, response) => {
        if(err) throw err
        
        res.status(200).json(response.rows)
    })
})

router.get("/filmcategory/:categoryId", (req, res) => {
    const {categoryId} = req.params;

    const query = `
    SELECT fc.category_id,
    c.name,
    f.title,
    f.release_year,
    f.description,
    f.rental_rate
    FROM film as f
    INNER JOIN film_category AS fc
    ON f.film_id = fc.film_id
    INNER JOIN category as c
    ON c.category_id = fc.category_id
    WHERE c.category_id=$1`

    pool.query(query, [categoryId], (err, response) => {
        if(err) throw err
        
        res.status(200).json(response.rows)
    })
})

module.exports = router;