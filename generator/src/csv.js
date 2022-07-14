const fs = require('fs');
const path = require('path');
const readline = require('readline');
const ethers = require('ethers');

class EthereumNodeProvider {
  uri  = "https://cloudflare-eth.com";

   hasToInit() {
    return !this.provider;
  }

   instance() {
    const hasToInit = this.hasToInit();

    if (hasToInit) {
      this.provider = new ethers.providers.JsonRpcProvider(this.uri);
    }

    return this.provider;
  }
}

const ethereumNode = new EthereumNodeProvider();

async function exportObj() {
  const instance = await ethereumNode.instance();
  let content = {};
  let a = {};
  const fileStream = fs.createReadStream('./airdrop.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let index = 0;
  for await (const line of rl) {
    const splits = line.split(",");
    
    let num = Number(splits[1])

    const address = await instance.resolveName(splits[0])

    if(!address){
        continue;
    }

    a[address] = num;

    index++;
  }

  content.airdrop = a;
  const result = JSON.stringify(content);
  console.log(result)
  fs.writeFileSync("new-config.json", result);
}

exportObj();