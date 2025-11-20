const { Redis } = require('ioredis');

const client = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    maxRetriesPerRequest: 0,
});

client.on('connect', () => {
  console.log('✔ Redis connected');
});

client.on('reconnecting', (delay) => {
  console.warn(`⏳ Redis reconnecting... next attempt in ${delay}ms.`);
});

client.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

client.on('end', () => {
  console.log('🛑 Redis connection ended');
});

module.exports = client;
