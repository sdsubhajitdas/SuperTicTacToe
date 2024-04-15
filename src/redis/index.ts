
import Redis from "ioredis-rejson";
import dotenv from "dotenv";

dotenv.config();

const redisClient = new Redis(process.env.REDIS_URL || "");


export default redisClient;
