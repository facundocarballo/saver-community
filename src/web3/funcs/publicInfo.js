import { STABLE_COIN_FORMAT } from ".";

export const getTotalSupply = async (ContractST) => {
    const tC = await ContractST.methods.totalSupply().call();
    const tokensCirculation = await web3.utils.fromWei(tC, 'ether');

    return Number(tokensCirculation).toFixed(4);
};

export const getSaverMinted = async (ContractST) => {
    // const initialSupplyWEI = await ContractST.methods.initialSupply().call();
    const totalSupplyWEI = await ContractST.methods.totalSupply().call();

    // const initialSupply = await web3.utils.fromWei(initialSupplyWEI, 'ether');
    const totalSupply = await web3.utils.fromWei(totalSupplyWEI, 'ether');

    const result = totalSupply;

    if (result < 0) return 0;

    return result;
};

export const getStableCoinDistribute = async (
    BaseReward,
    ValueReward,
    ConstancyReward,
    ConfidenceReward
) => {

    const base_reward_wei = await BaseReward.contract.methods.total_distributed().call();
    const base_reward = await web3.utils.fromWei(base_reward_wei, STABLE_COIN_FORMAT);

    const value_reward_wei = await ValueReward.contract.methods.total_distributed().call();
    const value_reward = await web3.utils.fromWei(value_reward_wei, STABLE_COIN_FORMAT);

    const constancy_reward_wei = await ConstancyReward.contract.methods.total_distributed().call();
    const constancy_reward = await web3.utils.fromWei(constancy_reward_wei, STABLE_COIN_FORMAT);

    const confidence_reward_wei = await ConfidenceReward.contract.methods.total_distributed().call();
    const confidence_reward = await web3.utils.fromWei(confidence_reward_wei, STABLE_COIN_FORMAT);

    const total = Number(base_reward) + Number(value_reward) + Number(constancy_reward) + Number(confidence_reward);
    
    return Number(total).toFixed(2);
};

export const getLastStableCoinDistribute = async (
    BaseReward,
    ValueReward,
    ConstancyReward,
    ConfidenceReward,
    cycle
) => {
    const base_reward_wei = await BaseReward.contract.methods.claimed_amount(cycle).call();
    const base_reward = await web3.utils.fromWei(base_reward_wei, STABLE_COIN_FORMAT);

    const value_reward_wei = await ValueReward.contract.methods.claimed_amount(cycle).call();
    const value_reward = await web3.utils.fromWei(value_reward_wei, STABLE_COIN_FORMAT);

    const constancy_reward_wei = await ConstancyReward.contract.methods.claimed_amount(cycle).call();
    const constancy_reward = await web3.utils.fromWei(constancy_reward_wei, STABLE_COIN_FORMAT);

    const confidence_reward_wei = await ConfidenceReward.contract.methods.claimed_amount(cycle).call();
    const confidence_reward = await web3.utils.fromWei(confidence_reward_wei, STABLE_COIN_FORMAT);

    const total = Number(base_reward) + Number(value_reward) + Number(constancy_reward) + Number(confidence_reward);
    
    return Number(total).toFixed(2);
};

export const getHolders = async (ContractToken) => {
    const holders = await ContractToken.methods.total_holders().call();
    return { holders };
};


export const getSaverPrice = async () => {
    // Hasta que abran una pool en xDai esta funcion solo va a devolver
    return `NO HAY POOL`;

};