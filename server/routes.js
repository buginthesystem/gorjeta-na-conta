const express = require('express');
const Restaurant = require('./models/Restaurant');
const router = express.Router();

const getIpAddress = (req) => {
    if (process.env.NODE_ENV === 'development') {
        return '127.0.0.1';
    }
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
};

router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.status(200).send(restaurants);
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/restaurants/:place_id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ place_id: req.params.place_id });
        
        if (restaurant) {
            res.status(200).send(restaurant);
        } else {
            res.status(200).send({ message: 'Restaurant not found', notFound: true });
        }
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/restaurants', async (req, res) => {
    try {
        const ip = getIpAddress(req);
        const existingRestaurant = await Restaurant.findOne({ place_id: req.body.place_id });

        if (existingRestaurant) {
            // Check if the user has already confirmed the restaurant
            if (existingRestaurant.confirmers.includes(ip)) {
                return res.status(200).send({ 
                    message: 'You have already confirmed this restaurant.', 
                    action: 'alreadyConfirmed'
                });
            }

            // If the user hasn't confirmed it yet, ask them to confirm
            return res.status(200).send({ 
                message: 'Restaurant already exists. Confirm?', 
                action: 'confirm'
            });
        }

        const restaurant = new Restaurant({
            ...req.body,
            confirmers: [ip]
        });

        await restaurant.save();
        res.status(201).send(restaurant);

    } catch (error) {
        console.error("Error saving restaurant:", error);
        res.status(500).send('Internal Server Error');
    }
});



router.put('/restaurants/:place_id/confirm', async (req, res) => {
    try {
        const ip = getIpAddress(req);
        const restaurant = await Restaurant.findOne({ place_id: req.params.place_id });

        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant not found.' });
        }

        if (restaurant.confirmers.includes(ip)) {
            return res.status(400).send({ message: 'You have already confirmed this restaurant.' });
        }

        restaurant.confirmations += 1;
        restaurant.confirmers.push(ip);
        await restaurant.save();

        res.status(200).send(restaurant);

    } catch (error) {
        console.error("Error confirming restaurant:", error);
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;
