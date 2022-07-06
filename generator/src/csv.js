const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Web3 = require('web3')

async function exportObj() {

  // connect to an Infura endpoint to connect to Ethereum
  let infuraUrl = "<INFURA_ENDPOINT>";
  const web3 = new Web3(infuraUrl);

  let content = {};
  let a = {};
  const fileStream = fs.createReadStream('./src/airdrop.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let index = 0;
  for await (const line of rl) {
    const splits = line.split(",");
    let ens = splits[0]
    let num = Number(splits[1])
    a[splits[0]] = num;

    if(ens.trim().endsWith(".eth")) {
      try {
        const resolverAddress = await web3.eth.ens.getAddress(ens);
        console.log(`Resolver:\t${resolverAddress}`);
      } catch (error) {
        console.error('Invalid address found');
      }

    }

    index++;
  }

  content.airdrop = a;
  const result = JSON.stringify(content);
  console.log(result)
  fs.writeFileSync("../generator/new-config.json", result);
}

exportObj();
