export const getSaverBalance = async (account, ContractToken) => {
    const balance = await ContractToken.methods.balanceOf(account).call();
    const token = await web3.utils.fromWei(balance, STABLE_COIN_FORMAT);

    return Number(token).toFixed(2);
};

export const getDonationBalance = async (account, ContractToken) => {
    const donateBalance = await ContractToken.methods.donationBalance(account).call();
    const StableCoin = await web3.utils.fromWei(donateBalance, STABLE_COIN_FORMAT);

    return Number(StableCoin).toFixed(2);
};

export const getUSDCbalance = async (addressAccount, ContractST) => {
    const USDCWEI = await ContractST.methods.getBalanceOfUSDC(addressAccount).call();

    const USDC = await web3.utils.fromWei(USDCWEI, STABLE_COIN_FORMAT); // Because the USDC is a token of 6 decimals

    return Number(USDC).toFixed(2);
};

export const getUSDTbalance = async (addressAccount, ContractST) => {
    const USDCWEI = await ContractST.methods.getBalanceOfUSDT(addressAccount).call();
    const USDC = await web3.utils.fromWei(USDCWEI, STABLE_COIN_FORMAT);

    return Number(USDC).toFixed(2);
};

export const getCDAbalance = async (addressAccount, Contract) => {
    const CDAWEI = await Contract.methods.balanceOf(addressAccount).call();
    const CDA = await web3.utils.fromWei(CDAWEI, STABLE_COIN_FORMAT);

    return Number(CDA).toFixed(2);
};

export const getStableCoinBalance = async (addressAccount, Contract) => {
    const wei = await Contract.methods.balanceOf(addressAccount).call();

    return Number(web3.utils.fromWei(wei, STABLE_COIN_FORMAT)).toFixed(2);
}

export const getNativeCryptoBalance = async (addressAccount) => {
    const wei = await web3.eth.getBalance(addressAccount);
    return Number(web3.utils.fromWei(wei, 'ether')).toFixed(2);
}

export const getERC20Info = async (Contract, addressAccount, format, contractAddress) => {
    const balanceWEI = await Contract.methods.balanceOf(addressAccount).call();
    const balance = web3.utils.fromWei(balanceWEI, format);
    const decimals = await Contract.methods.decimals().call();
    const name = await Contract.methods.name().call();

    return {
        contract: Contract,
        contractAddress: contractAddress,
        balance: Number(balance).toFixed(2),
        decimals,
        name
    }
}