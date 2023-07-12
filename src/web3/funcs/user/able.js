import { PERCENT_DAILY_INCREASE } from '../';

export const GetUserDataForAble = async (Contract, wallet, points) => {
    const cycle_to_check = await Contract.methods.cycleToCheck(wallet).call();
    const last_points_wei = await Contract.methods.points_per_cycle(wallet).call();
    const last_points = web3.utils.fromWei(last_points_wei, 'ether');
    const min_amount_to_donate = (
        Number(points) >= (PERCENT_DAILY_INCREASE * Number(last_points)) ?
        0 :
        (((PERCENT_DAILY_INCREASE * Number(last_points)) - Number(points)) + 0.01).toFixed(4)
    );

    return {
        cycle_to_check,
        min_amount_to_donate
    }
};