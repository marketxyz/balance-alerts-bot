import { BigNumberish, BigNumber } from "ethers";
import providers from "./providers";

export const listenToBalanceUpdates = (
  chainId: keyof typeof providers, 
  address: string, 
  minBalance: BigNumberish, 
  callback: (address: string, balance: BigNumber) => void
) => {
  const provider = providers[chainId];
  const cb = async () => {
    const balance = await provider.getBalance(address);

    if(balance.lte(minBalance)) {
      callback(address, balance);
    }
  };

  cb();
  provider.on({ address: address }, cb);
};
