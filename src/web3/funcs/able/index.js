import { SAVER_TOKEN_CONTRACT_ADDRESS } from '..';
import { getDonationBalance, getAbleBalance, getBddQualified, GetPointsOf, GetAblePoints } from './balances';
import { getResources } from './resources';
import { getActualTimestamp, getHoursToNextReward, getRewardInfo, getTimestampToNextReward, } from './reward';
import { getLimitsSavings, getSavingData, getSavingsRecords } from './saving';
import { getVideoBasicInfo, getVideosData } from './video';
import { getAdminInfo } from '../admin';
import { STABLE_COIN_FORMAT } from '..';

export const getAbleData_AfterBuyCDA = async (Able, wallet, cycle) => {
    const donationBalance = await GetAblePoints(Able.contract, wallet);
    const bddQualified = await getBddQualified(Able.contract);

    const balanceWEI = await Able.contract.methods.balanceOf(wallet).call();
    const balance = web3.utils.fromWei(balanceWEI, 'ether');

    const points_wei = await Able.contract.methods.points_of(wallet).call();
    const points = Number(web3.utils.fromWei(points_wei, 'ether')).toFixed(2);

    Able.points.points_of = points;
    Able.balance = Number(balance).toFixed(2);
    Able.donationBalance = donationBalance;
    Able.bddQualified = bddQualified;

    return Able;
};

export const getAbleData_AfterChangePorpouses = async (Able, wallet, cycle) => {
    const purposes = await AbleGetPurposes(Able.contract, wallet);

    Able.purposes = purposes;

    return Able;
};

export const getAbleData_AfterVideoTest = async (Able, wallet) => {
    const cycle = await Able.contract.methods.cycle().call();
    const lastAnswer = await Able.contract.methods.videoAnswerOf(wallet, cycle).call();
    console.log("Able: ", Able);
    console.log("LastAnswer: ", lastAnswer);
    Able.video.lastAnswer = lastAnswer;
    Able.cycle = cycle;

    return Able;
};

export const getAbleData_AfterReward = async (Able, wallet, cycle) => {
    const points = await GetAblePoints(Able.contract, wallet);
    const reward = await AbleGetAbleRewardInfo(Able.contract, wallet, cycle);

    Able.points = points;
    Able.reward = reward;

    return Able;
};

export const getAbleData_AfterAbleReward = async (Able, wallet) => {
    const donationBalance = await getDonationBalance(wallet, Able.contract);
    const balance = await getAbleBalance(wallet, Able.contract);
    const cycle = await Able.contract.methods.cycle().call();
    const reward = await getRewardInfo(Able.contract, wallet, cycle);

    Able.donationBalance = donationBalance;
    Able.cycle = cycle;
    Able.reward = reward;
    Able.balance = balance;

    return Able;
};

export const getAbleData_AfterWithdrawCDA = async (Able, wallet) => {
    const donationBalance = await getDonationBalance(wallet, Able.contract);
    const bddQualified = await getBddQualified(Able.contract);
    const cycle = await Able.contract.methods.cycle().call();

    Able.donationBalance = donationBalance;
    Able.bddQualified = bddQualified;
    Able.cycle = cycle;

    return Able;
};

export const getAbleData_AfterMigrate = async (Able, wallet) => {
    const isRecover = await Able.contract.methods.isRecover(wallet).call();

    Able.is_recover = isRecover;

    return Able;
}

