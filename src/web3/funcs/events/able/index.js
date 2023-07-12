import { MAIN_CURRENCY } from '../..';
import { getEventsFilterByWallet, getDateFromTimestamp, getFullDateFromTimestamp, getHourFromTimestamp, getEventsWithoutFilter } from '../common';
import { getTransferEvent } from '../erc20';

export const getAbleEvents = async (Contract, addressAccount, fromBlock, toBlock) => {
    const claimBUSD = await getEventDateAmountWallet('ClaimBUSD', MAIN_CURRENCY, 'ether',
        Contract, addressAccount, fromBlock,
        toBlock, `Has reclamado ${MAIN_CURRENCY} (Able)`);
    console.log("claimBUSD");

    const claimAble = await getEventDateAmountWallet('ClaimAble', 'ABLE', 'ether',
        Contract, addressAccount, fromBlock,
        toBlock, 'Has reclamado el Premio Able');
    console.log("claimAble");

    const video = await getVideoEvent(Contract, addressAccount, fromBlock, toBlock);
    console.log("video");

    const update = await getUpdateEvent(Contract, addressAccount, fromBlock, toBlock);
    console.log("update");

    const able = await getTransferEvent("ABLE", 'ether', Contract, addressAccount, fromBlock, toBlock);
    console.log("able");

    const AbleRewardQualification = await getEventDateWalletStatus("AbleRewardQualification", Contract, addressAccount,
        fromBlock, toBlock, "Has cambiado tu estado de calificacion del Premio Able");
    console.log("AbleRewardQualification");

    const UserQualification = await getEventDateWalletStatus("UserQualification", Contract, addressAccount,
        fromBlock, toBlock, "Tu cuenta ha cambiado el estado de calificacion");
    console.log("UserQualification");

    const CycleChange = await getEventCycleChange(Contract, fromBlock, toBlock);
    console.log("CycleChange");

    const CloseCycle = await getEventCloseCycle(Contract, addressAccount, fromBlock, toBlock);
    console.log("CloseCycle");

    const Points = await getPointsEvents(Contract, addressAccount, fromBlock, toBlock);

    return {
        claimBUSD, claimAble, video,
        update, able, AbleRewardQualification, UserQualification,
        CycleChange, CloseCycle, Points
    };
}

export const getPointsEvents = async (
    Contract,
    addressAccount,
    fromBlock,
    toBlock
) => {
    let data = [];
    const events = await getEventsFilterByWallet("Points", Contract, addressAccount, fromBlock, toBlock);
    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const hour = getHourFromTimestamp(block.timestamp);
        const date = getDateFromTimestamp(block.timestamp);

        const amountWei = event.returnValues.amount;
        const amount = web3.utils.fromWei(String(amountWei), "ether");

        const cycle = event.returnValues.cycle;
        const increase = event.returnValues.increase;

        const msg = increase ? `Has incrementado tus puntos | Ciclo ${cycle}` : `Has reducido tus puntos | Ciclo ${cycle}`

        data.push({
            timestamp: block.timestamp,
            hour: hour,
            date: date,
            value: `${Number(amount).toFixed(2)} Puntos`,
            msg: msg
        });
    });

    return data;
};

export const getEventDateAmountWallet = async (eventName, symbolToken,
    decimals, Contract,
    addressAccount, fromBlock,
    toBlock, msg) => {
    let data = [];

    const events = await getEventsFilterByWallet(eventName, Contract, addressAccount, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const hour = getHourFromTimestamp(block.timestamp);
        const date = getDateFromTimestamp(block.timestamp);

        const amountWei = event.returnValues.amount;
        const amount = web3.utils.fromWei(String(amountWei), decimals);

        data.push({
            timestamp: block.timestamp,
            hour: hour,
            date: date,
            value: `${Number(amount).toFixed(2)} ${symbolToken}`,
            msg: msg
        });
    });

    return data;
}

export const getVideoEvent = async (Contract, addressAccount, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsFilterByWallet('AnswerVideo', Contract, addressAccount, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const hour = getHourFromTimestamp(block.timestamp);
        const date = getDateFromTimestamp(block.timestamp);

        const answer = event.returnValues.res;

        data.push({
            timestamp: block.timestamp,
            hour: hour,
            date: date,
            value: answer,
            msg: 'Has constestado el Able Test'
        });
    });

    return data;

}

export const getUpdateEvent = async (Contract, addressAccount, fromBlock, toBlock) => {
    let data = [];
    const events = await getEventsFilterByWallet('Update', Contract, addressAccount, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const date = getDateFromTimestamp(block.timestamp);
        const hour = getHourFromTimestamp(block.timestamp);

        data.push({
            timestamp: block.timestamp,
            date: date,
            hour: hour,
            value: null,
            msg: 'Has actualizado la Dapp'
        });
    });

    return data;
}

