import { Server } from "https://ninja03.github.io/denokun/lib/Server.js"
import { connect } from "https://deno.land/x/redis/mod.ts"
import { Client } from "https://deno.land/x/mysql/mod.ts"

class MyServer extends Server {

  async api(path, req) {
    switch (path) {
      case "/api/rcount": {
        const redis = await this.getRedis()
        return { count: await this.getRedisCount(redis) }
      }
      case "/api/rup": {
        const redis = await this.getRedis()
        await redis.set("count", (await this.getRedisCount(redis)) + 1)
        return {}
      }
      case "/api/mcount": {
        const mysql = await this.getMySQL()
        return { count: await this.getMySQLCount(mysql) }
      }
      case "/api/mup": {
        const mysql = await this.getMySQL()
        await mysql.execute(`insert into click() values()`);
        return {}
      }
    }
  }

  async getRedis() {
    return await connect({
      hostname: Deno.env.get("REDIS_HOST") ?? "127.0.0.1",
      port: 6379
    })
  }

  async getRedisCount(redis) {
    const rcount = await redis.get("count")
    if (rcount == undefined) {
      return 0
    }
    return Number(rcount)
  }

  async getMySQL() {
    return await new Client().connect({
      hostname: Deno.env.get("MYSQL_HOST") ?? "127.0.0.1",
      username: "root",
      db: "counter"
      // password: Deno.env.get("MYSQL_PASS") ?? "pass",
    })
  }

  async getMySQLCount(client) {
    return (await client.query("select count(*) as c from click"))[0].c
  }
}

new MyServer().start(80)
