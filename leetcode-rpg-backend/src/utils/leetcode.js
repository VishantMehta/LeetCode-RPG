const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';

const fetchUserStats = async (username) => {
    const query = `
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                submitStats: submitStatsGlobal {
                    acSubmissionNum { difficulty count }
                }
                tagProblemCounts {
                    advanced { tagName problemsSolved }
                    intermediate { tagName problemsSolved }
                    fundamental { tagName problemsSolved }
                }
            }
            recentAcSubmissionList(username: $username, limit: 5) {
                title
                timestamp
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
            body: JSON.stringify({ query, variables: { username } })
        });

        const data = await response.json();

        if (data.errors || !data.data.matchedUser) {
            throw new Error('User not found on LeetCode');
        }

        const matchedUser = data.data.matchedUser;
        const stats = matchedUser.submitStats.acSubmissionNum;
        
        const tagCounts = {};
        const allTags = [
            ...(matchedUser.tagProblemCounts.fundamental || []),
            ...(matchedUser.tagProblemCounts.intermediate || []),
            ...(matchedUser.tagProblemCounts.advanced || [])
        ];

        allTags.forEach(tag => {
            tagCounts[tag.tagName] = tag.problemsSolved;
        });

        return {
            totalSolved: stats.find(item => item.difficulty === 'All').count,
            easySolved: stats.find(item => item.difficulty === 'Easy').count,
            mediumSolved: stats.find(item => item.difficulty === 'Medium').count,
            hardSolved: stats.find(item => item.difficulty === 'Hard').count,
            topicStats: tagCounts 
        };

    } catch (error) {
        console.error(`Error fetching data for ${username}:`, error.message);
        throw error;
    }
};

module.exports = { fetchUserStats };