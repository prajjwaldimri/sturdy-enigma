const tf = require("@tensorflow/tfjs-node-gpu");

async function go() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 8, activation: "tanh", inputShape: 2 }));
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

  model.compile({ loss: "binaryCrossentropy", optimizer: "sgd" });

  const training_Data = tf.tensor2d([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
  ]);

  const target_Data = tf.tensor2d([[0], [1], [1], [0]]);

  await model.fit(training_Data, target_Data, { batchSize: 1, epochs: 3000 });

  model.predict(training_Data).print();
}

go();
