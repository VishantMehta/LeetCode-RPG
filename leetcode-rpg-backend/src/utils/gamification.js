const XP_MULTIPLIERS = {
    EASY: 10,
    MEDIUM: 30,
    HARD: 100
};

const calculateTotalXP = (easy, medium, hard) => {
    return (easy * XP_MULTIPLIERS.EASY) + 
           (medium * XP_MULTIPLIERS.MEDIUM) + 
           (hard * XP_MULTIPLIERS.HARD);
};

const calculateLevel = (totalXP) => {
    const level = Math.floor(Math.sqrt(totalXP / 50)) + 1;
    return level;
};

const mapTagsToSkills = (topicStats) => {
    const skills = {
        ARRAY_STRENGTH: 0,   
        GRAPH_MAGIC: 0,      
        DP_INTELLIGENCE: 0,  
        AGILITY_ROGUE: 0     
    };

    if (!topicStats) return skills;

    skills.ARRAY_STRENGTH += (topicStats['Array'] || 0) + 
                             (topicStats['String'] || 0) + 
                             (topicStats['Linked List'] || 0);

    skills.GRAPH_MAGIC += (topicStats['Tree'] || 0) + 
                          (topicStats['Graph'] || 0) + 
                          (topicStats['Depth-First Search'] || 0) + 
                          (topicStats['Breadth-First Search'] || 0);

    skills.DP_INTELLIGENCE += (topicStats['Dynamic Programming'] || 0) + 
                              (topicStats['Math'] || 0) + 
                              (topicStats['Bit Manipulation'] || 0);

    skills.AGILITY_ROGUE += (topicStats['Two Pointers'] || 0) + 
                            (topicStats['Sliding Window'] || 0) + 
                            (topicStats['Greedy'] || 0);

    return skills;
};

module.exports = {
    calculateTotalXP,
    calculateLevel,
    mapTagsToSkills 
};