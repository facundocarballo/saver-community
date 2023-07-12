import { RewardGetData } from "../reward";

export const getRewardInfo = async (
    Contract, 
    Rewards, 
    addressAccount, 
    favouriteNFT_ID, 
    cycle
) => {
    console.log("Rewards: ", Rewards)
    const busd_passiveReward = await getPassiveRewardInfo(
        Rewards.value.stablecoin.contract, 
        addressAccount,
        cycle
    );
    console.log("1")
    const able_passiveReward = await getPassiveRewardInfo(
        Rewards.value.able.contract, 
        addressAccount,
        cycle
    );
    console.log("2")
    const busd_constancy = await getConstancyRewardInfo(
        Rewards.constancy.stablecoin.contract, 
        addressAccount,
        cycle
    );
    console.log("3")
    const able_constancy = await getConstancyRewardInfo(
        Rewards.constancy.able.contract,
        addressAccount,
        cycle
    );
    console.log("4")
    const activeReward = await getActiveRewardInfo(Contract, favouriteNFT_ID);

    const lost = await getLostRewardsInfo(Contract, addressAccount);
    const earn = await getEarnRewardsInfo(Contract, addressAccount);

    return {
        passive: {
            BUSD: busd_passiveReward,
            ABLE: able_passiveReward
        },
        constancy: {
            BUSD: busd_constancy,
            ABLE: able_constancy
        },
        activeReward,
        lost,
        earn
    }
};

const getActiveRewardInfo = async (Contract, favouriteNFT_ID) => {
    const activeReward_WEI = "0";//await Contract.methods.get_nft_balance_to_claim(favouriteNFT_ID).call();
    const activeRewardToClaim = web3.utils.fromWei(activeReward_WEI, 'ether');
    const activeRewardsClaimed_WEI = await Contract.methods.nft_affiliate_rewards_earned(favouriteNFT_ID).call();
    const activeRewardsClaimed = web3.utils.fromWei(activeRewardsClaimed_WEI, 'ether');

    return {
        toClaim: activeRewardToClaim,
        claimed: activeRewardsClaimed
    };
};

const getLostRewardsInfo = async (Contract, addressAccount) => {
    const totalLostIncomeWEI = await Contract.methods.total_lost_income(addressAccount).call();
    const actualLostIncomeWEI = await Contract.methods.actual_lost_income(addressAccount).call();
    const total_lost_income = web3.utils.fromWei(totalLostIncomeWEI, 'ether');
    const actual_lost_income = web3.utils.fromWei(actualLostIncomeWEI, 'ether');

    return {
        actual: actual_lost_income,
        total: total_lost_income
    }
};

const getEarnRewardsInfo = async (Contract, addressAccount) => {
    const total_stablecoin_earnedWEI = await Contract.methods.total_stablecoin_earned(addressAccount).call();
    const total_stablecoin_earned = web3.utils.fromWei(total_stablecoin_earnedWEI, 'ether');

    return total_stablecoin_earned;
};

const getPassiveRewardInfo = async (Contract, addressAccount, cycle) => {
    const reward_id = cycle;

    const actualPassiveRewardRaisedWEI = (Number(reward_id) == 0 ? '0' : await Contract.methods.reward(Number(reward_id) - 1).call());
    const actualPassiveRewardRaised = web3.utils.fromWei(actualPassiveRewardRaisedWEI, 'ether');

    const actualPassiveRewardClaimedWEI = (Number(reward_id) == 0 ? '0' : await Contract.methods.reward_claimed(Number(reward_id) - 1).call());
    const actualPassiveRewardClaimed = web3.utils.fromWei(actualPassiveRewardClaimedWEI, 'ether');

    const futurePassiveRewardRaisedWEI = (Number(reward_id) == 0 ? '0' : await Contract.methods.reward(Number(reward_id)).call());
    const futurePassiveRewardRaised = web3.utils.fromWei(futurePassiveRewardRaisedWEI, 'ether');

    const passiveRewardToClaim_WEI = await Contract.methods.view_amount_to_claim(addressAccount, true).call();
    const passiveRewardToClaim = web3.utils.fromWei(passiveRewardToClaim_WEI, 'ether');

    const timestampToClaimPassiveReward = await Contract.methods.timestamp_to_claim_reward(addressAccount).call();

    const actualBlock = await web3.eth.getBlockNumber();
    const blockTimestamp = await web3.eth.getBlock(actualBlock);
    const actualTimestamp = blockTimestamp.timestamp;

    return {
        actual: {
            raised: Number(actualPassiveRewardRaised).toFixed(2),
            claimed: Number(actualPassiveRewardClaimed).toFixed(2)
        },
        future: {
            raised: Number(futurePassiveRewardRaised).toFixed(2),
            claimed: '0'
        },
        toClaim: passiveRewardToClaim,

        canClaim: actualTimestamp > timestampToClaimPassiveReward
    };
};

const getConstancyRewardInfo = async (Contract, addressAccount) => {
    const reward_id = await Contract.methods.reward_id().call();

    const constancyRewardRaisedWEI = (Number(reward_id) == 0 ? '0' : await Contract.methods.reward(Number(reward_id) - 1).call());
    const contancyRewardRaised = web3.utils.fromWei(constancyRewardRaisedWEI, 'ether');

    const constancyRewardClaimedWEI = (Number(reward_id) == 0 ? '0' : await Contract.methods.reward_claimed(Number(reward_id) - 1).call());
    const constancyRewardClaimed = web3.utils.fromWei(constancyRewardClaimedWEI, 'ether');

    const futureConstancyRewardRaisedWEI = (Number(reward_id) == 0 ? '0' : await Contract.methods.reward(Number(reward_id)).call());
    const futureConstancyRewardRaised = web3.utils.fromWei(futureConstancyRewardRaisedWEI, 'ether');

    const constancyRewardToClaim_WEI = await Contract.methods.view_amount_to_claim(addressAccount, false).call();
    const constancyRewardToClaim = web3.utils.fromWei(constancyRewardToClaim_WEI, 'ether');

    const timestampToClaimConstancyReward = await Contract.methods.timestamp_to_claim_reward(addressAccount).call();

    const actualBlock = await web3.eth.getBlockNumber();
    const blockTimestamp = await web3.eth.getBlock(actualBlock);
    const actualTimestamp = blockTimestamp.timestamp;

    return {
        actual: {
            raised: Number(contancyRewardRaised).toFixed(2),
            claimed: Number(constancyRewardClaimed).toFixed(2)
        },
        future: {
            raised: Number(futureConstancyRewardRaised).toFixed(2),
            claimed: '0'
        },
        toClaim: constancyRewardToClaim,
        canClaim: actualTimestamp > timestampToClaimConstancyReward
    };
};