export const getEventDateWalletStatus = async (eventName, Contract, addressAccount, fromBlock, toBlock, msg) => {
    let data = [];

    const events = await getEventsFilterByWallet(eventName, Contract, addressAccount, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const hour = getHourFromTimestamp(block.timestamp);
        const date = getDateFromTimestamp(block.timestamp);

        const status = event.returnValues.status ? "Calificado" : "Descalificado";

        data.push({
            timestamp: block.timestamp,
            hour: hour,
            date: date,
            value: status,
            msg: msg
        });
    });

    return data;
}

export const getEventCycleChange = async (Contract, fromBlock, toBlock) => {
    let data = [];

    const events = await getEventsWithoutFilter("CycleChange", Contract, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const hour = getHourFromTimestamp(block.timestamp);
        const date = getDateFromTimestamp(block.timestamp);

        const cycle = event.returnValues.cycle;

        data.push({
            timestamp: block.timestamp,
            hour: hour,
            date: date,
            value: cycle,
            msg: 'Cambio de ciclo'
        });
    });

    return data;
}

export const getEventCloseCycle = async (Contract, addressAccount, fromBlock, toBlock) => {
    let data = [];

    const events = await getEventsFilterByWallet("CloseCycle", Contract, addressAccount, fromBlock, toBlock);

    events.map(async (event) => {
        const blockNumber = event.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);

        const hour = getHourFromTimestamp(block.timestamp);
        const date = getDateFromTimestamp(block.timestamp);

        const cycle = event.returnValues.cycle;
        const qualifiedSinergy = event.returnValues.qualifiedSinergy;
        const qualifiedUSDT = event.returnValues.qualifiedUSDT;
        const qualifiedUSDC = event.returnValues.qualifiedUSDC;
        const qualifiedSaver = event.returnValues.qualifiedSaver;
        const qualifiedBDD = event.returnValues.qualifiedBDD;
        const qualifiedDonatedPerDay = event.returnValues.qualifiedDonatedPerDay;
        const qualifiedVideo = event.returnValues.qualifiedVideo;

        const close_qualified = qualifiedSinergy && qualifiedUSDT && qualifiedUSDC && qualifiedSaver && qualifiedBDD && qualifiedDonatedPerDay && qualifiedVideo;

        const requirementsUncompleted = getRequirementsUncompleted(qualifiedSinergy, qualifiedUSDT, qualifiedUSDC, qualifiedSaver, qualifiedBDD, qualifiedDonatedPerDay, qualifiedVideo);

        const msg_qualified = `Cierre de Ciclo: ${cycle} | Calificado`;
        const msg_unqualified = `Cierre de Ciclo: ${cycle} | Descalificado | Motivos de descalificacion: ${requirementsUncompleted}`;

        data.push({
            timestamp: block.timestamp,
            hour: hour,
            date: date,
            value: close_qualified ? msg_qualified : msg_unqualified,
            msg: 'Cambio de ciclo'
        });
    });

    return data;
}


const getRequirementsUncompleted = (qualifiedSinergy, qualifiedCDA, qualifiedUSDC, qualifiedSaver,
    qualifiedBDD, qualifiedDonatedPerDay, qualifiedVideo) => {
    let res = '';
    let cont = 0;

    if (!qualifiedSinergy) {
        res += 'No poseias ningun NFT';
        cont++;
    }

    if (!qualifiedCDA) {
        if (cont != 0) res += ', TRIPLE EXT. menor al TRIPLE INT.';
        else res += 'TRIPLE EXT. menor al TRIPLE INT.';
        cont++;
    }

    if (!qualifiedUSDC) {
        if (cont != 0) res += ', USDC menor al TRIPLE INT.';
        else res += 'USDC menor al TRIPLE INT.'
        cont++;
    }

    if (!qualifiedSaver) {
        if (cont != 0) res += ', Able menor al TRIPLE INT.';
        else res += 'Able menor al TRIPLE INT.';
        cont++;
    }

    if (!qualifiedBDD) {
        if (cont != 0) res += ', TRIPLE INT. menor o igual a 3';
        else 'TRIPLE INT. menor o igual a 3';
        cont++;
    }

    if (!qualifiedDonatedPerDay) {
        if (cont != 0) res += ', No has aumentado 0.9% tus TRIPLE INT.';
        else res += 'No has aumentado 0.9% tus TRIPLE INT.';
        cont++;
    }

    if (!qualifiedVideo) {
        if (cont != 0) res += ', No has respondido correctamente el Able Test';
        else res += 'No has respondido correctamente el Able Test';
        cont++;
    }

    return res;
}