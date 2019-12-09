const brain = require("brain.js");
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const stream = require("stream");

let inStream = fs.createReadStream("corrected");
let outStream = new stream();
let rl = readline.createInterface(inStream, outStream);
const net = new brain.NeuralNetwork();

// let trainingStream = new brain.TrainStream({
//   neuralNetwork: net,
//   floodCallback: () => {
//     console.log("Flood");
//   },
//   doneTrainingCallback: obj => {
//     console.log(
//       `trained in ${obj.iterations} iterations with error: ${obj.error}`
//     );
//   }
// });

let data = [];

rl.on("line", line => {
  line = line.split(",");
  line = line.map(el => {
    if (isNaN(parseInt(el))) {
      return el;
    }
    return parseInt(el);
  });

  data.push({
    input: inputCreator(line),
    output: { [line[41]]: 1 }
  });
});

rl.on("close", () => {
  // trainingStream.endInputs();
  net
    .trainAsync(data, { log: true })
    .then(res => {
      console.log(res);
      console.log(net.toJSON());
      console.time("Classification Start");
      // 0,udp,private,SF,105,146,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0.00,0.00,0.00,0.00,1.00,0.00,0.00,255,255,1.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00
      console.log(
        net.run(
          inputCreator([
            0,
            "tcp",
            "telnet",
            "S0",
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            79,
            79,
            1.0,
            1.0,
            0.0,
            0.0,
            1.0,
            0.0,
            0.0,
            91,
            79,
            0.87,
            0.02,
            0.01,
            0.0,
            0.87,
            1.0,
            0.0,
            0.0
          ])
        )
      );
      console.timeEnd("Classification Start");
    })
    .catch(err => console.log(error));
});

function inputCreator(line) {
  return {
    duration: line[0],
    [line[1]]: 1,
    [line[2]]: 1,
    [line[3]]: 1,
    src_bytes: line[4],
    dst_bytes: line[5],
    land: line[6],
    wrong_fragment: line[7],
    urgent: line[8],
    hot: line[9],
    num_failed_logins: line[10],
    logged_in: line[11],
    num_compromised: line[12],
    root_shell: line[13],
    su_attempted: line[14],
    num_root: line[15],
    num_file_creations: line[16],
    num_shells: line[17],
    num_access_files: line[18],
    num_outbound_cmds: line[19],
    is_host_login: line[20],
    is_guest_login: line[21],
    count: line[22],
    srv_count: line[23],
    serror_rate: line[24],
    srv_serror_rate: line[25],
    rerror_rate: line[26],
    srv_rerror_rate: line[27],
    same_srv_rate: line[28],
    diff_srv_rate: line[29],
    srv_diff_host_rate: line[30],
    dst_host_count: line[31],
    dst_host_srv_count: line[32],
    dst_host_same_srv_rate: line[33],
    dst_host_diff_srv_rate: line[34],
    dst_host_same_src_port_rate: line[35],
    dst_host_srv_diff_host_rate: line[36],
    dst_host_serror_rate: line[37],
    dst_host_srv_serror_rate: line[38],
    dst_host_rerror_rate: line[39],
    dst_host_srv_rerror_rate: line[40]
  };
}
