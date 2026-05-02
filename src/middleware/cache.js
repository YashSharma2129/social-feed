const redisClient = require('../config/redis');

const cacheFeed = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const cacheKey = `feed:${page}:${limit}`;

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.status(200).json({
        source: 'cache',
        data: JSON.parse(cachedData),
      });
    }

    req.cacheKey = cacheKey;
    next();
  } catch (error) {
    console.error('Cache Middleware Error:', error);
    next();
  }
};

module.exports = cacheFeed;