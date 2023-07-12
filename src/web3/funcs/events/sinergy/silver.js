import { getEventActiveReward, getEventeCreateNFT, getEventPassiveReward } from ".";
import { getAbleSaleEvents } from "../able/sale";
import { getDateFromTimestamp, getEventsFilterByNftID, getHourFromTimestamp, getEventsFilterByConnectToID, sortEvents, getEventsWithoutFilter } from "../common";

export const getSinergySilverEvents = async (
    Contract, ContractAbleSale, nft_id, 
    fromBlock, toBlock, addressAccount,
    ContractMiniGame
) => {

    // Exclusivos de Sinergy Silver
    const first_waiting_list = await getFirstWaitingListEvent(ContractMiniGame, nft_id, fromBlock, toBlock);
    const waiting_list = await getWaitingListEvent(ContractMiniGame, nft_id, fromBlock, toBlock);
    const advertising_list = await getAdvertisingListEvent(ContractMiniGame, nft_id, fromBlock, toBlock);
    const connections = await getConnectionsEvents(Contract, nft_id, fromBlock, toBlock);
    const buyClps = await getBuyClpEvent(ContractMiniGame, nft_id, fromBlock, toBlock);
    const sellClps = await getSellClpEvent(ContractMiniGame, nft_id, fromBlock, toBlock);
    const winner_list = await getWinnerListEvent(ContractMiniGame, nft_id, fromBlock, toBlock);

    const backToQueue = await getBackToQueueEvent(ContractMiniGame, nft_id, fromBlock, toBlock);

    // Heredados de Sinergy Bronze
    const createNFT = await getEventeCreateNFT('Mint', Contract, addressAccount,
        fromBlock, toBlock);
    const activeReward = await getEventActiveReward('Reward', 'BUSD', 'ether',
        Contract, addressAccount, fromBlock,
        toBlock);
    const passiveReward = await getEventPassiveReward('PassiveReward', 'BUSD', 'ether',
        Contract, addressAccount, fromBlock,
        toBlock);

    const AbleSale = await getAbleSaleEvents(ContractAbleSale, nft_id, fromBlock, toBlock);

    const allEventsSorted = sortEvents([first_waiting_list, waiting_list, 
        advertising_list, connections,
        createNFT, activeReward, passiveReward,
        buyClps, sellClps, winner_list, backToQueue, 
        AbleSale.backToQueue_events, AbleSale.list_events, 
        AbleSale.sell_events]);

    return { allEventsSorted };
};

export const getFirstWaitingListEvent = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsFilterByNftID("FirstWaitingList", Contract, nft_id, fromBlock, toBlock);

    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const comeIn = events[i].returnValues.comeIn;

        const msg = comeIn ? `NFT: ${nft_id} ha ingresado a la Lista de Espera (NFT Nuevos).` : `NFT: ${nft_id} ha salido de la Lista de Espera (NFT Nuevos).`;

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: '',
            msg: msg
        });
    }

    return data;
};

export const getBackToQueueEvent = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsFilterByNftID("BackToQueue", Contract, nft_id, fromBlock, toBlock);

    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const posAnt = events[i].returnValues.posAnt;
        const posAct = events[i].returnValues.posAct;

        const msg = `NFT: ${nft_id} ha sufrido una Penalizacion en la Lista de Espera. Por descalificacion. Paso de estar en la posicion ${posAnt} a estar en la posicion ${posAct}`;

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: '',
            msg: msg
        });
    }

    return data;
};

export const getWaitingListEvent = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsFilterByNftID("WaitingList", Contract, nft_id, fromBlock, toBlock);

    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const comeIn = events[i].returnValues.comeIn;

        const msg = comeIn ? `NFT: ${nft_id} ha ingresado a la Lista de Espera.` : `NFT: ${nft_id} ha salido de la Lista de Espera.`;

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: '',
            msg: msg
        });
    }

    return data;
};

export const getAdvertisingListEvent = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsFilterByNftID("AdvertisingList", Contract, nft_id, fromBlock, toBlock);

    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const comeIn = events[i].returnValues.comeIn;
        const connections = events[i].returnValues.connections;
        const clps = events[i].returnValues.advertising_credits;

        const value = !comeIn ? `${connections} Conexion${connections > 1 ? 'es' : ''}.` : '';
        const msg = comeIn ? `NFT: ${nft_id} ha ingresado a la Lista Publicitaria. Le quedan ${clps} CLP${clps > 1 ? 's' : ''}` : `NFT: ${nft_id} ha salido de la Lista Publicitaria. Le quedan ${clps} CLP${clps > 1 ? 's' : ''}`;

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: value,
            msg: msg
        });
    }

    return data;
};

export const getConnectionsEvents = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsFilterByConnectToID("Connection", Contract, nft_id, fromBlock, toBlock);

    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const connected_to = events[i].returnValues.connected_to;
        const level = events[i].returnValues.level;

        const value = `En el nivel: ${level}`;
        const msg = `El NFT (${nft_id}) se conecto con el NFT: (${connected_to})`;

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: value,
            msg: msg
        });
    }

    return data;
};

export const getBuyClpEvent = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsFilterByNftID("BuyCLP", Contract, nft_id, fromBlock, toBlock);

    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const amount = events[i].returnValues.amount;

        const value = `${amount} CLP${amount > 1 ? 's' : ''}`;
        const msg = "Has adquirido CLP"

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: value,
            msg: msg
        });
    }

    return data;
};

export const getSellClpEvent = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsFilterByNftID("SellCLP", Contract, nft_id, fromBlock, toBlock);

    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const amount = events[i].returnValues.amount;

        const value = `${amount} CLP${amount > 1 ? 's' : ''}`;
        const msg = `Has vendido CLP`

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: value,
            msg: msg
        });
    }

    return data;
};

export const getWinnerListEvent = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsFilterByNftID("WinnerList", Contract, nft_id, fromBlock, toBlock);

    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const comeIn = events[i].returnValues.comeIn;
        const connections = events[i].returnValues.connections;

        const value = comeIn ? `${connections} Conexion${connections > 1 ? 'es' : ''}.` : '';
        const msg = comeIn ? `NFT: ${nft_id} ha ingresado a la Lista de Ganadores.` : `NFT: ${nft_id} ha salido de la Lista de Ganadores.`;

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: value,
            msg: msg
        });
    }

    return data;
};

export const getWinners = async (Contract, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsWithoutFilter("WinnerList", Contract, fromBlock, toBlock);

    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const nft_id = events[i].returnValues.nft_id;
        const comeIn = events[i].returnValues.comeIn;
        const connections = events[i].returnValues.connections;

        const value = comeIn ? `${connections} Conexion${connections > 1 ? 'es' : ''}.` : '';
        const msg = comeIn ? `NFT: ${nft_id} ha ingresado a la Lista de Ganadores.` : `NFT: ${nft_id} ha salido de la Lista de Ganadores.`;

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: value,
            msg: msg
        });
    }

    return data;
};

