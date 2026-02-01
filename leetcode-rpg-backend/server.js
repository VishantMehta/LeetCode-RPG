
require('dotenv').config();
require('./src/config/db'); 
const express = require('express');
const cors = require('cors');
const app = express();
const { fetchUserStats } = require('./src/utils/leetcode');
const userRoutes = require('./src/routes/userRoutes');


app.use('/api/users', userRoutes);
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: 'LeetCode RPG Backend is running! 🚀' 
    });
});

app.get('/api/test-leetcode/:username', async (req, res) => {
    const { username } = req.params;
    
    try {
        console.log(`Fetching data for: ${username}...`);
        const stats = await fetchUserStats(username);
        
        res.status(200).json({
            status: 'success',
            username: username,
            data: stats
        });
    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});