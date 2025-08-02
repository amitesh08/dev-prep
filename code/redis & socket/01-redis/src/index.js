import axios from "axios";
import express from "express";

const app = express();

const PORT = 8000;

//it thas problems like we can not get cache i different servers but redis has solve this problem (LRU , clear cache server crash)
const cacheStore = {
  totalPages: 0,
};

app.get("/", (req, res) => {
  res.json("server is up");
});

app.get("/books", async (req, res) => {
  if (cacheStore.totalPages) {
    console.log("cache store hit");

    return res.json({ totalPages: cacheStore.totalPages });
  }
  const response = await axios.get(
    "https://api.freeapi.app/api/v1/public/books"
  );
  const totalPages = response?.data?.data?.data?.reduce((acc, curr) =>
    !curr.volumeInfo?.pageCount ? 0 : curr.volumeInfo.pageCount + acc
  );

  //here is we are setting the total pages in the cache
  cacheStore.totalPages = Number(totalPages);
  console.log("cache miss");

  return res.json({ totalPages });
});

app.listen(PORT, () => console.log(`server is listening at ${PORT}`));
