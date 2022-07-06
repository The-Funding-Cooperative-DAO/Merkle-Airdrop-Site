const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Web3 = require('web3');
const APIKEY = 'INFURA_API_KEY'
const web3 = new Web3(APIKEY);

async function exportObj() {
  var loadingTimer = (() => {
    var P = ["\\", "|", "/", "-"];
    var x = 0;
    return setInterval(() => {
      process.stdout.write("\r" + P[x++]);
      x &= 3;
    }, 250);
  })();

  let content = {};
  let resolved_obj = {};
  let failed_obj = {};
  let userarr = [], numarr = [];
  const fileStream = fs.createReadStream('./airdrop.csv');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    const splits = line.split(",");
    userarr.push(String(splits[0]));
    numarr.push(Number(splits[1]));
  }

  let index = 0;
  const timeout = 1000;
  function FetchENSCallback() {
    const rTimer = setTimeout(async () => {
      if (index < userarr.length) {
        const checkAddress = await web3.utils.isAddress(userarr[index]);
        if (checkAddress !== true) {
          try {
            const ensAddress = await web3.eth.ens.getAddress(userarr[index]);
            resolved_obj[ensAddress] = numarr[index];
            console.log(`\x1b[34mFetched ENS address for ${userarr[index]} : ${ensAddress}`);
          } catch (error) {
            // resolved_obj[userarr[index]] = numarr[index];
            failed_obj[userarr[index]] = numarr[index];
            console.log(`\x1b[31mFailed to fetch ENS address for : ${userarr[index]}`);
          }
        } else {
          resolved_obj[userarr[index]] = numarr[index];
          console.log(`\x1b[36mEthereum address : ${userarr[index]}`);
        }
        index++;
        console.log(`\x1b[0m`);
        FetchENSCallback();
      } else {
        clearTimeout(rTimer);
        content.airdrop = resolved_obj;
        const resolved_result = JSON.stringify(content);
        const failed_result = JSON.stringify(failed_obj);
        console.log(resolved_result);
        fs.writeFileSync("../../generator/resolved-config.json", resolved_result);
        fs.writeFileSync("../../generator/ens-failed.json", failed_result);
        process.exit();
      }
    }, timeout);
  }

  FetchENSCallback();
}

exportObj();