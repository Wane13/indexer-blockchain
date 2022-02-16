import {URL_PROVIDER} from "./constants";
const Web3 = require("web3")

export async function getContractEvent(abi: any, address: string, startBlock: number, endBlock: number) {

    const web3 = new Web3((new Web3.providers.HttpProvider(URL_PROVIDER)));

    const contract = new web3.eth.Contract(abi, address);

    try {
        const events = await contract.getPastEvents("allEvents",
            {
                fromBlock: startBlock || 0,
                toBlock: endBlock || 'latest' // You can also specify 'latest'
            })

        var eventList:string[] = []; 
        var eventNotListed:string[] = []; 
        var eventNumber = [[0],[0],[0],[0],[0]];
        var init = true;
        console.log("\nCONTRACT NUMBER [ "+address+" ]\n");
        // Loop Event
        events.forEach(el => {
            if(init){
                console.log("\n[EVENT SAMPLE] :");
                console.log(el);
                init=false;
            }

            eventList.push(el.event);
            switch (el.event) {
                case 'Transfer':
                    eventNumber[0][0] = (eventNumber[0][0]+1);
                  break;
                case 'Deposit':
                    eventNumber[1][0] = (eventNumber[1][0]+1);
                    break; 
                case 'Withdrawal':
                    eventNumber[2][0] = (eventNumber[2][0]+1);
                    break;
                case 'Approval':
                    eventNumber[3][0] = (eventNumber[3][0]+1);
                    break;
                default:
                    eventNumber[4][0] = (eventNumber[4][0]+1);
                    eventNotListed.push(el.event);
            }
            
        })
        console.log("\n[ALL EVENTS AVAILABLE] :");
        console.log(eventList) // list containing all events on a specific contract 
        console.log(`\n[EVENT NUMBER] : \n`
                    +eventNumber[0][0]+` Transfer\n`
                    +eventNumber[1][0]+`Deposit\n`
                    +eventNumber[2][0]+` Withdrawal\n`
                    +eventNumber[4][0]+` Event not listed\n`);

        if(eventNotListed.length) {console.log("Events not listed are ");console.log(eventNotListed);}
            
        

    } catch (e) {
        console.error('TTT :' + e)
    }
}
