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

module.exports = {
    calculateTotalXP,
    calculateLevel
};