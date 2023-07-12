import { RewardGetActual } from ".";

export const RewardSinergyGetData = async (Reward, wallet, cycle) => {
    const able = await RewardGetActual(
        Reward.able.contract, 
        wallet, 
        (Number(cycle) - 1).toString()
    );
    const stablecoin = await RewardGetActual(
        Reward.stablecoin.contract, 
        wallet, 
        (Number(cycle) - 1).toString()
    );

    Reward.able = able;
    Reward.stablecoin = stablecoin;

    return Reward;
};