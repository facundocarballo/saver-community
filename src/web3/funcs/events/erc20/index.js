import { getEventFilterByTo, getDateFromTimestamp, getFullDateFromTimestamp, getHourFromTimestamp } from "../common";

export const getIncreaseSavingsEvent = async (eventName, symbolToken,
    decimals, Contract,
    addressAccount, fromBlock,
    toBlock) => {
    let data = [];
    const events = await getEventFilterByTo(eventName, Contract, addressAccount, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const hour = getHourFromTimestamp(block.timestamp);
        const date = getDateFromTimestamp(block.timestamp);

        const amountWei = event.returnValues.value;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            hour: hour,
            date: date,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`,
            msg: 'Has incrementado tus ahorros'
        });
    });

    return data;
}

export const getTransferEvent = async (symbolToken,
    decimals, Contract,
    addressAccount, fromBlock,
    toBlock) => {
    let data = [];
    const events = await getEventFilterByTo("Transfer", Contract, addressAccount, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const hour = getHourFromTimestamp(block.timestamp);
        const date = getDateFromTimestamp(block.timestamp);

        const amountWei = event.returnValues.value;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            hour: hour,
            date: date,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`,
            msg: 'Te han transferido'
        });
    });

    return data;
}