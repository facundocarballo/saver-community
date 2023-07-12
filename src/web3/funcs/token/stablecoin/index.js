import { STABLE_COIN_CONTRACT_ADDRESS } from "../../in";

const getStableCoinBalance = async (addressAccount, Contract) => {
    const wei = await Contract.methods.balanceOf(addressAccount).call();

    return Number(web3.utils.fromWei(wei, STABLE_COIN_FORMAT)).toFixed(2);
}

export const getStableCoinInfo = async (Contract, addressAccount) => {
    const balance = await getStableCoinBalance(addressAccount, Contract);

    return {
        contract: Contract,
        contractAddress: STABLE_COIN_CONTRACT_ADDRESS,
        balance: balance
    }
};