export const getAbleData = async (Contract, addressAccount, cycle) => {

    let start_time = Date.now();

    window.document.getElementById('loading').innerHTML = "Cargando Able...";

    const donationBalance = await GetPointsOf(addressAccount, Contract);
    const balance = await getAbleBalance(addressAccount, Contract);

    const POTENCIAL = await Contract.methods.POTENCIAL().call();

    let end_time = Date.now();

    console.log("Tiempo de carga (Balances): ", ((end_time - start_time) / 1000).toString())

    start_time = Date.now();
    const bddQualified = await getBddQualified(Contract);

    end_time = Date.now();
    console.log("Tiempo de carga (bddQualified): ", ((end_time - start_time) / 1000).toString())

    window.document.getElementById('loading').innerHTML = "Cargando Video...";

    start_time = Date.now();
    const { lastAnswer, videoURL } = await getVideoBasicInfo(addressAccount, Contract, cycle);
    const video = {
        lastAnswer,
        videoURL
    }
    end_time = Date.now();
    console.log("Tiempo de carga (video): ", ((end_time - start_time) / 1000).toString())

    const personalPurpose = await Contract.methods.personalPurpose(addressAccount).call();
    const communityPurporse = await Contract.methods.communityPurpose(addressAccount).call();

    const isRecover = await Contract.methods.isRecover(addressAccount).call();

    window.document.getElementById('loading').innerHTML = "Cargando Ahorros...";

    start_time = Date.now();
    const savingData = await getSavingData(addressAccount, Contract, cycle);
    end_time = Date.now();
    console.log("Tiempo de carga (getSavingData): ", ((end_time - start_time) / 1000).toString())

    start_time = Date.now();
    const savingLimit = await getLimitsSavings(addressAccount, Contract);
    end_time = Date.now();
    console.log("Tiempo de carga (getLimitsSavings): ", ((end_time - start_time) / 1000).toString())

    start_time = Date.now();
    const { usdcRecord, totalRecord } = await getSavingsRecords(addressAccount, Contract, cycle);
    end_time = Date.now();
    console.log("Tiempo de carga (getSavingsRecords): ", ((end_time - start_time) / 1000).toString())

    window.document.getElementById('loading').innerHTML = "Cargando Recompensas...";

    start_time = Date.now();
    const resources = null;
    const reward = null; //await getRewardInfo(Contract, addressAccount, cycle);
    end_time = Date.now();
    console.log("Tiempo de carga (recompensas): ", ((end_time - start_time) / 1000).toString())

    window.document.getElementById('loading').innerHTML = "Cargando Alertas de Informacion...";

    start_time = Date.now();
    const admin = await getAdminInfo(Contract);
    end_time = Date.now();
    console.log("Tiempo de carga (admin): ", ((end_time - start_time) / 1000).toString())

    const lastDonationBalanceWEI = await Contract.methods.donationBalancePerCycle(addressAccount, Number(cycle) - 1).call();
    const lastDonationBalance = web3.utils.fromWei(lastDonationBalanceWEI, 'ether');

    const minAmountToDonate = (Number(donationBalance) >= (1.009 * Number(lastDonationBalance)) ? 0 : (((1.009 * Number(lastDonationBalance)) - Number(donationBalance)) + 0.01).toFixed(4));

    const stableCoinEarned_wei = await Contract.methods.stableCoinEarned(addressAccount).call();
    const stableCoinEarned = web3.utils.fromWei(stableCoinEarned_wei, 'ether');

    const stableCoinEarnedByAbleReward_wei = await Contract.methods.stableCoinEarnedByAbleReward(addressAccount).call();
    const stableCoinEarnedByAbleReward = web3.utils.fromWei(stableCoinEarnedByAbleReward_wei, 'ether');

    const viewStableCoinToClaim_wei = await Contract.methods.viewClaimStableCoin(addressAccount).call();
    const viewClaimStableCoin = web3.utils.fromWei(viewStableCoinToClaim_wei, 'ether');

    return {
        contract: Contract,
        contractAddress: SAVER_TOKEN_CONTRACT_ADDRESS,
        balance: balance,
        POTENCIAL,
        donationBalance: donationBalance,
        totalDonationBalance,
        lastDonationBalance,
        bddQualified: bddQualified,
        rewardID: rewardID,
        timer: timer,
        video: video,
        personalPurpose: personalPurpose,
        communityPurpose: communityPurporse,
        haveToRecover: !isRecover,
        cycle: cycle,
        cycleToCheck,
        savingData: savingData,
        savingLimit: savingLimit,
        saving: {
            data: savingData,
            limit: savingLimit,
            usdcRecord: usdcRecord,
            totalRecord: totalRecord
        },
        resources: resources,
        reward: reward,
        admin: admin,
        minAmountToDonate,
        stableCoinEarned,
        stableCoinEarnedByAbleReward,
        viewClaimStableCoin
    }

};

// --------------------------------------------------------------------------------

