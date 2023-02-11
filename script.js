let counter = 0;
let arenaImg;
let contents;
let page = 0;
let URL =
  "https://api.are.na/v2/channels/things-i-like-eruhck1o7r0?per=100&page=";

fetch("https://api.are.na/v2/channels/things-i-like-eruhck1o7r0?per=2")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    contents = data.contents;

    // get rest of data
    getData(data);
  });

async function getData(data) {
  const numCalls = Math.ceil(data.length / 100);

  let urls = [];
  page = 1;
  while (page < numCalls + 2) {
    urls = [...urls, `${URL}${page}`];
    page++;
  }

  Promise.all(urls.map((u) => fetch(u)))
    .then((responses) => Promise.all(responses.map((res) => res.json())))
    .then((texts) => {
      console.log(texts);
      for (let resp of texts) {
        contents = [...contents, ...resp.contents];
      }
      contents.reverse();

      // startLooping();
      runWorld(contents);
    });
}

function startLooping() {
  arenaImg = document.getElementById("arenaImg");
  arenaImg.classList.add("fadeIn");
  arenaImg.src = contents[counter].image.square.url;

  setTimeout(loop, 500);
}

function loop() {
  // fade out image
  setTimeout(function () {
    console.log("adding fade out");
    arenaImg.classList.add("fadeOut");
    arenaImg.classList.remove("fadeIn");
    counter++;
  }, 4000);
  // let new image load
  setTimeout(function () {
    arenaImg.src = contents[counter].image.square.url;
  }, 7000);
  // fade in new image
  setTimeout(function () {
    arenaImg.classList.add("fadeIn");
    arenaImg.classList.remove("fadeOut");
    loop(); // restart the loop
  }, 9000);
}
