const Config = {
    env:{
        apiEndpoint: process.env.API_ENDPOINT!,
        databaseUrl: process.env.DATABASE_URL!,
        upstash:{
            redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
            redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
        }
    }
}

export default Config;
