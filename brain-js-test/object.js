let brain = require("brain.js");

const colors = [
  { green: 0.2, blue: 0.4 },
  { green: 0.4, blue: 0.6 },
  { red: 0.2, green: 0.8, blue: 0.8 },
  { green: 1, blue: 1 },
  { red: 0.8, green: 1, blue: 1 },
  { red: 1, green: 1, blue: 1 },
  { red: 1, green: 0.8, blue: 0.8 },
  { red: 1, green: 0.6, blue: 0.6 },
  { red: 1, green: 0.4, blue: 0.4 },
  { red: 1, green: 0.31, blue: 0.31 },
  { red: 0.8 },
  { red: 0.6, green: 0.2, blue: 0.2 }
];

const brightnesses = [
  { dark: 0.8 },
  { neutral: 0.8 },
  { light: 0.7 },
  { light: 0.8 },
  { light: 0.9 },
  { light: 1 },
  { light: 0.8 },
  { neutral: 0.7, light: 0.5 },
  { dark: 0.5, neutral: 0.5 },
  { dark: 0.6, neutral: 0.3 },
  { dark: 0.85 },
  { dark: 0.9 }
];

const trainingData = [];

for (let i = 0; i < colors.length; i++) {
  trainingData.push({
    input: colors[i],
    output: brightnesses[i]
  });
}

const net = new brain.NeuralNetwork({ hiddenLayers: [3] });

const stats = net.train(trainingData);
console.log(stats);

console.log(net.run({ red: 0.9 }));
