const fs = require('fs');
const path = require('path');
const readline = require('readline');
const ethers = require('ethers');


async function exportObj() {

  let content = {};
  let a = {};
  const fileStream = fs.createReadStream('./src/airdrop.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // We're using infura.io as provider. Optionally use Geth or Parity or something else.
  // If you don't specify a url, Ethers connects to the default (i.e. ``http:/\/localhost:8545``)
  // TODO: move endpoint const to config
  const infraEndpoint = "https://mainnet.infura.io/v3/10d0877f21884791bc511c6425ccaff2";
  // Access network through free infura.io account
  const provider = new ethers.providers.JsonRpcProvider(infraEndpoint);

  let index = 0;
  for await (const line of rl) {
    const splits = line.split(",");
    let addr = String(splits[0])
    let num = Number(splits[1]);

    // Resolve address
    let hex = await provider.resolveName(addr);
    // Do something 
    if(hex){
      console.log("Resolved: " + addr + " -> " + hex);
    }else{
      console.log("Failed to Resolve: " + addr);
    }

    a[splits[0]] = num;
    index++;
  }

  content.airdrop = a;
  const result = JSON.stringify(content);
  console.log(result)
  fs.writeFileSync("../generator/new-config.json", result);
}

exportObj();