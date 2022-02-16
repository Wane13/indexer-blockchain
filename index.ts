import {getContractEvent} from "./worker1"
import {CONTRACT_ABI, CONTRACT_ADDRESS} from "./constants";

const startBlock = 14167146;
const endBlock =   14167147;

async function main() {
    console.log("Process Started...");

    await getContractEvent(CONTRACT_ABI, CONTRACT_ADDRESS, startBlock, endBlock)

    console.log("Process Ended...");
}

main()
