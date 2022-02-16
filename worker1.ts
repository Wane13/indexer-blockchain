import {URL_PROVIDER} from "./constants";
const Web3 = require("web3")

export async function getContractEvent(abi: any, address: string, startBlock: number, endBlock: number) {

    const web3 = new Web3((new Web3.providers.HttpProvider(URL_PROVIDER)));

    const contract = new web3.eth.Contract(abi, address);

    try {
        const events = await contract.getPastEvents("allEvents",
            {
                fromBlock: startBlock || 0,
                toBlock: endBlock || 'latest'// You can also specify 'latest'
            })

        events.forEach(el => {
            console.log(el)
        })
    } catch (e) {
        console.error('TTT :' + e)
    }
}
