const redis = require('../utils/redisSetup'); 

const CACHE_KEYS = {
    USER_PROFILE: (id) => `user:${id}`,
    USER_CART: (id) => `cart:${id}`,
};

const userCache = {
    // Save user data to Redis Hash
    saveUser: async (userId, userData) => {
        const key = CACHE_KEYS.USER_PROFILE(userId);
        await redis.hset(key, userData);
        await redis.expire(key, 3600); // Optional: 1 hour expiry
    },

    // Get specific user data
    getUser: async (userId) => {
        const key = CACHE_KEYS.USER_PROFILE(userId);
        return await redis.hgetall(key);
    },

    // when user updates profile
    clearUser: async (userId) => {
        await redis.del(CACHE_KEYS.USER_PROFILE(userId));
    }
};

module.exports = { userCache };