import { getAbleEvents, getEventCloseCycle, getEventCycleChange, getEventDateAmountWallet, getEventDateWalletStatus, getPointsEvents, getUpdateEvent, getVideoEvent } from './able';
import { sortEvents } from './common';
import { getIncreaseSavingsEvent, getTransferEvent } from './erc20';
import { getSinergyEvents } from './sinergy';
import { getSinergySaleEvents } from './sinergy/sale';
import { SAVER_TOKEN_CONTRACT_ADDRESS, SINERGY_BRONZE_CONTRACT_ADDRESS, CDA_CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS, BUSD_ConstancyReward_ADDRESS, BUSD_PassiveReward_ADDRESS, ABLE_ConstancyReward_ADDRESS, ABLE_PassiveReward_ADDRESS, ABLE_SALE_ADDRESS, MAIN_CURRENCY } from '..';
import REWARD_ABI from '../../ABI/Reward.json';
import SINERGY_SALE_ABI from '../../ABI/SinergySale.json';

const Contract = require('web3-eth-contract');

const NUMBER = 10000;

export const getAbleEventsInfo = async (
    addressAccount,
    ContractAble
) => {
    const currentBlock = await web3.eth.getBlockNumber();
    const fromBlock = currentBlock - NUMBER;

    const able = await getTransferEvent("ABLE", 'ether', ContractAble, addressAccount, fromBlock, currentBlock);

    const allEventsSorted = sortEvents([
        able
    ]
    );

    return {
        allEventsSorted
    };
};

export const getAbleStableCoinRewardEventsInfo = async (
    addressAccount,
    Contract
) => {
    const toBlock = await web3.eth.getBlockNumber();
    const fromBlock = toBlock - NUMBER;

    const claimBUSD = await getEventDateAmountWallet(
        'ClaimBUSD', MAIN_CURRENCY, 'ether',
        Contract, addressAccount, fromBlock,
        toBlock, `Has reclamado ${MAIN_CURRENCY} (Able)`
    );

    return {
        allEventsSorted: claimBUSD
    };
};

export const getAbleRewardEventsInfo = async (
    addressAccount,
    Contract
) => {
    const toBlock = await web3.eth.getBlockNumber();
    const fromBlock = toBlock - NUMBER;

    const claimAble = await getEventDateAmountWallet(
        'ClaimAble', 'ABLE', 'ether',
        Contract, addressAccount, fromBlock,
        toBlock, 'Has reclamado el Premio Able');

    return {
        allEventsSorted: claimAble
    };
};

export const getAbleVideoEventsInfo = async (
    addressAccount,
    Contract
) => {
    const toBlock = await web3.eth.getBlockNumber();
    const fromBlock = toBlock - NUMBER;

    const video = await getVideoEvent(Contract, addressAccount, fromBlock, toBlock);

    return {
        allEventsSorted: video
    };
};

export const getAbleUpdatesEventsInfo = async (
    addressAccount,
    Contract
) => {
    const toBlock = await web3.eth.getBlockNumber();
    const fromBlock = toBlock - NUMBER;

    const update = await getUpdateEvent(Contract, addressAccount, fromBlock, toBlock);

    return {
        allEventsSorted: update
    };
};

export const getAbleCyclesChangesEventsInfo = async (
    Contract
) => {
    const toBlock = await web3.eth.getBlockNumber();
    const fromBlock = toBlock - NUMBER;

    const CycleChange = await getEventCycleChange(Contract, fromBlock, toBlock);

    return {
        allEventsSorted: CycleChange
    };
};

export const getAbleUserQualificationEventsInfo = async (
    addressAccount,
    Contract
) => {
    const toBlock = await web3.eth.getBlockNumber();
    const fromBlock = toBlock - NUMBER;

    const UserQualification = await getEventDateWalletStatus(
        "UserQualification", Contract, addressAccount,
        fromBlock, toBlock,
        "Tu cuenta ha cambiado el estado de calificacion"
    );

    return {
        allEventsSorted: UserQualification
    };
};

export const getAbleCloseCyclesEventsInfo = async (
    addressAccount,
    Contract
) => {
    const toBlock = await web3.eth.getBlockNumber();
    const fromBlock = toBlock - NUMBER;

    const CloseCycle = await getEventCloseCycle(Contract, addressAccount, fromBlock, toBlock);

    const allEventsSorted = sortEvents([
        CloseCycle
    ]
    );

    return {
        allEventsSorted
    };
};

export const getAblePointsEventsInfo = async (
    addressAccount,
    Contract
) => {
    const toBlock = await web3.eth.getBlockNumber();
    const fromBlock = toBlock - NUMBER;

    const Points = await getPointsEvents(Contract, addressAccount, fromBlock, toBlock);

    return {
        allEventsSorted: Points
    };
};

export const getUsdcEventsInfo = async (
    addressAccount,
    ContractUSDC
) => {
    const currentBlock = await web3.eth.getBlockNumber();
    const fromBlock = currentBlock - NUMBER;

    const USDC_Events = await getIncreaseSavingsEvent(
        'Transfer', 'USDC', 'mwei',
        ContractUSDC, addressAccount, fromBlock,
        currentBlock
    );

    return {
        allEventsSorted: USDC_Events
    };

}

