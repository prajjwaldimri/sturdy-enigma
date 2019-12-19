const tf = require("@tensorflow/tfjs-node-gpu");
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const stream = require("stream");

let inStream = fs.createReadStream("corrected");
let outStream = new stream();
let rl = readline.createInterface(inStream, outStream);

let trainingDataRaw = [];
let targetDataRaw = [];

rl.on("line", line => {
  line = line.split(",");
  let output = line.splice(41, 1)[0];
  line.splice(1, 3);
  line = line.map(el => parseFloat(el));
  trainingDataRaw.push(line);
  targetDataRaw.push([outputToNumber(output)]);
});

rl.on("close", () => {
  go();
});

async function go() {
  const model = tf.sequential();
  const hidden = tf.layers.dense({
    name: "hidden",
    units: 58,
    activation: "sigmoid",
    inputShape: [38]
  });
  const output = tf.layers.dense({
    name: "output",
    units: 1,
    activation: "sigmoid"
  });

  model.add(hidden);
  model.add(output);
  model.compile({ loss: "meanSquaredError", optimizer: tf.train.sgd(0.01) });

  const trainingData = tf.tensor2d(trainingDataRaw);
  console.log(trainingData.shape);
  const targetData = tf.tensor2d(targetDataRaw);
  console.log(targetData.shape);

  await model.fit(trainingData, targetData, { epochs: 1 });

  model.predict(trainingData).print();
}

function outputToNumber(output) {
  switch (output) {
    case "normal.":
      return 0.01;
    case "snmpgetattack.":
      return 0.02;
    case "back":
      return 0.03;
    case "buffer_overflow.":
      return 0.04;
    case "ftp_write.":
      return 0.05;
    case "guess_passwd.":
      return 0.06;
    case "warezmaster.":
      return 0.07;
    case "processtable.":
      return 0.08;
    case "land.":
      return 0.09;
    case "loadmodule.":
      return 0.1;
    case "multihop.":
      return 0.11;
    case "neptune.":
      return 0.12;
    case "httptunnel.":
      return 0.13;
    case "nmap.":
      return 0.14;
    case "perl.":
      return 0.15;
    case "xsnoop.":
      return 0.16;
    case "phf.":
      return 0.17;
    case "pod.":
      return 0.18;
    case "portsweep.":
      return 0.19;
    case "rootkit.":
      return 0.2;
    case "satan.":
      return 0.21;
    case "smurf.":
      return 0.22;
    case "teardrop.":
      return 0.23;
    case "mscan.":
      return 0.24;
    case "saint.":
      return 0.25;
    case "apache2.":
      return 0.26;
    case "udpstorm.":
      return 0.27;
    case "ipsweep.":
      return 0.28;
    case "sendmail.":
      return 0.29;
    case "xterm.":
      return 0.3;
    case "named.":
      return 0.31;
    case "tps.":
      return 0.32;
    case "xlock.":
      return 0.33;
    case "imap.":
      return 0.34;
    case "mailbomb.":
      return 0.35;
    case "snmpguess.":
      return 0.36;
    case "back.":
      return 0.37;
    case "sqlattack.":
      return 0.38;
    case "ps.":
      return 0.39;
    case "worm.":
      return 0.4;
    default:
      return 0.5;
  }
}
