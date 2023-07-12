import { MAIN_CURRENCY } from '../..';
import { getDateFromTimestamp, getEventsFilterByBuyer, getEventsFilterByNftID, getEventsFilterBySeller, getHourFromTimestamp } from '../common';

export const getSinergySaleEvents = async (
    Contract, 
    addressAccount, 
    fromBlock, 
    toBlock, 
    nft_id
) => {
    console.log("nft_id: ", nft_id);
    const sellToken = await getSellTokenEvent(Contract, addressAccount, fromBlock, toBlock, "ether", "ABLE");
    const swapList = await getSwapListEvent(Contract, nft_id, fromBlock, toBlock);
    const backToQueue = await getBackToQueueEvent(Contract, nft_id, fromBlock, toBlock);

    return {
        sellToken,
        swapList,
        backToQueue
    }
};

export const getOnlySellTokenEvent = async (Contract, addressAccount, fromBlock, toBlock, decimals, symbolToken) => {
    let data = [];

    const events_seller = await getEventsFilterBySeller("SellToken", Contract, addressAccount, fromBlock, toBlock);


    events_seller.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const id = event.returnValues.nft_id;

        const amount_wei = event.returnValues.amount;
        const amount = web3.utils.fromWei(amount_wei, decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: `${amount} ${symbolToken}`,
            msg: `Has vendido ${amount} ${symbolToken} por ${Number(amount * 3).toFixed(2)} ${MAIN_CURRENCY} en la Lista de Venta.`
        });
    });

    return data;
};

const getSellTokenEvent = async (Contract, addressAccount, fromBlock, toBlock, decimals, symbolToken) => {
    let data = [];

    const events_seller = await getEventsFilterBySeller("SellToken", Contract, addressAccount, fromBlock, toBlock);
    const events_buyer = await getEventsFilterByBuyer("SellToken", Contract, addressAccount, fromBlock, toBlock);


    events_seller.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const id = event.returnValues.nft_id;

        const amount_wei = event.returnValues.amount;
        const amount = web3.utils.fromWei(amount_wei, decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: `${amount} ${symbolToken}`,
            msg: `Has vendido ${symbolToken} en la Lista de Venta.`
        });
    });

    events_buyer.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const id = event.returnValues.nft_id;

        const amount_wei = event.returnValues.amount;
        const amount = web3.utils.fromWei(amount_wei, decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: `${amount} ${symbolToken}`,
            msg: `Has adquirido ${symbolToken} de la Lista de Venta.`
        });
    });

    return data;
};

const getSwapListEvent = async (Contract, nft_id, fromBlock, toBlock, decimals, symbolToken) => {
    let data = [];

    const events = await getEventsFilterByNftID("SwapList", Contract, nft_id, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);


        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: ``,
            msg: `El NFT ${nft_id} ha pasado a estar en la Lista de Impulsados.`
        });
    });

    return data;
};

const getBackToQueueEvent = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];

    const events = await getEventsFilterByNftID("BackToQueue", Contract, nft_id, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const posAnt = event.returnValues.posAnt;
        const posAct = event.returnValues.posAct;


        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: `Posicion anterior: ${posAnt} | Posicion Actual: ${posAct}`,
            msg: `El NFT ${nft_id} ha sido penalizado. Pasara al final de la Lista de Venta.`
        });
    });

    return data;
};