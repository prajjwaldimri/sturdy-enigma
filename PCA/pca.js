const { PCA } = require("ml-pca");
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const stream = require("stream");

let inStream = fs.createReadStream("kddcup_10.data");
let outStream = new stream();
let rl = readline.createInterface(inStream, outStream);

let data = [];

rl.on("line", line => {
  line = line.split(",");
  line.splice(1, 3);
  line = line.map(Number);
  data.push(line);
});

rl.on("close", () => {
  const pca = new PCA(data);
  // const eigenVectors = pca
  //   .getEigenvectors()
  //   .selection([0], [0, 1, 2, 3, 4, 5, 6, 7]);
  // console.log(eigenVectors);
  const reduced = pca.predict(data, { nComponents: 8 });
  console.log(reduced.data);
});
