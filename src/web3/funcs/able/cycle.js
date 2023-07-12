export const getActualCycle = async (Contract) => {
    const rewardID = await Contract.methods.rewardID().call();

    if (Number(rewardID) <= 3) return Number(rewardID);
    return Number(rewardID) % 3;
}