import { BigNumberish, BigNumber } from "ethers";
import { log } from "../logger";
import { onCooldown, resetCooldown } from "../timer/index";
import providers from "./providers";

export const listenToBalanceUpdates = (
  chainId: keyof typeof providers, 
  address: string, 
  minBalance: BigNumberish, 
  callback: (address: string, balance: BigNumber) => void
) => {
  const provider = providers[chainId];

  const cb = async () => {
    log(`Checking balance of ${address} on chain ${chainId}`);

    if(onCooldown(address)){
      log(`Skipping because of cooldown.`);
      return;
    }
    const balance = await provider.getBalance(address);

    console.log(`Balance: ${balance.toString()}`);
    console.log(`Min balance: ${minBalance.toString()}`);

    if(balance.lte(minBalance)) {
      log(`Balance less than the safe minimum, sending an alert on slack and resetting the cooldown.`);
      callback(address, balance);
      resetCooldown(address);
    } else {
      log(`Balance above safe minimum.`);
    }
  };

  provider.ready.then(() => {
    console.log(`Provider for chain ${chainId} ready.`);
    cb();
    // provider.on({ address: address }, cb);
    setInterval(cb, 1000*60*20);
  });
};
