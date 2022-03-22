import dotenv from "dotenv";

dotenv.config();

import { WebClient } from '@slack/web-api';
import { BigNumber } from "ethers";
import { listenToBalanceUpdates } from './util/web3';
import config from './config';

function prettify(num: BigNumber, decimals: number): string {
  return String(num.div(BigNumber.from(10).pow(decimals-5)).toNumber()/(10**5));
};

async function main(): Promise<void> {
  const client = new WebClient(process.env.SLACK_TOKEN!);

  for(const { address, chainId, minBalance, decimals, symbol } of config){
    listenToBalanceUpdates(chainId as any, address, minBalance, (addr, balance) => {
      client.chat.postMessage({
        channel: "nothing",
        attachments: [
          {
            color: "danger",
            fields: [
              {
                title: "Address",
                value: `\`${address}\``,
              },
              {
                title: "Current Balance",
                value: `${prettify(balance, decimals)} ${symbol}`,
                short: true
              },
              {
                title: "Min Safe Balance",
                value: `${prettify(minBalance, decimals)} ${symbol}`,
                short: true
              }
            ]
          }
        ],
        text: "Low Balance Alert!"
      })
    });
  }
}

main();
