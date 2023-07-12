export const getQualifiedInfo = async (ContractAble, addressAccount) => {

    let start_time = Date.now();

    const cycle = await ContractAble.methods.cycle().call();
    
    const sinergy = await ContractAble.methods.qualifiedForSinergy(addressAccount).call();

    const video = await ContractAble.methods.qualifiedForVideo(addressAccount).call();

    const donatedPerDay = await ContractAble.methods.qualifiedForDonatePerDay(addressAccount).call();
    
    const able = await ContractAble.methods.qualifiedForSAVER(addressAccount).call();
    const usdc = await ContractAble.methods.qualifiedForUSDC(addressAccount).call();
    const bdd = await ContractAble.methods.qualifiedForBDD(addressAccount).call();
    const usdt = await ContractAble.methods.qualifiedUSDT(addressAccount, cycle);

    const rewardIDonClaim = await ContractAble.methods.rewardIDonClaim().call();
    const alreadyClaim = await ContractAble.methods.holderClaimed(addressAccount, rewardIDonClaim).call();
    const userQualified = await ContractAble.methods.canReclaim(addressAccount).call();
    const userQualifiedAux = await getUserQualifiedAux(ContractAble, addressAccount, cycle-1);
    const claimFrom = await ContractAble.methods.claimFrom(addressAccount).call();

    let end_time = Date.now();
    console.log("Tiempo de carga (getQualifiedInfo): ", ( (end_time - start_time) / 1000 ).toString())

    start_time = Date.now();
    const history = null; //await getHistoryQualified(ContractAble, addressAccount, cycle);

    end_time = Date.now();
    console.log("Tiempo de carga (getHistoryQualified): ", ( (end_time - start_time) / 1000 ).toString())

    return {
        sinergy: sinergy,
        video: video,
        donatedPerDay: donatedPerDay,
        able: able,
        usdc: usdc,
        usdt: usdt,
        bdd: bdd,
        info: {
            alreadyClaim: alreadyClaim,
            userQualified: userQualified,
            userQualifiedAux: userQualifiedAux,
            claimFrom: claimFrom,
            rewardIDonClaim: rewardIDonClaim,
            canReclaim: userQualified && !alreadyClaim && rewardIDonClaim >= claimFrom
        },
        history: history
    };
};

export const getQualifiedBasic = async (ContractAble, addressAccount) => {
    const userQualified = await ContractAble.methods.canReclaim(addressAccount).call();

    return {
        info: {
            userQualified: userQualified
        }
    }
};

export const getQualifiedInfo_AfterBuyCDA = async (Able, Qualified, addressAccount) => {
    const donatedPerDay = await Able.contract.methods.qualifiedForDonatePerDay(addressAccount).call();
    const userQualified = await Able.contract.methods.canReclaim(addressAccount).call();
    const claimFrom = await Able.contract.methods.claimFrom(addressAccount).call();
    const usdt = await Able.contract.methods.qualifiedForUSDT(addressAccount).call();
    const bdd = await Able.contract.methods.qualifiedForBDD(addressAccount).call();

    Qualified.donatedPerDay = donatedPerDay;
    Qualified.info.userQualified = userQualified;
    Qualified.info.claimFrom = claimFrom;
    Qualified.usdt = usdt;
    Qualified.bdd = bdd;

    return Qualified;
};

export const getQualifiedInfo_AfterVideoTest = async (Able, Qualified, addressAccount) => {
    const video = await Able.contract.methods.qualifiedForVideo(addressAccount).call();

    Qualified.video = video;

    return Qualified;
};

export const getQualifiedInfo_AfterReward = async (Able, Qualified, addressAccount) => {
    const rewardIDonClaim = await Able.contract.methods.rewardIDonClaim().call();
    const alreadyClaim = await Able.contract.methods.holderClaimed(addressAccount, rewardIDonClaim).call();

    Qualified.info.alreadyClaim = alreadyClaim;

    return Qualified;
};

export const getQualifiedInfo_AfterAbleReward = async (Able, Qualified, addressAccount) => {
    const able = await Able.contract.methods.qualifiedForSAVER(addressAccount).call();
    Qualified.able = able;

    return Qualified;
};

export const getQualifiedInfo_AfterWithdrawCDA = async (Able, Qualified, addressAccount) => {
    const cda = await Able.contract.methods.qualifiedForCDA(addressAccount).call();
    Qualified.cda = cda;

    return Qualified;
};

export const getQualifiedInfo_AfterBuyNFT = async (Able, Qualified, addressAccount) => {
    const sinergy = await Able.contract.methods.qualifiedForSinergy(addressAccount).call();
    Qualified.sinergy = sinergy;

    return Qualified;
};

