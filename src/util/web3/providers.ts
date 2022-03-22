import { providers } from "ethers";

export default {
  137: new providers.JsonRpcProvider(process.env.RPC_137)
};
