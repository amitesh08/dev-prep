/***********this contain redis implementation**********/

import axios from "axios";
import express from "express";
import Redis from "ioredis";

const app = express();

const PORT = 8000;

//initializing the redisjust we are doing with express. redis run on 6379
const redis = new Redis({ host: "localhost", port: Number(6379) });

app.get("/", (req, res) => {
  res.json("server is up");
});

app.get("/books", async (req, res) => {
  //here we are doing same just whwn we are using local cachedstore for the data
  //just in the redis way
  //redis store data in key value pair
  const cachedValue = await redis.get("totalPagesValue");
  if (cachedValue) {
    console.log("cache store hit");

    return res.json({ totalPages: cachedValue });
  }

  const response = await axios.get(
    "https://api.freeapi.app/api/v1/public/books"
  );
  const totalPages = response?.data?.data?.data?.reduce((acc, curr) =>
    !curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo.pageCount + acc
  );

  //here we are putting the value by the set method
  await redis.set("totalPagesValue", totalPages);
  console.log("cache miss");

  return res.json({ totalPages });
});

app.listen(PORT, () => console.log(`server is listening at ${PORT}`));

/*
-> now even if you restart your server the cache memory still be there which we seen it was not possible in the cachedStore which we are manually creating .
-> now even with the different severs you can get the same result with the less latency as it is using in-memory 
*/
