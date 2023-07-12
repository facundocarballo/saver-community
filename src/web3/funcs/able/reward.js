import { STABLE_COIN_FORMAT } from "..";

export const getFutureReward = async (ContractToken) => {
    const actualReward = await ContractToken.methods.rewardID().call();
    const amountWEI = await ContractToken.methods.rewardAmount(actualReward).call();
    const amount = await web3.utils.fromWei(amountWEI, STABLE_COIN_FORMAT);

    return Number(amount).toFixed(2);
};

export const getActualRewardRaised = async (ContractToken) => {
    const actualReward = await ContractToken.methods.rewardIDonClaim().call();
    const amountWEI = await ContractToken.methods.rewardAmount(actualReward).call();
    const amount = await web3.utils.fromWei(amountWEI, STABLE_COIN_FORMAT);

    return Number(amount).toFixed(2);
};

export const getActualAmountReward = async (ContractToken) => {
    const actualRewardID = await ContractToken.methods.rewardIDonClaim().call();
    const actualRewardWEI = await ContractToken.methods.rewardAmount(actualRewardID).call();
    const rewardClaimedWEI = await ContractToken.methods.rewardAmountClaimed(actualRewardID).call();

    const actualRewardETH = web3.utils.fromWei(String(actualRewardWEI), STABLE_COIN_FORMAT);
    const rewardClaimedETH = web3.utils.fromWei(String(rewardClaimedWEI), STABLE_COIN_FORMAT);

    const actualAmount = actualRewardETH - rewardClaimedETH;

    return Number(actualAmount).toFixed(2);
};

export const getAmountToClaim = async (ContractToken, amount, addressAccount) => {
    const amountToClaimWEI = await ContractToken.methods.viewClaimStableCoin(addressAccount).call();
    const amountToClaim = web3.utils.fromWei(amountToClaimWEI, STABLE_COIN_FORMAT);

    return Number(amountToClaim).toFixed(2);
};

export const getTimestampToNextReward = async (ContractToken) => {
    const actualReward = await ContractToken.methods.rewardID().call();
    const timestampOpenReward = await ContractToken.methods.timeOpenClaimReward(actualReward).call();

    return timestampOpenReward;
};

export const getActualTimestamp = async () => {
    const currentBlock = await web3.eth.getBlockNumber();

    const block = await web3.eth.getBlock(currentBlock);

    return block.timestamp;
};

export const getHoursToNextCycle = (timestampNow, timestampOpenReward) => {

    if (timestampOpenReward < timestampNow) return '00:00';

    const timeToNextRewardSeconds = timestampOpenReward - timestampNow;
    const hours = Math.trunc((timeToNextRewardSeconds / (60 * 60)));

    timeToNextRewardSeconds -= 60 * 60 * hours;
    const minutes = Math.trunc(timeToNextRewardSeconds / 60);

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const getRewardInfo = async (Contract, addressAccount, cycle) => {
    const rewardAmountRaised = await getActualRewardRaised(Contract);
    const actualRewardAmount = await getActualAmountReward(Contract);
    const actualAmountToClaim = await getAmountToClaim(Contract, rewardAmountRaised, addressAccount);

    const futureRewardAmount = await getFutureReward(Contract);
    const futureAmountToClaim = await getAmountToClaim(Contract, futureRewardAmount, addressAccount);

    const isWinner = await Contract.methods.winSaverReward(addressAccount).call();
    const wins = await Contract.methods.winsSaverRewardOf(addressAccount).call();
    const listedToClaimSaver = await Contract.methods.isListedToClaimSaver(addressAccount).call();
    const cycleToSaverReward = listedToClaimSaver ? await Contract.methods.cycleToSaverReward(addressAccount).call() : 0;
    const CYCLES_FOR_SAVER_REWARD = await Contract.methods.CYCLES_FOR_SAVER_REWARD().call();
    const cyclesToClaimSaver = (!listedToClaimSaver ? CYCLES_FOR_SAVER_REWARD : Number(cycleToSaverReward) - Number(cycle));
    const total_wins = await Contract.methods.totalWinsSaverReward().call();
    
    return {
        stableCoin: {
            actual: {
                raised: rewardAmountRaised,
                amount: actualRewardAmount,
                toClaim: actualAmountToClaim
            },
            future: {
                raised: futureRewardAmount,
                amount: futureRewardAmount,
                toClaim: futureAmountToClaim
            }
        },
        ableReward: {
            cycleToSaverReward: cycleToSaverReward,
            cyclesToClaim: cyclesToClaimSaver,
            CYCLES: Number(CYCLES_FOR_SAVER_REWARD),
            listedToClaimSaver: listedToClaimSaver,
            isWinner,
            wins,
            total_wins
        },
        
    }
}

/*

Estamos en el Ciclo: 5
Tengo que reclamar el premio en el ciclo: 6
(Quiere decir que jugue 2 dias)
3 - (6-5)
CYCLES - (CycleToClaim - actualCycle)

Estamos en el Ciclo: 6
Tengo que reclamar el premio en el ciclo: 5
(Quiere decir que jugue 4 dias)
3 - (5-6)
CYCLES - (CycleToClaim - actualCycle)

*/