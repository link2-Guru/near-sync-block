// const request = require("request");

const { parser } = require("stream-json");
const { pick } = require("stream-json/filters/Pick");
const { streamValues } = require("stream-json/streamers/StreamValues");
const { streamArray } = require("stream-json/streamers/StreamArray");
const Batch = require("stream-json/utils/Batch");

const models = require("../models");
const moment = require("moment");
const fs = require('fs');
const path = require('path');


console.log("path", path.join(__dirname, "../genesis/mainnet_genesis.json"))
const stream = fs.createReadStream(path.join(__dirname, "../genesis/mainnet_genesis.json")).pipe(parser());

// stream.on('data', (data) => {
//     console.log('data', data);
// });

// stream.on('end', () => {
//     console.log('All Done');
// });

const streamTime = stream
    .pipe(pick({ filter: "genesis_time" }))
    .pipe(streamValues());

streamTime.on("data", (config) => {
    console.log('genesisTime', config)
    genesisTime = moment(config.value).valueOf();
});