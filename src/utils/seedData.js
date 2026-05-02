require('dotenv').config();

const connectDB = require('../config/db');
const Post = require('../models/Post');

connectDB();

const seedPosts = async () => {
  try {
    await Post.deleteMany();

    const posts = [];

    for (let i = 1; i <= 1000; i++) {
      posts.push({
        userId: Math.floor(Math.random() * 100) + 1,
        content: `This is sample social media post number ${i}`,
        likesCount: Math.floor(Math.random() * 500),
      });
    }

    await Post.insertMany(posts);

    console.log('Database Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedPosts();