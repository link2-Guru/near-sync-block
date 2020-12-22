const nearApi = require("near-api-js");

const { nearRpcUrl } = require("./config");


const rpcList = [
  "http://144.91.117.89:3030",
  "http://35.237.95.56:3030",
  "http://18.183.148.231:3030",
  "http://128.199.6.64:3030",
  "http://104.199.193.206:3030",
  "http://213.198.67.142:3030",
  "https://rpc.mainnet.near.org",
  "http://165.73.240.34:3030"
]
function getNearRpc() {
  const node = rpcList[Math.floor((Math.random() * rpcList.length))]
  const nearRpc = new nearApi.providers.JsonRpcProvider(node);
  return nearRpc;
}
// const nearRpc = new nearApi.providers.JsonRpcProvider(nearRpcUrl);

// TODO: Provide an equivalent method in near-api-js, so we don't need to hack it around.
getNearRpc().callViewMethod = async function (contractName, methodName, args) {
  const account = new nearApi.Account({ provider: this });
  return await account.viewFunction(contractName, methodName, args);
};

const queryFinalTimestamp = async () => {
  const finalBlock = await getNearRpc().sendJsonRpc("block", { finality: "final" });
  return finalBlock.header.timestamp;
};

const queryNodeStats = async () => {
  let nodes = await getNearRpc().sendJsonRpc("validators", [null]);
  let proposals = nodes.current_proposals;
  let currentValidators = getCurrentNodes(nodes);
  return { currentValidators, proposals };
};

const signNewValidators = (newValidators) => {
  for (let i = 0; i < newValidators.length; i++) {
    newValidators[i].new = true;
  }
};

const signRemovedValidators = (removedValidators) => {
  for (let i = 0; i < removedValidators.length; i++) {
    removedValidators[i].removed = true;
  }
};

const getCurrentNodes = (nodes) => {
  let currentValidators = nodes.current_validators;
  let nextValidators = nodes.next_validators;
  const {
    newValidators,
    removedValidators,
  } = nearApi.validators.diffEpochValidators(currentValidators, nextValidators);
  signNewValidators(newValidators);
  signRemovedValidators(removedValidators);
  currentValidators = currentValidators.concat(newValidators);
  return currentValidators;
};

exports.getNearRpc = getNearRpc;
exports.queryFinalTimestamp = queryFinalTimestamp;
exports.queryNodeStats = queryNodeStats;
