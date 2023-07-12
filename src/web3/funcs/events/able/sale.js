import { getDateFromTimestamp, getEventsFilterByNftID, getHourFromTimestamp } from '../common';

export const getAbleSaleEvents = async (Contract, nft_id, fromBlock, toBlock) => {
    const list_events = await getAbleSale_List_Events(Contract, nft_id, fromBlock, toBlock);
    const sell_events = await getAbleSale_Sell_Event(Contract, nft_id, fromBlock, toBlock);
    const backToQueue_events = await getAbleSale_BackToQueue_Event(Contract, nft_id, fromBlock, toBlock);

    return {
        list_events, sell_events, backToQueue_events
    }
};

export const getAbleSale_List_Events = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];
    
    const events = await getEventsFilterByNftID("SellList", Contract, nft_id, fromBlock, toBlock);
    
    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);
        
        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const comeIn = events[i].returnValues.comeIn;

        const msg = comeIn ? `NFT: ${nft_id} ha ingresado a la Lista de Venta ABLE.` : `NFT: ${nft_id} ha salido de la Lista de Venta ABLE.`;

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

export const getAbleSale_Sell_Event = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];
    
    const events = await getEventsFilterByNftID("SellAble", Contract, nft_id, fromBlock, toBlock);
    
    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);
        
        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const buyer = events[i].returnValues.buyer;
        const seller = events[i].returnValues.seller;
        const amount_wei = events[i].returnValues.amount;
        const amount = web3.utils.fromWei(amount_wei, 'ether');

        const msg = `El NFT ${nft_id} ha vendido ${amount} ABLE${Number(amount) > 1 ? 's' : ''}`

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

export const getAbleSale_BackToQueue_Event = async (Contract, nft_id, fromBlock, toBlock) => {
    let data = [];
    
    const events = await getEventsFilterByNftID("BackToQueue", Contract, nft_id, fromBlock, toBlock);
    
    for (let i = 0; i < events.length; i++) {
        const blockNumber = events[i].blockNumber;
        const block = await web3.eth.getBlock(blockNumber);
        
        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const posAnt = events[i].returnValues.posAnt;
        const posAct = events[i].returnValues.posAct;

        const msg = `PENALIZACION Lista de Venta ABLE. El NFT ${nft_id} paso de estar en la posicion ${posAnt} a estar en la posicion ${posAct}`;

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