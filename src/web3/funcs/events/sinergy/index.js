import { MAIN_CURRENCY } from "../..";
import { getEventsFilterByWallet, getDateFromTimestamp, getFullDateFromTimestamp, getHourFromTimestamp } from "../common";

export const getSinergyEvents = async (
    Contract,
    BUSD_PassiveContract,
    BUSD_ConstancyContract,
    ABLE_PassiveContract,
    ABLE_ConstancyContract,
    addressAccount,
    fromBlock,
    toBlock
) => {
    const createNFT = await getEventeCreateNFT('Mint', Contract, addressAccount,
        fromBlock, toBlock);
    console.log("createNFT");

    const activeReward = await getEventActiveReward('AffiliateRewardEvent', MAIN_CURRENCY, 'ether',
        Contract, addressAccount, fromBlock,
        toBlock);
    console.log("activeReward");

    const passiveReward_BUSD = await getEventPassiveReward(
        'RewardClaimed', MAIN_CURRENCY, 'ether',
        BUSD_PassiveContract, addressAccount, fromBlock,
        toBlock);
    console.log("passiveReward_BUSD");

    const passiveReward_ABLE = await getEventPassiveReward(
        'RewardClaimed', "ABLE", 'ether',
        ABLE_PassiveContract, addressAccount, fromBlock,
        toBlock);
    console.log("passiveReward_ABLE");

    const constancyReward_BUSD = await getEventPassiveReward(
        'RewardClaimed', MAIN_CURRENCY, 'ether',
        BUSD_ConstancyContract, addressAccount, fromBlock,
        toBlock);
    console.log("constancyReward_BUSD");

    const constancyReward_ABLE = await getEventPassiveReward(
        'RewardClaimed', "ABLE", 'ether',
        ABLE_ConstancyContract, addressAccount, fromBlock,
        toBlock);
    console.log("constancyReward_ABLE");

    const changeFavourite = await getChangeFavouriteNFT_Event(
        Contract,
        addressAccount,
        fromBlock,
        toBlock
    );
    console.log("changeFavourite");
    
    return {
        createNFT, activeReward, passiveReward_BUSD,
        constancyReward_BUSD, passiveReward_ABLE,
        constancyReward_ABLE, changeFavourite
    };
}

export const getChangeFavouriteNFT_Event = async (Contract, addressAccount, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsFilterByWallet(
        "ChangeFavourite",
        Contract,
        addressAccount,
        fromBlock,
        toBlock
    );

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const actualFavourite = event.returnValues.actualFavourite;
        const previousFavourite = event.returnValues.previousFavourite;

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: `Nuevo NFT Favorito: ${actualFavourite}`,
            msg: `Has cambiado tu NFT Favorito. | Anterior NFT Favorito: ${previousFavourite}`
        });
    });

    return data;
}

export const getEventeCreateNFT = async (eventName, Contract,
    addressAccount, fromBlock,
    toBlock) => {
    let data = [];

    const events = await getEventsFilterByWallet(eventName, Contract, addressAccount, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const id = event.returnValues.id;
        const name = event.returnValues.name;

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: `ID: ${id}`,
            msg: 'Has adquirido un NFT'
        });
    });

    return data;
}

export const getEventPassiveReward = async (eventName, symbolToken, decimals, Contract, addressAccount, fromBlock, toBlock) => {

    let data = [];

    const events = await getEventsFilterByWallet(eventName, Contract, addressAccount, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const amountWEI = event.returnValues.amount;
        const amount = web3.utils.fromWei(amountWEI, decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: `${amount} ${symbolToken}`,
            msg: 'Has recibido recompensas pasivas'
        });
    });

    return data;
}

export const getEventActiveReward = async (eventName, symbolToken, decimals, Contract, addressAccount, fromBlock, toBlock) => {

    let data = [];

    const events = await getEventsFilterByWallet(eventName, Contract, addressAccount, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        const tokenID = event.returnValues.tokenID;

        const amountWEI = event.returnValues.amount;
        const amount = web3.utils.fromWei(amountWEI, decimals);

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: `${amount} ${symbolToken}`,
            msg: `El NFT ${tokenID} ha reclamado recompensas activas`
        });
    });

    return data;
}