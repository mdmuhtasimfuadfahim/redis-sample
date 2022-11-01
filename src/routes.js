const express = require('express');
const axios = require('axios');
var router = express.Router();
const redisHelper = require('./Redis');

router.get('/photos', async(req, res) => {
    try {
        const albumId = req.query.albumId;
        const fetchedData = await redisHelper(`photos?albumId=${albumId}`, async () => {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos', { params: { albumId } });
            return data;
        });
        res.json(fetchedData);
    } catch (error) {
        console.log(error);
    }
});

router.get('/photos/:id', async(req, res) => {
    try {
        const fetchedData = await redisHelper(`photos:${req.params.id}`, async() => {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`);
            return data;
        })
        res.json(fetchedData);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;