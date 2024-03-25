import axios from "axios";
import * as cheerio from "cheerio";
import fs from "node:fs";

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

if (!fs.existsSync("cache")) {
  fs.mkdirSync("cache");
}

const baseUrl = "https://www.gocomics.com";
let link = "/calvinandhobbes/2024/03/25";

for (let i = 1; i < 11; i++) {
  let cacheName = link.replaceAll("/", "");
  let cachePath = `cache/${cacheName}.html`;
  let data;

  if (!fs.existsSync(cachePath)) {
    await sleep(1000);
    let res = await axios.get(baseUrl + link);
    //CACHE
    fs.writeFileSync(cachePath, JSON.stringify(res.data));
    data = res.data;
    console.log("LIVE REQUEST!");
  } else {
    data = fs.readFileSync(cachePath);
  }

  const $ = cheerio.load(data);
  let img = $(".item-comic-image img");
  console.log(img.attr("src"));
  console.log(img.attr("alt"));
  let prev = $("a.fa-caret-left");
  link = prev.attr("href");
}