export const getQualifiedInfo_ForSinergySilver = async (Able, addressAccount) => {
    
    const cycle = await Able.contract.methods.cycle().call();

    const rewardIDonClaim = await Able.contract.methods.rewardIDonClaim().call();
    const alreadyClaim = await Able.contract.methods.holderClaimed(addressAccount, rewardIDonClaim).call();
    const userQualified = await Able.contract.methods.canReclaim(addressAccount).call();
    const userQualifiedAux = await getUserQualifiedAux(Able.contract, addressAccount, cycle-1);
    const claimFrom = await Able.contract.methods.claimFrom(addressAccount).call();

    return {
        info: {
            alreadyClaim: alreadyClaim,
            userQualified: userQualified,
            userQualifiedAux: userQualifiedAux,
            claimFrom: claimFrom,
            rewardIDonClaim: rewardIDonClaim,
            canReclaim: userQualified && !alreadyClaim && rewardIDonClaim >= claimFrom
        },
    }

    return Qualified;
};

const getUserQualifiedAux = async (Contract, addressAccount, cycle) => {
    const able = await Contract.methods.qualifiedSaver(addressAccount, cycle);
    const sinergy = await Contract.methods.qualifiedSinergy(addressAccount, cycle);
    const usdc = await Contract.methods.qualifiedUSDC(addressAccount, cycle);
    const usdt = await Contract.methods.qualifiedUSDT(addressAccount, cycle);
    const video = await Contract.methods.qualifiedVideo(addressAccount, cycle);
    const donatedPerDay = await Contract.methods.qualifiedDonatedPerDay(addressAccount, cycle);
    const bdd = await Contract.methods.qualifiedBDD(addressAccount, cycle);

    return {
        able,
        sinergy,
        usdc,
        usdt,
        video,
        donatedPerDay,
        bdd,
        all: able && sinergy && usdc && usdt && video && donatedPerDay && bdd
    }
}

export const getHistoryQualified = async (ContractAble, addressAccount, cycle) => {
    let history = [];

    if (cycle <= 7) 
    {
        for (let i = 1; i < cycle; i++) {
            const qualifiedSinergy = await ContractAble.methods.qualifiedSinergy(addressAccount, i).call();
            const qualifiedSaver = await ContractAble.methods.qualifiedSaver(addressAccount, i).call();
            const qualifiedUSDC = await ContractAble.methods.qualifiedUSDC(addressAccount, i).call();
            const qualifiedUSDT = await ContractAble.methods.qualifiedUSDT(addressAccount, i).call();
            const qualifiedBDD = await ContractAble.methods.qualifiedBDD(addressAccount, i).call();
            const qualifiedDonatedPerDay = await ContractAble.methods.qualifiedDonatedPerDay(addressAccount, i).call();
            const qualifiedVideo = await ContractAble.methods.qualifiedVideo(addressAccount, i).call();
            
            const h = await ContractAble.methods.qualifiedHistory(addressAccount, i-1).call();

            history.push({
                cycle: i,
                qualifiedSinergy: qualifiedSinergy,
                qualifiedSaver: qualifiedSaver,
                qualifiedUSDC: qualifiedUSDC,
                qualifiedUSDT: qualifiedUSDT,
                qualifiedBDD: qualifiedBDD,
                qualifiedDonatedPerDay: qualifiedDonatedPerDay,
                qualifiedVideo: qualifiedVideo,
                qualified: h
            });
        }
    } else
    {
        for (let i = (cycle-7); i < cycle; i++) {
            const qualifiedSinergy = await ContractAble.methods.qualifiedSinergy(addressAccount, i).call();
            const qualifiedSaver = await ContractAble.methods.qualifiedSaver(addressAccount, i).call();
            const qualifiedUSDC = await ContractAble.methods.qualifiedUSDC(addressAccount, i).call();
            const qualifiedUSDT = await ContractAble.methods.qualifiedUSDT(addressAccount, i).call();
            const qualifiedBDD = await ContractAble.methods.qualifiedBDD(addressAccount, i).call();
            const qualifiedDonatedPerDay = await ContractAble.methods.qualifiedDonatedPerDay(addressAccount, i).call();
            const qualifiedVideo = await ContractAble.methods.qualifiedVideo(addressAccount, i).call();
            
            const h = await ContractAble.methods.qualifiedHistory(addressAccount, i-1).call();

            history.push({
                cycle: i,
                qualifiedSinergy: qualifiedSinergy,
                qualifiedSaver: qualifiedSaver,
                qualifiedUSDC: qualifiedUSDC,
                qualifiedUSDT: qualifiedUSDT,
                qualifiedBDD: qualifiedBDD,
                qualifiedDonatedPerDay: qualifiedDonatedPerDay,
                qualifiedVideo: qualifiedVideo,
                qualified: h
            });
        }
    }

    return history;
}