export const getUsdtEventsInfo = async (
    addressAccount,
    ContractUSDT
) => {
    const currentBlock = await web3.eth.getBlockNumber();
    const fromBlock = currentBlock - NUMBER;

    const USDT_Events = await getIncreaseSavingsEvent(
        'Transfer', 'USDC', 'mwei',
        ContractUSDT, addressAccount, fromBlock,
        currentBlock
    );


    return {
        allEventsSorted: USDT_Events
    };

}

export const getSinergyEventsInfo = async (
    addressAccount,
    ContractSinergy,
    Rewards
) => {
    const currentBlock = await web3.eth.getBlockNumber();
    const fromBlock = currentBlock - NUMBER;

    const Sinergy = await getSinergyEvents(
        ContractSinergy,
        Rewards.passiveReward.BUSD.contract,
        Rewards.constancyReward.BUSD.contract,
        Rewards.passiveReward.ABLE.contract,
        Rewards.constancyReward.ABLE.contract,
        addressAccount,
        fromBlock,
        currentBlock
    );

    const allEventsSorted = sortEvents([
        Sinergy.createNFT, Sinergy.activeReward,
        Sinergy.passiveReward_BUSD, Sinergy.constancyReward_BUSD,
        Sinergy.constancyReward_ABLE, Sinergy.passiveReward_ABLE
    ]
    );

    return { allEventsSorted }
};

export const getAbleSaleEventsInfo = async (
    addressAccount,
    ContractSinergy,
    ContractAbleSale
) => {
    const currentBlock = await web3.eth.getBlockNumber();
    const fromBlock = currentBlock - NUMBER;

    const id = await ContractSinergy.methods.favourite_nft(addressAccount).call();

    const SinergySale = await getSinergySaleEvents(
        ContractAbleSale,
        addressAccount,
        fromBlock,
        currentBlock,
        id
    );

    const allEventsSorted = sortEvents([
        SinergySale.backToQueue, SinergySale.sellToken,
        SinergySale.swapList
    ]
    );

    return { allEventsSorted }
};

export const getEventsInfo = async (
    addressAccount,
    ContractAble,
    SinergyData,
    ContractUSDC,
    ContractUSDT
) => {

    const ConstancyContract_BUSD = new Contract(REWARD_ABI.output.abi, BUSD_ConstancyReward_ADDRESS);
    const PassiveContract_BUSD = new Contract(REWARD_ABI.output.abi, BUSD_PassiveReward_ADDRESS);
    const ConstancyContract_ABLE = new Contract(REWARD_ABI.output.abi, ABLE_ConstancyReward_ADDRESS);
    const PassiveContract_ABLE = new Contract(REWARD_ABI.output.abi, ABLE_PassiveReward_ADDRESS);
    const SinergySaleContract = new Contract(SINERGY_SALE_ABI.output.abi, ABLE_SALE_ADDRESS);

    const currentBlock = await web3.eth.getBlockNumber();
    const fromBlock = currentBlock - 3000;

    console.log("Empieza a cargar");

    const Able = await getAbleEvents(ContractAble, addressAccount, fromBlock, currentBlock);
    console.log("cargo able: ", Able);

    const usdc = await getIncreaseSavingsEvent('Transfer', 'USDC', 'mwei',
        ContractUSDC, addressAccount, fromBlock,
        currentBlock);
    console.log("cargo usdc");

    const usdt = await getIncreaseSavingsEvent('Transfer', 'USDT', 'mwei',
        ContractUSDT, addressAccount, fromBlock,
        currentBlock);
    console.log("cargo usdt");

    const Sinergy = await getSinergyEvents(
        SinergyData.contract,
        PassiveContract_BUSD,
        ConstancyContract_BUSD,
        PassiveContract_ABLE,
        ConstancyContract_ABLE,
        addressAccount,
        fromBlock,
        currentBlock
    );
    console.log("cargo sinergy");
    console.log("SinergyData: ", SinergyData)

    if (SinergyData.favouriteNFT == undefined) {
        const id = await SinergyData.contract.methods.favourite_nft(addressAccount).call();
        SinergyData.favouriteNFT = { id };
    }

    console.log("SinergyData: ", SinergyData)

    const SinergySale = await getSinergySaleEvents(
        SinergySaleContract,
        addressAccount,
        fromBlock,
        currentBlock,
        SinergyData.favouriteNFT.id
    );

    console.log("SinergySale")

    const allEventsSorted = sortEvents([
        Able.claimBUSD, Able.claimAble,
        Able.video, Able.update,
        Able.able, Able.AbleRewardQualification,
        Able.CycleChange, Able.UserQualification,
        Able.CloseCycle, Able.Points,
        usdc, usdt,
        Sinergy.createNFT, Sinergy.activeReward,
        Sinergy.passiveReward_BUSD, Sinergy.constancyReward_BUSD,
        Sinergy.constancyReward_ABLE, Sinergy.passiveReward_ABLE,
        SinergySale.backToQueue, SinergySale.sellToken,
        SinergySale.swapList
    ]
    );

    console.log("cargo todo");

    return {
        Able,
        usdc,
        Sinergy,
        allEventsSorted
    };
};