import { STABLE_COIN_FORMAT } from "..";

export const GetPointsOf = async (account, ContractToken) => {
    const amount_wei = await ContractToken.methods.points_of(account).call();
    const amount = await web3.utils.fromWei(amount_wei, STABLE_COIN_FORMAT);

    return Number(amount).toFixed(2);
};

export const getAbleBalance = async (account, ContractToken) => {
    const balance = await ContractToken.methods.balanceOf(account).call();
    const token = await web3.utils.fromWei(balance, STABLE_COIN_FORMAT);

    return Number(token).toFixed(2);
};

export const getBddQualified = async (Contract) => {
    const bddQualifiedWEI = await Contract.methods.qualified_points().call();
    const bddQualified = await window.web3.utils.fromWei(bddQualifiedWEI, STABLE_COIN_FORMAT);

    return Number(bddQualified).toFixed(2);
}

export const GetAblePoints = async (Contract, wallet) => {
    const points_wei = await Contract.methods.points_of(wallet).call();
    const points = web3.utils.fromWei(points_wei, 'ether');

    return Number(points).toFixed(2);
};