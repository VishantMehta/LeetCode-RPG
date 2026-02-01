const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';

const fetchUserStats = async (username) => {
    const query = `
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                submitStats: submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(LEETCODE_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com',
            },
            body: JSON.stringify({
                query: query,
                variables: { username: username }
            })
        });

        const data = await response.json();

        if (data.errors || !data.data.matchedUser) {
            throw new Error('User not found on LeetCode');
        }

        const stats = data.data.matchedUser.submitStats.acSubmissionNum;
        
        return {
            totalSolved: stats.find(item => item.difficulty === 'All').count,
            easySolved: stats.find(item => item.difficulty === 'Easy').count,
            mediumSolved: stats.find(item => item.difficulty === 'Medium').count,
            hardSolved: stats.find(item => item.difficulty === 'Hard').count,
        };

    } catch (error) {
        console.error(`Error fetching data for ${username}:`, error.message);
        throw error;
    }
};

module.exports = {
    fetchUserStats
};