import { BigNumberish, BigNumber } from "ethers";
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
    if(onCooldown(address)){
      return;
    }
    const balance = await provider.getBalance(address);

    if(balance.lte(minBalance)) {
      callback(address, balance);
      resetCooldown(address);
    }
  };

  provider.ready.then(() => {  
    cb();
    provider.on({ address: address }, cb);
  });
};
