const getUSDCbalance = async (addressAccount, ContractST) => {
    const USDCWEI = await ContractST.methods.getBalanceOfUSDC(addressAccount).call();

    const USDC = await web3.utils.fromWei(USDCWEI, STABLE_COIN_FORMAT); // Because the USDC is a token of 6 decimals

    return Number(USDC).toFixed(2);
};

export const getUSDCInfo = async (Contract, addressAccount) => {
    const balance = await getUSDCbalance(addressAccount, Contract);

    return {
        contract: Contract,
        contractAddress: STABLE_COIN_CONTRACT_ADDRESS,
        balance: balance
    }
};