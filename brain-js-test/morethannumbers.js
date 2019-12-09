const brain = require("brain.js");

const restaurants = {
  "Brilliant Yellow Corral": "Monday",
  "Penny’s": "Tuesday",
  "Right Coast Wings": "Wednesday",
  "The Delusion Last Railway Car": "Thursday",
  "Fun Day Inn": "Friday",
  JHOP: "Saturday",
  Owls: "Sunday"
};

const trainingData = [];

for (let restaurantName in restaurants) {
  const dayOfTheWeek = restaurants[restaurantName];
  trainingData.push({
    input: { [dayOfTheWeek]: 1 },
    output: { [restaurantName]: 1 }
  });
}

const net = new brain.NeuralNetwork();

const stats = net.train(trainingData);

console.log(net.run({ Tuesday: 1 }));
