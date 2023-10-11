const express = require('express');
const Restaurant = require('./models/Restaurant');
const router = express.Router();

const getAnonymousToken = (req) => {
    return req.headers['session-identifier'];
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
        
        if (!restaurant) {
            return res.status(200).send({ notFound: true });
        }
    
        let existingTags = []; 
        let addedTags = [];
    
        // Extract tags from the query parameters
        const tagsFromQuery = req.query.tags ? req.query.tags.split(',') : [];

        // Determine which tags are new and which ones exist
        tagsFromQuery.forEach(tag => {
            const tagIndex = restaurant.tags.findIndex(t => t.name === tag);
            
            if (tagIndex === -1) {
                addedTags.push(tag);
            } else {
                existingTags.push(tag);
            }
        });
    
        res.status(200).send({ 
            notFound: false,
            existingTags: existingTags,
            addedTags: addedTags
        });
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/restaurants', async (req, res) => {
    try {
        const token = getAnonymousToken(req);
        const existingRestaurant = await Restaurant.findOne({ place_id: req.body.place_id });
        

        let existingTags = [];
        let addedTags = [];

        if (existingRestaurant) {
            req.body.tags.forEach(tag => {
                const tagIndex = existingRestaurant.tags.findIndex(t => t.name === tag);
                
                if (tagIndex === -1) {
                    // Tag doesn't exist, add it and set the count to 1, and add the user's IP token to the voters
                    existingRestaurant.tags.push({ name: tag, count: 1, voters: [token] });
                    addedTags.push(tag);
                } else {
                    // Tag exists, check if the token is not in the voters list
                    if (!existingRestaurant.tags[tagIndex].voters.includes(token)) {
                        existingRestaurant.tags[tagIndex].count += 1;
                        existingRestaurant.tags[tagIndex].voters.push(token);
                        existingTags.push(tag);
                    }
                }
            });

            await existingRestaurant.save();

            if (addedTags.length && existingTags.length) {
                return res.status(200).send({ 
                    message: 'New tags added and existing tags vouched for.',
                    action: 'tagsUpdated',
                    existingTags: existingTags,
                    addedTags: addedTags
                });
            } else if (addedTags.length) {
                return res.status(200).send({ 
                    message: 'New tags added successfully.',
                    action: 'tagsAdded',
                    addedTags: addedTags
                });
            } else {
                return res.status(200).send({ 
                    message: 'Existing tags vouched for.',
                    action: 'tagsVouched',
                    existingTags: existingTags
                });
            }

        }

        // If the restaurant does not exist in the database, create a new one
        const restaurant = new Restaurant({
            ...req.body,
            tags: req.body.tags.map(tag => ({ name: tag, count: 1, voters: [token] })),
            confirmers: [token]
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
        const token = getAnonymousToken(req); 
        const restaurant = await Restaurant.findOne({ place_id: req.params.place_id });

        if (!restaurant) {
            return res.status(404).send({ message: 'Restaurant not found.' });
        }

        if (restaurant.confirmers.includes(token)) {
            return res.status(400).send({ message: 'You have already confirmed this restaurant.' });
        }

        restaurant.confirmations += 1;
        restaurant.confirmers.push(token);

        let existingTags = [];
        let addedTags = [];

        req.body.tags.forEach(tag => {
            const tagIndex = restaurant.tags.findIndex(t => t.name === tag);
            
            if (tagIndex === -1) {
                // Tag doesn't exist, add it and set the count to 1, and add the user's token to the voters
                restaurant.tags.push({ name: tag, count: 1, voters: [token] });
                addedTags.push(tag);
            } else {
                // Tag exists, check if the token is not in the voters list
                if (!restaurant.tags[tagIndex].voters.includes(token)) {
                    restaurant.tags[tagIndex].count += 1;
                    restaurant.tags[tagIndex].voters.push(token);
                    existingTags.push(tag);
                }
            }
        });

        await restaurant.save();

        res.status(200).send({
            message: addedTags.length ? 'New tags added successfully.' : 'Existing tags vouched for.',
            action: 'tagsUpdated',
            existingTags: existingTags,
            addedTags: addedTags
        });

    } catch (error) {
        console.error("Error confirming restaurant:", error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;