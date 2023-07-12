import { SINERGY_BRONZE_CONTRACT_ADDRESS } from "..";

export const getResources = async (ContractSinergy, ContractCDA, ContractST) => {
    const resourcesAmountWEI = await ContractSinergy.methods.resourcesAmount().call();
    const resourcesAmount_USDT = web3.utils.fromWei(resourcesAmountWEI, 'ether');

    const resourcesAmountCDAWEI = await ContractCDA.methods.balanceOf(SINERGY_BRONZE_CONTRACT_ADDRESS).call();
    const resourcesAmountCDA = web3.utils.fromWei(resourcesAmountCDAWEI, 'ether');

    const resourcesAmountABLEWEI = await ContractST.methods.balanceOf(SINERGY_BRONZE_CONTRACT_ADDRESS).call();
    const resourcesAmountABLE = web3.utils.fromWei(resourcesAmountABLEWEI, 'ether');


    return {
        busd: Number(resourcesAmount_USDT).toFixed(2),
        cda: Number(resourcesAmountCDA).toFixed(2),
        able: Number(resourcesAmountABLE).toFixed(2)
    }
};


