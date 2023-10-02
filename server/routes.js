const express = require('express');
const Restaurant = require('./models/Restaurant');

const router = express.Router();

router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.status(200).send(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/restaurants', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (error) {
        console.error("Error saving restaurant:", error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