export const AbleGetData = async (Able, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Able...";

    const is_recover = await Able.contract.methods.isRecover(wallet).call();
    const holders = await AbleGetHoldersInfo(Able.contract);
    const purposes = await AbleGetPurposes(Able.contract, wallet);
    const points = await AbleGetPointsInfo(Able.contract, wallet, cycle);
    const management_info = await Able.contract.methods.management_info().call();
    const POTENCIAL_ABLE = await Able.contract.methods.POTENCIAL_ABLE().call();

    Able.is_recover = is_recover;
    Able.holders = holders;
    Able.purposes = purposes;
    Able.reward = null;
    Able.points = points;
    Able.management_info = management_info;
    Able.POTENCIAL_ABLE = POTENCIAL_ABLE;

    let end_time = Date.now();
    console.log("Tiempo de carga (Able): ", ((end_time - start_time) / 1000).toString())

    return Able;
};

export const AbleGetPurposes = async (Contract, wallet) => {
    const personal = await Contract.methods.personal_purpose(wallet).call();
    const community = await Contract.methods.community_purpose(wallet).call();

    return {
        personal, community
    }
}

export const AbleGetAbleRewardInfo = async (Contract, wallet, cycle) => {
    const POTENCIAL_ABLE = await Contract.methods.POTENCIAL_ABLE().call();
    const CYCLES_FOR_ABLE_REWARD = await Contract.methods.CYCLES_FOR_ABLE_REWARD().call();
    const is_listed_to_claim_able = await Contract.methods.is_listed_to_claim_able(wallet).call();
    const amount_of_wins_able_reward_of = await Contract.methods.amount_of_wins_able_reward_of(wallet).call();
    const won_able_reward = await Contract.methods.won_able_reward(wallet).call();
    const total_able_earned_of = await Contract.methods.total_able_earned_of(wallet).call();
    let cycle_to_able_reward = await Contract.methods.cycle_to_able_reward(wallet).call();
    if (cycle_to_able_reward == 0) {
        cycle_to_able_reward = Number(cycle) + Number(CYCLES_FOR_ABLE_REWARD);
    }
    const able_rewards_claimed = await Contract.methods.able_rewards_claimed().call();
    const qualified_able_rewards_claimed = await Contract.methods.qualified_able_rewards_claimed().call();
    const total_able_distributed = await Contract.methods.total_able_distributed().call();

    return {
        POTENCIAL_ABLE,
        CYCLES_FOR_ABLE_REWARD,
        is_listed_to_claim_able,
        amount_of_wins_able_reward_of,
        won_able_reward,
        total_able_earned_of,
        cycle_to_able_reward,
        able_rewards_claimed,
        qualified_able_rewards_claimed,
        total_able_distributed
    }
};

export const AbleGetHoldersInfo = async (Contract) => {
    const total_holders = await Contract.methods.total_holders().call();
    const qualified_holders = await Contract.methods.qualified_holders().call();

    return {
        total_holders,
        qualified_holders
    }
};

export const AbleGetPointsInfo = async (Contract, wallet, cycle) => {
    const points_wei = await Contract.methods.points_of(wallet).call();
    const points_of = Number(web3.utils.fromWei(points_wei, 'ether')).toFixed(2);

    const total_points_wei = await Contract.methods.total_points().call();
    const total_points = Number(web3.utils.fromWei(total_points_wei, 'ether')).toFixed(2);

    const amount_of_wallets_with_points = await Contract.methods.amount_of_wallets_with_points().call();
    const last_wallet_who_bought_able = await Contract.methods.last_wallet_who_bought_able().call();

    const qualified = await AbleGetQualifiedPointsInfo(Contract, wallet, cycle);

    return {
        points_of,
        total_points,
        amount_of_wallets_with_points,
        last_wallet_who_bought_able,
        qualified
    }
};

export const AbleGetQualifiedPointsInfo = async (Contract, wallet, cycle) => {
    const qualified_points_by_cycle_wei = await Contract.methods.qualified_points_by_cycle(cycle).call();
    const qualified_points_by_cycle = Number(web3.utils.fromWei(qualified_points_by_cycle_wei, 'ether')).toFixed(2);

    const qualified_points_in_last_cycle_wei = await Contract.methods.qualified_points_by_cycle(cycle - 1).call();
    const qualified_points_in_last_cycle = Number(web3.utils.fromWei(qualified_points_in_last_cycle_wei, 'ether')).toFixed(2);

    const qualified_points = await Contract.methods.qualified_points().call();
    const total_qualified_wallets = await Contract.methods.total_qualified_wallets().call();
    const is_qualified = await Contract.methods.points_of(wallet).call();

    return {
        qualified_points_by_cycle,
        qualified_points_in_last_cycle,
        qualified_points,
        total_qualified_wallets,
        is_qualified
    }
};

