// //Ye wala upstash wala version , niche local wala version bhi h commented out 
require('dotenv').config(); 
const { createClient } = require('redis');

const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err.message);
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log(`Redis Cache connected! (Using ${process.env.REDIS_URL ? 'Upstash Cloud' : 'Localhost'})`);
    } catch (err) {
        console.error('Redis connection failed.');
    }
};

connectRedis();

module.exports = redisClient;


// // For Local Redis(Installed on system)
// const { createClient } = require('redis');

// const redisClient = createClient({
//     url: 'redis://127.0.0.1:6379' 
// });

// redisClient.on('error', (err) => {
//     console.error('Redis Client Error:', err.message);
// });

// const connectRedis = async () => {
//     try {
//         await redisClient.connect();
//         console.log('Redis Cache server connected successfully!');
//     } catch (err) {
//         console.error('Redis connection failed. Make sure Redis server is running locally.');
//     }
// };

// connectRedis();

// module.exports = redisClient;