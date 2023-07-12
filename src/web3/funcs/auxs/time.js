export const getActualTimestamp = async () => {
    const currentBlock = await web3.eth.getBlockNumber();

    const block = await web3.eth.getBlock(currentBlock);

    return block.timestamp;
};

export const getHoursToNextCycle = (timestampNow, timestampOpenReward) => {
    if (timestampOpenReward < timestampNow) return '00:00';

    const timeToNextRewardSeconds = timestampOpenReward - timestampNow;
    const hours = Math.trunc((timeToNextRewardSeconds / (60 * 60)));

    timeToNextRewardSeconds -= 60 * 60 * hours;
    const minutes = Math.trunc(timeToNextRewardSeconds / 60);

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};