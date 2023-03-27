const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city;

    // Fetch weather data
    try {
        const response = await axios.get(`https://www.accuweather.com/en/in/${city}/193793/weather-forecast/193793`);
        const html = response.data;
        const $ = cheerio.load(html);

        // Parse HTML and extract weather data
        const temperature = $('.temp').text();

        // Format weather data as JSON
        const data = {
            temperature
        };

        // Return weather data as JSON response
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
