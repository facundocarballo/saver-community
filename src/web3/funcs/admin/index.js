import { STABLE_COIN_FORMAT } from "..";

const getBalanceCollectionsForDevelopment = async (ContractST) => {
    const balanceWEI = await ContractST.methods.balanceCollectionForDevelopment().call();

    const balance = web3.utils.fromWei(balanceWEI, STABLE_COIN_FORMAT);

    return Number(balance).toFixed(2);
}

const getBalanceCollectionsForProjects = async (ContractST) => {
    const balanceWEI = await ContractST.methods.balanceCollectionForProjects().call();

    const balance = web3.utils.fromWei(balanceWEI, STABLE_COIN_FORMAT);

    return Number(balance).toFixed(2);
}

export const getAdminInfo = async (ContractAble) => {
    const balanceForDevelopment = null;
    const balanceForProjects = null;
    const managementInfo = await ContractAble.methods.managementInfo().call();
    const communityWallet = await ContractAble.methods.communityWallet().call();
    const managementWallet1 = await ContractAble.methods.managementWallet().call();
    const managementWallet2 = await ContractAble.methods.managementWallet2().call();
    const devWallet = await ContractAble.methods.devWallet().call();
    
    return {
        balances: {
            development: balanceForDevelopment,
            projects: balanceForProjects
        },
        managementInfo: managementInfo,
        wallets: {
            community: communityWallet,
            management: [managementWallet1, managementWallet2],
            dev: devWallet
        }
    }
}