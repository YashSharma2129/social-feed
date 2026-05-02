# Social Media Feed API - Performance Optimization

This repository contains a high-performance, scalable backend API for a social media feed, built as part of the Showoff Ventures backend developer assignment. 

The primary focus of this implementation is **performance optimization** and handling potential production bottlenecks using practical, efficient engineering patterns.

## 🚀 Key Features & Performance Optimizations

1. **Optimized MongoDB Queries**:
   - **Indexing**: The `Post` schema includes an index on `createdAt: -1` to drastically improve sorting speed for feed retrieval.
   - **Lean Queries**: Utilizes `.lean()` to bypass Mongoose document instantiation, returning plain JavaScript objects for faster execution and lower memory overhead.
   - **Selective Projection**: Uses `.select()` to fetch only necessary fields (`userId content likesCount createdAt`), reducing payload size and memory consumption.
2. **Redis Caching**:
   - Implements Redis caching middleware to serve repeated feed requests in **under 200ms**.
   - Drastically reduces database load by fetching from the cache whenever possible, with a 60-second TTL (`setEx`).
3. **Efficient Pagination**:
   - Uses `skip` and `limit` to handle large datasets seamlessly. (Note: For extremely large-scale production feeds, cursor-based pagination would be the next evolutionary step).
4. **Production-Ready Middleware**:
   - `helmet`: Secures Express apps by setting various HTTP headers.
   - `compression`: Decreases the size of the response body and increases the speed of the API.
   - `morgan`: For request logging.

## 🛠️ Tech Stack

- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose** (Hosted on MongoDB Atlas)
- **Redis** (Local instance for caching)

## 📦 Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (or a MongoDB Atlas URI)
- Redis server running locally

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd social-feed
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory based on `.env.example`:
```bash
cp .env.example .env
```
Ensure you provide a valid `MONGO_URI` and ensure your local Redis server is running at the default `REDIS_URL`.

### 4. Seed the Database
To populate the database with 1000 sample posts for testing:
```bash
npm run seed
```

### 5. Start the Server
```bash
npm run dev
```

### 6. Postman Collection
A Postman collection is included in the repository (`Social_Feed_API.postman_collection.json`). You can import this directly into Postman to test the endpoints.

## 🌐 API Endpoints

### 1. Get Feed
- **URL**: `/api/feed`
- **Method**: `GET`
- **Query Params**:
  - `page` (optional, default: 1)
  - `limit` (optional, default: 10)

**Example Request:**
```bash
curl "http://localhost:5001/api/feed?page=1&limit=10"
```

### 2. Health Check
- **URL**: `/api/health`
- **Method**: `GET`
- **Description**: Returns the operational status of the API, MongoDB, and Redis.

**Example Request:**
```bash
curl "http://localhost:5001/api/health"
```

**First Response (from Database):**
```json
{
  "source": "database",
  "page": 1,
  "limit": 10,
  "count": 10,
  "data": [ ... ]
}
```

**Second Response (from Redis Cache):**
```json
{
  "source": "cache",
  "data": [ ... ]
}
```

## 🔮 Future Improvements
If this system were to scale further in production, the following enhancements could be implemented:
1. **Cursor-based Pagination**: To replace `skip/limit` and avoid performance degradation on very deep pages.
2. **Distributed Redis Cluster**: For higher availability.
3. **API Rate Limiting**: Using tools like `express-rate-limit` to prevent abuse.
4. **Automated Testing & CI/CD**: Adding Jest tests for core logic and GitHub Actions for automated checks.