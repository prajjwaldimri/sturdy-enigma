const brain = require("brain.js");

const trainingData = [
  [1, 2, 3, 4, 5],
  [5, 4, 3, 2, 1]
];

const net = new brain.recurrent.LSTMTimeStep();

net.train(trainingData, { log: true });

console.log(net.run([1, 2, 3, 4]));
