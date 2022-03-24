import { providers } from "ethers";

export default {
  137: new providers.JsonRpcProvider(process.env.RPC_137),
  250: new providers.JsonRpcProvider(process.env.RPC_250),
  43114: new providers.JsonRpcProvider(process.env.RPC_43114)
};
