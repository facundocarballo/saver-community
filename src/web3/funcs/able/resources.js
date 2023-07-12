import { STABLE_COIN_FORMAT } from "..";

export const getBalanceCollectionsForDevelopment = async (ContractST) => {
    const balanceWEI = await ContractST.methods.balanceCollectionForDevelopment().call();

    const balance = web3.utils.fromWei(balanceWEI, STABLE_COIN_FORMAT);

    return Number(balance).toFixed(2);
}

export const getBalanceCollectionsForProjects = async (ContractST) => {
    const balanceWEI = await ContractST.methods.balanceCollectionForProjects().call();

    const balance = web3.utils.fromWei(balanceWEI, STABLE_COIN_FORMAT);

    return Number(balance).toFixed(2);
}

export const getResources = async (Contract) => {
    const development = await getBalanceCollectionsForDevelopment(Contract);
    const projects = await getBalanceCollectionsForProjects(Contract);

    return { 
        development: development,
        projects: projects
    }
}