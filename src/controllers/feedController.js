const Post = require('../models/Post');
const redisClient = require('../config/redis');

const getFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('userId content likesCount createdAt')
      .lean();

    await redisClient.setEx(
      req.cacheKey,
      60,
      JSON.stringify(posts)
    );

    return res.status(200).json({
      source: 'database',
      page,
      limit,
      count: posts.length,
      data: posts,
    });

  } catch (error) {
    console.error('Feed Controller Error:', error);

    return res.status(500).json({
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = {
  getFeed,
};