import { Server } from "https://ninja03.github.io/denokun/lib/Server.js"
import { connect } from "https://deno.land/x/redis/mod.ts"
import { Client } from "https://deno.land/x/mysql/mod.ts"

class MyServer extends Server {
  async api(path, req) {
    // Redis
    this.redis = await connect({
      hostname: Deno.env.get("REDIS_HOST") ?? "127.0.0.1",
      port: 6379
    })
    let rcount = await this.redis.get("count")
    if (rcount != undefined) {
      rcount = parseInt(rcount)
    } else {
      rcount = 0
    }

    // MySQL
    const client = await new Client().connect({
      hostname: Deno.env.get("MYSQL_HOST") ?? "127.0.0.1",
      username: "root",
      db: "counter",
      password: Deno.env.get("MYSQL_PASS") ?? "pass",
    })

    const mcount = (await client.query("select count(*) as c from click"))[0].c

    switch (path) {
      case "/api/rcount":
        return { count: rcount }
      case "/api/rup":
        await this.redis.set("count", rcount + 1)
        return {}
      case "/api/mcount":
        return { count: mcount }
      case "/api/mup":
        await client.execute(`insert into click() values()`);
        return {}
    }
  }
}

new MyServer().start(80)
