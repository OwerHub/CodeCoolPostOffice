const express = require("express");
fs = require("fs");
const app = express();
const PORT = 8000;
app.use(express.json());

/* const cors = require("cors"); */

let tryData = "I am here";

// ha URL-ben küldöm el az adatokat
app.use(
  express.urlencoded({
    extended: true,
  })
);
// File-ba írás

//

/* app.use(cors); */

/* let dataSafe = [
  {
    id: 1215,
    to: "Saddam Hussein",
    from: "Abdul Hassan",
    content: "I want back all my plutonium",
  },
];

let data = [
  {
    id: 1215,
    to: "Saddam Hussein",
    from: "Abdul Hassan",
    content: "I want back all my plutonium",
  },
]; */

/* let dataString = JSON.stringify(data); */

/* fs.writeFile("data.json", dataString, function (err) {
  if (err) return console.log(err);
  console.log("Hello World > helloworld.txt");
}); */

// fs read-ban elegánsabb
let data = require("./data.json");
console.log(data);

// behívja magát az oldalt
// mit csinál az express Static.  Nem a filét kell megadni , hanem a könyvtárat.
app.use("/start", express.static(__dirname + "/../frontend"));

// mails-re visszaadja a JSON-t,
app.get("/mails", function (req, res) {
  res.json(data);
});

app.post("/submit-form", (req, res) => {
  res.send(req.body); // mindig kell visszaválasz a fetch-nél
  let tempObject = {
    id: req.body.id,
    to: req.body.to,
    from: req.body.from,
    content: req.body.content,
  };
  data.push(tempObject);

  let dataString = JSON.stringify(data, null, 2);

  fs.writeFile("data.json", dataString, function (err) {
    if (err) return console.log(err);
  });

  /* console.log(req.body.id); */
});

app.get("/", function (req, res) {
  res.send("<h1>Hello world </h1>");
});

app.get("/search/:search", function (req, res) {
  /* console.log(req.params.search); */

  for (const post of data) {
    if (req.params.search == post.id) {
      res.json(post);
      console.log("Hurray");
    }
  }
});

app.listen(PORT, function () {
  console.log("Express server listening on port ", PORT); // eslint-disable-line
});
