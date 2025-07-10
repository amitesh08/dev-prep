import http from "http";
import { env } from "./env";
import { logger } from "./logger";
import { createApp } from "./app";

async function main() {
  try {
    const PORT: number = +(env.PORT ?? 8000); //typecasting into number +()
    //?? - null coalescing

    const server = http.createServer(createApp());
    server.listen(PORT, () => {
      logger.info(`server is running on PORT ${PORT}`);
    });
  } catch (error) {
    logger.error("Error starting the server!");
  }
}

main();
