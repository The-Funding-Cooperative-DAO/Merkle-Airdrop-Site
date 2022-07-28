const fs = require('fs');
const path = require('path');
const readline = require('readline');
const ethers = require('ethers');


async function exportObj() {

  const inputCSVFileName = './src/airdrop.csv';
  const outputJSONFileName = "../generator/new-config.json";

  let content = {};
  let a = {};
  const fileStream = fs.createReadStream(inputCSVFileName);
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
    // No need to check if its a correct address - infura does it for us
    let hex = await provider.resolveName(addr);
    // Do something 
    if(hex){
      console.log("Resolved: " + addr + " -> " + hex);
      a[hex] = num;
    }else{
      console.log("Failed to Resolve: " + addr);
    }  
    
    index++;
  }

  content.airdrop = a;
  content.decimals = 18;
  const result = JSON.stringify(content);
  console.log(result)
  fs.writeFileSync(outputJSONFileName, result);
}

exportObj();