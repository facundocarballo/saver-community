import { getSavingData, getSavingsRecords } from '../able/saving';

export const UserGetData = async (User, cycle, wallet) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando User...";

    const cycle_to_check = await User.contract.methods.cycleToCheck(wallet).call();
    const last_points_wei = await User.contract.methods.points_per_cycle(wallet, cycle - 1).call();
    const last_points = web3.utils.fromWei(last_points_wei, 'ether');
    const is_updated = await User.contract.methods.is_updated(wallet, cycle).call();
    console.log("is_updated: ", is_updated)
    const is_qualified = await User.contract.methods.IsQualified(wallet).call();
    const stablecoin_earned_on_able_reward_wei = await User.contract.methods.stablecoin_earned_on_able_reward(wallet).call();
    const stablecoin_earned_on_able_reward = web3.utils.fromWei(stablecoin_earned_on_able_reward_wei, 'ether');
    const records = await getSavingsRecords(wallet, User.contract, cycle);
    const data = await getSavingData(wallet, User.contract, cycle);

    User = await UserGetQualifiedInfo(User, wallet);

    User.saving = {
        data,
        records
    }

    User.is_qualified = is_qualified;
    User.is_updated = is_updated;
    User.last_points = last_points;
    User.cycle_to_check = cycle_to_check;
    User.stablecoin_earned_on_able_reward = stablecoin_earned_on_able_reward;
   
    let end_time = Date.now();
    console.log("Tiempo de carga (User): ", ((end_time - start_time) / 1000).toString())

    return User;
};

export const UserGetQualifiedInfo = async (User, wallet) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Califiacion...";

    // Is Qualified
    const sinergy = await User.contract.methods.IsQualifiedBySinergy(wallet).call();
    const able = await User.contract.methods.IsQualifiedByAble(wallet).call();
    const usdc = await User.contract.methods.IsQualifiedByUSDC(wallet).call();
    const usdt = await User.contract.methods.IsQualifiedByUSDT(wallet).call();
    const points = await User.contract.methods.IsQualifiedByPoints(wallet).call();
    const increase_points = await User.contract.methods.IsQualifiedByIncreasePoints(wallet).call();
    const test = await User.contract.methods.IsQualifiedByVideo(wallet).call();

    // Requirements
    const MIN_POINTS_TO_QUALIFY_WEI = await User.contract.methods.MIN_POINTS_TO_QUALIFY().call();
    const MIN_POINTS_TO_QUALIFY = web3.utils.fromWei(MIN_POINTS_TO_QUALIFY_WEI, 'ether');

    const PERCENT_TO_INCREASE = await User.contract.methods.PERCENT_TO_INCREASE().call();
    const AMOUNT_TO_DIVIDE = await User.contract.methods.AMOUNT_TO_DIVIDE().call();
    const PERCENT_DAILY_INCREASE = Number(PERCENT_TO_INCREASE) / Number(AMOUNT_TO_DIVIDE);

    User.qualified = {
        sinergy,
        able,
        usdc,
        usdt,
        points,
        increase_points,
        test,
        MIN_POINTS_TO_QUALIFY,
        PERCENT_TO_INCREASE,
        AMOUNT_TO_DIVIDE,
        PERCENT_DAILY_INCREASE
    };

    let end_time = Date.now();
    console.log("Tiempo de carga (Califiacion): ", ((end_time - start_time) / 1000).toString())

    return User;
};

export const UserGetHistoryQualified = async (User, wallet, cycle) => {
    let history = [];

    if (cycle <= 7) {
        for (let i = 1; i < cycle; i++) {
            const qualified_sinergy = await User.contract.methods.qualified_sinergy(wallet, i).call();
            const qualified_able = await User.contract.methods.qualified_able(wallet, i).call();
            const qualified_usdc = await User.contract.methods.qualified_usdc(wallet, i).call();
            const qualified_usdt = await User.contract.methods.qualified_usdt(wallet, i).call();
            const qualified_min_points = await User.contract.methods.qualified_min_points(wallet, i).call();
            const qualified_increase_points = await User.contract.methods.qualified_increase_points(wallet, i).call();
            const qualified_video = await User.contract.methods.qualified_video(wallet, i).call();

            const h = await User.contract.methods.qualified_history(wallet, i - 1).call();

            history.push({
                cycle: i,
                qualified_sinergy: qualified_sinergy,
                qualified_able: qualified_able,
                qualified_usdc: qualified_usdc,
                qualified_usdt: qualified_usdt,
                qualified_min_points: qualified_min_points,
                qualified_increase_points: qualified_increase_points,
                qualified_video: qualified_video,
                qualified: h
            });
        }
    } else {
        for (let i = (cycle - 7); i < cycle; i++) {
            const qualified_sinergy = await User.contract.methods.qualified_sinergy(wallet, i).call();
            const qualified_able = await User.contract.methods.qualified_able(wallet, i).call();
            const qualified_usdc = await User.contract.methods.qualified_usdc(wallet, i).call();
            const qualified_usdt = await User.contract.methods.qualified_usdt(wallet, i).call();
            const qualified_min_points = await User.contract.methods.qualified_min_points(wallet, i).call();
            const qualified_increase_points = await User.contract.methods.qualified_increase_points(wallet, i).call();
            const qualified_video = await User.contract.methods.qualified_video(wallet, i).call();

            const h = await User.contract.methods.qualified_history(wallet, i - 1).call();

            history.push({
                cycle: i,
                qualified_sinergy: qualified_sinergy,
                qualified_able: qualified_able,
                qualified_usdc: qualified_usdc,
                qualified_usdt: qualified_usdt,
                qualified_min_points: qualified_min_points,
                qualified_increase_points: qualified_increase_points,
                qualified_video: qualified_video,
                qualified: h
            });
        }
    }

    User.history = history;

    return User;
};