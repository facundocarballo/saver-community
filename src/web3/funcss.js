import Web3 from 'web3';
import SaverToken from './ABI/Saver.json';
import ERC20 from './ABI/ERC20.json';
import Sinergy from './ABI/Sinergy.json';
import { ABI_FACTORY, ABI_PAIR } from './ABI/PancakeSwap';
import { border } from '@chakra-ui/react';
import NFT_IMAGES from '../nftImages.json';

export const URL_WEB = "https://ablesaver-test.web.app";


export const BASE_URL_NFT_IMAGES = "https://ipfs.io/ipfs"; ///"https://gateway.pinata.cloud/ipfs"
export const CID_NFT_IMAGES = "bafybeiesqizstaqh5iefvu6roxopgk72v33okilo6seux3ykogrzfcdw5q";
export const CID_NFT_JSON = "QmW6HPPzW3snP3gjRBBLVuk3j86uni22VrZnDBV4n8TEb1";

const BSC_MAINNET_RPC = 'https://rpc.api.moonbase.moonbeam.network';
// "https://few-weathered-shard.xusdt.discover.quiknode.pro/c8d753eba0c012ae48e7795a2a6f22f1c38bf5ab/";
//'https://ropsten.infura.io/v3/fbb5f7b0808d450bbae06a7348f5dda8' 
//'https://bsc-dataseed1.binance.org/'; 
//`https://speedy-nodes-nyc.moralis.io/${MORALIS_ID}/bsc/mainnet`;

export const MAIN_CURRENCY = "BUSD";
export const NATIVE_CRYPTO = "GLMR";

export const CHAIN_ID = 1287 //3;//100;

export const GAS_PRICE = "5";

export const STABLE_COIN_FORMAT = 'ether'; // ('ether' => 18 decimals) | ('mwei' => 6 decimals)

export const VIDEOS_AMOUNT = 3;

const Contract = require('web3-eth-contract');

Contract.setProvider(BSC_MAINNET_RPC);

// Contract Address
export const SAVER_TOKEN_CONTRACT_ADDRESS = "0xb774349fA07767EE00aC9A09e4BC44C148fe56E3"; //"0x30Ed2F0e73a25133a1c7921EC166d51998e8aa37"//"0xFD5c75Cee3f0Cb104A5962384c1f6225A80b2B52";
export const SINERGY_BRONZE_CONTRACT_ADDRESS = "0xf56055aD9128c1002c57ca5519f11A24c03E8E5e"; //"0xa4c3d7eEcAf462e296888e0E28c616C33B72a135" //"0x48EB81303DB8B44645485Dc7C1f95017aeB11f01"//"0x4cE407dd60f3623DA8292e49529D26E285853157"; //"0x360f6865115C652892ff75cE74c3B96aE9a33041"
export const CDA_CONTRACT_ADDRESS = "0x551FF58fbdc3CAbADB8a8FFaE124241F7057F670";//"0x6e4914Db969cDB82D2c98FB205488BA0Cf179B04" //"0x0D259ECCEb24e8E603486f8062DBDAabF78AB235";
// (Este es el contrato v2, que hice el sabado a la noche) "0x4eEC791bdeE18ce9df618a0584e562aEEAfBe22A" 
// (Este es el ultimo que le pase a Miguel) "0x1a311671957613B9C0dd4eEF5D988a7552AFf800" 
export const USDC_CONTRACT_ADDRESS = "0xEa9f365Bdf33B80b5145ED26D1b92229280DA6D3";
export const USDT_CONTRACT_ADDRESS = "0x358cBaa85a38Ab70726e65a0c1986d225210B1EF";
export const STABLE_COIN_CONTRACT_ADDRESS = "0xd9C7C02dBF4451d89040cd2a576b615327ccF38b";
export const FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";

// Images of NFT
export const NFT_IMG = {
    base: [
        "https://i.ibb.co/TrcHgM0/base-1.png",
        "https://i.ibb.co/V3Qj3fb/base-2.png",
        "https://i.ibb.co/fxWHDBY/base-3.png",
        "https://i.ibb.co/wh9gJhm/base-4.png",
        "https://i.ibb.co/rGWppBj/base-5.png",
        "https://i.ibb.co/pz9htCV/base-6.png",
        "https://i.ibb.co/y4YRQjd/base-7.png",
        "https://i.ibb.co/6byPtBB/base-8.png",
        "https://i.ibb.co/dkJmZVd/base-9.png",
    ],
    border: [
        "https://i.ibb.co/X4fQJ9w/borde-1-removebg-preview.png",
        "https://i.ibb.co/MgJVSDQ/borde-2.png",
        "https://i.ibb.co/3hdzVqz/borde-3.png",
        "https://i.ibb.co/XfPG0Vf/borde-4.png",
        "https://i.ibb.co/brxVrWG/borde-5.png",
        "https://i.ibb.co/KGdnwM0/borde-6.png",
        "https://i.ibb.co/yqSh2yV/borde-7.png",
        "https://i.ibb.co/GdY0hSn/borde-8.png",
        "https://i.ibb.co/s9cBKq1/borde-9.png"
    ],
    center: [
        "https://i.ibb.co/92YHzMQ/centro-1.png",
        "https://i.ibb.co/mNtPhDB/centro-2.png",
        "https://i.ibb.co/KLRY213/centro-3.png",
        "https://i.ibb.co/SdRJ5WF/centro-4.png",
        "https://i.ibb.co/N71b3Kw/centro-5.png",
        "https://i.ibb.co/LCWrd2x/centro-6.png",
        "https://i.ibb.co/1LDPmMB/centro-7.png",
        "https://i.ibb.co/Jxj6y3T/centro-8.png",
        "https://i.ibb.co/98xcF1c/centro-9.png"
    ],
    ornament: [
        "https://i.ibb.co/Hx0CWmd/adorno-1.png",
        "https://i.ibb.co/GJFx4Q1/adorno-2.png",
        "https://i.ibb.co/sVGF3r3/adorno-3.png",
        "https://i.ibb.co/ZTx6ZcS/adorno-4.png",
        "https://i.ibb.co/Jn9Rmhy/adorno-5.png",
        "https://i.ibb.co/yfcM0ZX/adorno-6.png",
        "https://i.ibb.co/fQ9vJ1n/adorno-7.png",
        "https://i.ibb.co/1ZHtfb7/adorno-8.png",
        "https://i.ibb.co/W069Lt6/adorno-9.png"
    ],
    font: [
        {
            name: "Luminari",
            color: "rgba(204,153,102,1)",
            weight: "",
            uppercase: false,
            size: '12px'
        },
        {
            name: "Signpainter",
            color: "rgba(204,153,102,1)",
            weight: "semi-bold",
            uppercase: false,
            size: '12px'
        },
        {
            name: "Cincel-Decorative",
            color: "rgba(229,174,118,1)",
            weight: "bold",
            uppercase: true,
            size: '12px'
        },
        {
            name: "Herculanum",
            color: "rgba(229,174,118,1)",
            weight: "",
            uppercase: true,
            size: '12px'
        },
        {
            name: "Apple-Chancery",
            color: "rgba(229,174,118,1)",
            weight: "chancery",
            uppercase: false,
            size: '12px'
        },
        {
            name: "Snell-Rounhand",
            color: "rgba(229,174,118,1)",
            weight: "bold",
            uppercase: false,
            size: '12px'
        },
        {
            name: "Trattatello",
            color: "rgba(204,153,102,1)",
            weight: "",
            uppercase: false,
            size: '12px'
        },
        {
            name: "Zapfino",
            color: "rgba(229,174,118,1)",
            weight: "",
            uppercase: false,
            size: '12px'
        },
        {
            name: "Phosphate",
            color: "rgba(229,174,118,1)",
            weight: "inline",
            uppercase: true,
            size: '12px'
        }
    ]
}

// Load Web3 to show info only
export const loadWeb3Data = async () => {
    window.web3 = new Web3(BSC_MAINNET_RPC);

    const data = await getDataWeb3();

    return data;
};

export const buildTransaciont = async (addressAccount, to, data) => {
    const nonce = await web3.eth.getTransactionCount(addressAccount);
    const estimateGas = await web3.eth.estimateGas({
        from: addressAccount,
        to: to,
        nonce: nonce,
        data: data
    });
    return {
        from: addressAccount,
        to: to,
        gas: web3.utils.toHex(estimateGas),
        gasPrice: web3.utils.toHex(web3.utils.toWei(GAS_PRICE, 'gwei')),
        data: data
    };

}

export const getOwnerOfNFT = async (Contract, tokenID) => {
    const address = await Contract.methods.ownerOf(tokenID).call();

    return address;
}

// Functions WEB3

const getSaverPrice = async () => {
    // Hasta que abran una pool en xDai esta funcion solo va a devolver
    return `NO HAY POOL`;

    const ContractFactory = new Contract(ABI_FACTORY, FACTORY_ADDRESS);
    const pair = await ContractFactory.methods.getPair(SAVER_TOKEN_CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS).call();

    if (pair != '0x0000000000000000000000000000000000000000') {
        const ContractPair = new Contract(ABI_PAIR, pair);
        const res = await ContractPair.methods.getReserves().call();
        /* 
            When the pool is created like this:
            - SFAST
            - USDC

            We want to compare the first token (SFAST [0]) with the second one (USDC [1])

            If the pool is created in the other way:
            - USDC
            -SFAST

            We want to compare the second one (SFAST [1] with the first one (USDC [0]))
        */
        return `${Number(res[1] / res[0]).toFixed(2)} USDC`;
    }

    return `NO HAY POOL`;
};

const getHoursToNextReward = (timestampNow, timestampOpenReward) => {

    if (timestampOpenReward < timestampNow) return '00:00';

    const timeToNextRewardSeconds = timestampOpenReward - timestampNow;
    const hours = Math.trunc((timeToNextRewardSeconds / (60 * 60)));

    timeToNextRewardSeconds -= 60 * 60 * hours;
    const minutes = Math.trunc(timeToNextRewardSeconds / 60);

    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const getContract = async () => {
    const contract = new Contract(SaverToken.output.abi, SAVER_TOKEN_CONTRACT_ADDRESS);
    return contract
};

const getTotalSupply = async (ContractST) => {
    const tC = await ContractST.methods.totalSupply().call();
    const tokensCirculation = await web3.utils.fromWei(tC, 'ether');

    return tokensCirculation;
};

const getSaverMinted = async (ContractST) => {
    const initialSupplyWEI = await ContractST.methods.initialSupply().call();
    const totalSupplyWEI = await ContractST.methods.totalSupply().call();

    const initialSupply = await web3.utils.fromWei(initialSupplyWEI, 'ether');
    const totalSupply = await web3.utils.fromWei(totalSupplyWEI, 'ether');

    const result = totalSupply - initialSupply;

    if (result < 0) return 0;

    return result;
};

const getStableCoinDistribute = async (ContractToken) => {

    const StableCoinWEI = await ContractToken.methods.totalStableCoinDistribute().call();
    const StableCoin = await web3.utils.fromWei(StableCoinWEI, STABLE_COIN_FORMAT);

    return Number(StableCoin).toFixed(2);
};

const getLastStableCoinDistribute = async (ContractST) => {
    const rewardIDonClaim = await ContractST.methods.rewardIDonClaim().call();
    const StableCoinWei = await ContractST.methods.rewardAmount(rewardIDonClaim).call();
    const StableCoin = await web3.utils.fromWei(StableCoinWei, STABLE_COIN_FORMAT);

    return Number(StableCoin).toFixed(2);
};

const getHolders = async (ContractToken) => {
    const holders = await ContractToken.methods.totalHolders().call();
    return { holders };
};

const getFutureReward = async (ContractToken) => {
    const actualReward = await ContractToken.methods.rewardID().call();
    const amountWEI = await ContractToken.methods.rewardAmount(actualReward).call();
    const amount = await web3.utils.fromWei(amountWEI, STABLE_COIN_FORMAT);

    return Number(amount).toFixed(2);
};

const getActualRewardRaised = async (ContractToken) => {
    const actualReward = await ContractToken.methods.rewardIDonClaim().call();
    const amountWEI = await ContractToken.methods.rewardAmount(actualReward).call();
    const amount = await web3.utils.fromWei(amountWEI, STABLE_COIN_FORMAT);

    return Number(amount).toFixed(2);
};

const getActualAmountReward = async (ContractToken) => {
    const actualRewardID = await ContractToken.methods.rewardIDonClaim().call();
    const actualRewardWEI = await ContractToken.methods.rewardAmount(actualRewardID).call();
    const rewardClaimedWEI = await ContractToken.methods.rewardAmountClaimed(actualRewardID).call();

    const actualRewardETH = web3.utils.fromWei(String(actualRewardWEI), STABLE_COIN_FORMAT);
    const rewardClaimedETH = web3.utils.fromWei(String(rewardClaimedWEI), STABLE_COIN_FORMAT);

    const actualAmount = actualRewardETH - rewardClaimedETH;

    return Number(actualAmount).toFixed(2);
};

export const getTimestampToNextReward = async (ContractToken) => {
    const actualReward = await ContractToken.methods.rewardID().call();
    const timestampOpenReward = await ContractToken.methods.timeOpenClaimReward(actualReward).call();

    return timestampOpenReward;
};

export const getActualTimestamp = async () => {
    const currentBlock = await web3.eth.getBlockNumber();

    const block = await web3.eth.getBlock(currentBlock);

    return block.timestamp;
};

export const getAccount = async () => {
    const account = await ethereum.request({ method: 'eth_coinbase' });

    return account;
};

// NEED ACCOUNT

const getStableCoinToClaim = async (account, ContractToken) => {
    const toClaimWEI = await ContractToken.methods.viewClaimStableCoin(account).call();
    const toCLAIM = await web3.utils.fromWei(toClaimWEI, 'ether');

    return Number(toCLAIM).toFixed(2);
};

const getStableCoinEarned = async (account, ContractToken) => {
    const StableCoinWEI = await ContractToken.methods.stableCoinEarned(account).call();
    const StableCoinEarned = await web3.utils.fromWei(StableCoinWEI, 'ether');

    return Number(StableCoinEarned).toFixed(2);
};

const getStableCoinDonate = async (account, ContractToken) => {

    const allDonate = await ContractToken.methods.allDonatesOf(account).call();

    const StableCoin = await web3.utils.fromWei(allDonate, 'ether');

    return Number(StableCoin).toFixed(2);
};

// Get the balance of each ERC20

const getSaverBalance = async (account, ContractToken) => {
    const balance = await ContractToken.methods.balanceOf(account).call();
    const token = await web3.utils.fromWei(balance, STABLE_COIN_FORMAT);

    return Number(token).toFixed(2);
};

const getDonationBalance = async (account, ContractToken) => {
    const donateBalance = await ContractToken.methods.donationBalance(account).call();
    const StableCoin = await web3.utils.fromWei(donateBalance, STABLE_COIN_FORMAT);

    return Number(StableCoin).toFixed(2);
};

const getUSDCbalance = async (addressAccount, ContractST) => {
    const USDCWEI = await ContractST.methods.getBalanceOfUSDC(addressAccount).call();

    const USDC = await web3.utils.fromWei(USDCWEI, STABLE_COIN_FORMAT); // Because the USDC is a token of 6 decimals

    return Number(USDC).toFixed(2);
};

const getUSDTbalance = async (addressAccount, ContractST) => {
    const USDCWEI = await ContractST.methods.getBalanceOfUSDT(addressAccount).call();
    const USDC = await web3.utils.fromWei(USDCWEI, STABLE_COIN_FORMAT);

    return Number(USDC).toFixed(2);
};

const getCDAbalance = async (addressAccount, Contract) => {
    const CDAWEI = await Contract.methods.balanceOf(addressAccount).call();
    const CDA = await web3.utils.fromWei(CDAWEI, STABLE_COIN_FORMAT);

    return Number(CDA).toFixed(2);
};

const getStableCoinBalance = async (addressAccount, Contract) => {
    const wei = await Contract.methods.balanceOf(addressAccount).call();

    return Number(web3.utils.fromWei(wei, STABLE_COIN_FORMAT)).toFixed(2);
}

const getNativeCryptoBalance = async (addressAccount) => {
    const wei = await web3.eth.getBalance(addressAccount);
    return Number(web3.utils.fromWei(wei, 'ether')).toFixed(2);
}


const getLimitsSavings = async (addressAccount, ContractST) => {
    const usdtWEI = await ContractST.methods.lastAmountUSDT(addressAccount).call();
    const usdt = web3.utils.fromWei(usdtWEI, STABLE_COIN_FORMAT);

    const usdcWEI = await ContractST.methods.lastAmountUSDC(addressAccount).call();
    const usdc = web3.utils.fromWei(usdcWEI, STABLE_COIN_FORMAT); // Because the USDC is a token of 6 decimals

    const limit = (Number(usdt) + Number(usdc)) * 1.00369;

    return limit.toFixed(2);
}

const getSavingData = async (addressAccount, Contract) => {
    // La grafica deberia mostrar los ahorros segun los ciclos y no segun los dias
    // Mostrar siemrpe 7 barras, no mas.
    const savingID = await Contract.methods.savingsID(addressAccount).call();

    let data = [];
    let totalAmount = 0;

    if (savingID == 0) {
        data.push({
            day: 0,
            limit: 0,
            usdcAmount: 0,
            usdtAmount: 0,
            totalAmount: 0
        });
        return data;
    }

    for (var i = 0; i < savingID; i++) {
        const usdcWEI = await Contract.methods.usdcRecord(addressAccount, i).call();
        const usdtWEI = await Contract.methods.usdtRecord(addressAccount, i).call();

        const usdc = web3.utils.fromWei(usdcWEI, STABLE_COIN_FORMAT);
        const usdt = web3.utils.fromWei(usdtWEI, STABLE_COIN_FORMAT);

        const limit = totalAmount * 1.00369;

        totalAmount = Number(usdc) + Number(usdt);

        data.push({
            day: i,
            limit: limit,
            usdcAmount: Number(usdc),
            usdtAmount: Number(usdt),
            totalAmount: totalAmount
        });


    }

    return data;
}

const getSavingsRecords = async (addressAccount, ContractST) => {
    const savingID = await ContractST.methods.savingsID(addressAccount).call();

    let usdcRecord = [];
    let usdtRecord = [];
    let totalRecord = [];

    if (savingID == 0) {
        usdcRecord.push(0);
        usdtRecord.push(0);
        totalRecord.push(0);

        return { usdcRecord, usdtRecord, totalRecord };
    }

    for (var i = 0; i < savingID; i++) {
        const usdcWEI = await ContractST.methods.usdcRecord(addressAccount, i).call();
        const usdtWEI = await ContractST.methods.usdtRecord(addressAccount, i).call();

        const usdc = web3.utils.fromWei(usdcWEI, STABLE_COIN_FORMAT);
        const usdt = web3.utils.fromWei(usdtWEI, STABLE_COIN_FORMAT);

        usdcRecord.push(Number(usdc).toFixed(2));
        usdtRecord.push(Number(usdt).toFixed(2));
        totalRecord.push(Number(usdc + usdt).toFixed(2));
    }

    return { usdcRecord, usdtRecord, totalRecord };
}

const getTotalDonationBalance = async (ContractToken) => {
    const totalDonationBalanceWEI = await ContractToken.methods.totalDonationBalance().call();
    const totalDonationBalance = await web3.utils.fromWei(totalDonationBalanceWEI, STABLE_COIN_FORMAT);

    return Number(totalDonationBalance).toFixed(2);
};

const getAmountToClaim = async (ContractToken, amount, addressAccount) => {
    const amountToClaimWEI = await ContractToken.methods.viewClaimStableCoin(addressAccount).call();
    const amountToClaim = web3.utils.fromWei(amountToClaimWEI, STABLE_COIN_FORMAT);

    return Number(amountToClaim).toFixed(2);
};

// const getTimestampToClaimSaver = async (ContractST, addressAccount) => 
// {
//     const timestamp = await ContractST.methods.timestampToClaimSaver(addressAccount).call();

//     return timestamp;
// };

const getBalanceCollectionsForDevelopment = async (ContractST) => {
    const balanceWEI = await ContractST.methods.balanceCollectionForDevelopment().call();

    const balance = web3.utils.fromWei(balanceWEI, STABLE_COIN_FORMAT);

    return Number(balance).toFixed(2);
}

const getBalanceCollectionsForProjects = async (ContractST) => {
    const balanceWEI = await ContractST.methods.balanceCollectionForProjects().call();

    const balance = web3.utils.fromWei(balanceWEI, STABLE_COIN_FORMAT);

    return Number(balance).toFixed(2);
}

const getActualCycle = async (Contract) => {
    const rewardID = await Contract.methods.rewardID().call();

    if (Number(rewardID) <= 3) return Number(rewardID);
    return Number(rewardID) % 3;
}

const getVideosData = async (addressAccount, timestampNow, Contract) => {
    const videosAmount = await Contract.methods.videoID().call();

    const lastVideo = videosAmount == 0 ? 0 : videosAmount - 1;

    const cycle = await Contract.methods.cycle().call();

    const lastAnswer = await Contract.methods.videoAnswerOf(addressAccount, cycle).call();

    const canClaimForVideo = await Contract.methods.qualifiedForVideo(addressAccount).call();

    const videoSort = await Contract.methods.sort().call();

    const videoID = videosAmount != 0
        ? !videoSort ?
            Number(timestampNow) % Number(videosAmount)
            : videosAmount - 1
        : 0;

    const videoURL = await Contract.methods.youtubeID(videoID).call();

    let firstPossibleAnswers = [];
    let secondPossibleAnswers = [];
    let thirdPossibleAnswers = [];

    const firstQuestion = await Contract.methods.firstQuestion(videoID).call();
    const secondQuestion = await Contract.methods.secondQuestion(videoID).call();
    const thirdQuestion = await Contract.methods.thirdQuestion(videoID).call();

    const firstRealAnswer = await Contract.methods.firstRealAnswer(videoID).call();
    const secondRealAnswer = await Contract.methods.secondRealAnswer(videoID).call();
    const thirdRealAnswer = await Contract.methods.thirdRealAnswer(videoID).call();

    const firstFakeAnswer1 = await Contract.methods.firstFakeAnswer1(videoID).call();
    const secondFakeAnswer1 = await Contract.methods.secondFakeAnswer1(videoID).call();
    const thirdFakeAnswer1 = await Contract.methods.thirdFakeAnswer1(videoID).call();

    const firstFakeAnswer2 = await Contract.methods.firstFakeAnswer2(videoID).call();
    const secondFakeAnswer2 = await Contract.methods.secondFakeAnswer2(videoID).call();
    const thirdFakeAnswer2 = await Contract.methods.thirdFakeAnswer2(videoID).call();


    if ((timestampNow % VIDEOS_AMOUNT) == 0) {
        firstPossibleAnswers.push(firstRealAnswer);
        firstPossibleAnswers.push(firstFakeAnswer1);
        firstPossibleAnswers.push(firstFakeAnswer2);

        secondPossibleAnswers.push(secondFakeAnswer1);
        secondPossibleAnswers.push(secondRealAnswer);
        secondPossibleAnswers.push(secondFakeAnswer2);

        thirdPossibleAnswers.push(thirdFakeAnswer1);
        thirdPossibleAnswers.push(thirdFakeAnswer2);
        thirdPossibleAnswers.push(thirdRealAnswer);
    }

    if ((timestampNow % VIDEOS_AMOUNT) == 1) {
        firstPossibleAnswers.push(firstFakeAnswer1);
        firstPossibleAnswers.push(firstRealAnswer);
        firstPossibleAnswers.push(firstFakeAnswer2);


        secondPossibleAnswers.push(secondRealAnswer);
        secondPossibleAnswers.push(secondFakeAnswer1);
        secondPossibleAnswers.push(secondFakeAnswer2);

        thirdPossibleAnswers.push(thirdFakeAnswer1);
        thirdPossibleAnswers.push(thirdRealAnswer);
        thirdPossibleAnswers.push(thirdFakeAnswer2);
    }

    if ((timestampNow % VIDEOS_AMOUNT) == 2) {

        firstPossibleAnswers.push(firstFakeAnswer1);
        firstPossibleAnswers.push(firstFakeAnswer2);
        firstPossibleAnswers.push(firstRealAnswer);

        secondPossibleAnswers.push(secondFakeAnswer1);
        secondPossibleAnswers.push(secondFakeAnswer2);
        secondPossibleAnswers.push(secondRealAnswer);

        thirdPossibleAnswers.push(thirdRealAnswer);
        thirdPossibleAnswers.push(thirdFakeAnswer1);
        thirdPossibleAnswers.push(thirdFakeAnswer2);

    }

    return {
        videoID, videoURL, firstQuestion, secondQuestion, thirdQuestion,
        firstPossibleAnswers, secondPossibleAnswers, thirdPossibleAnswers,
        lastAnswer, firstRealAnswer, secondRealAnswer, thirdRealAnswer,
        videoSort, lastVideo, canClaimForVideo
    };
}

const getSinergyData = async (addressAccount, Contract, CDA_Contract, ContractST) => {
    // Corregir
    const amount = await Contract.methods.balanceOf(addressAccount).call();

    const isQualified = Number(amount) > 0;

    const resourcesAmountWEI = await Contract.methods.resourcesAmount().call();
    const resourcesAmount_USDT = web3.utils.fromWei(resourcesAmountWEI, 'ether');

    const passiveRewardID = await Contract.methods.passiveRewardID().call();
    const actualPassiveRewardRaisedWEI = (Number(passiveRewardID) == 0 ? '0' : await Contract.methods.passiveReward(Number(passiveRewardID) - 1).call());
    const actualPassiveRewardRaised = web3.utils.fromWei(actualPassiveRewardRaisedWEI, 'ether');
    const actualPassiveRewardClaimedWEI = (Number(passiveRewardID) == 0 ? '0' : await Contract.methods.passiveRewardClaimed(Number(passiveRewardID) - 1).call());
    const actualPassiveRewardClaimed = web3.utils.fromWei(actualPassiveRewardClaimedWEI, 'ether');
    const futurePassiveRewardRaisedWEI = (Number(passiveRewardID) == 0 ? '0' : await Contract.methods.passiveReward(Number(passiveRewardID)).call());
    const futurePassiveRewardRaised = web3.utils.fromWei(futurePassiveRewardRaisedWEI, 'ether');
    const amountMinted = await Contract.methods.getAmountOfNftMinted().call();

    let tiempoInicial = Date.now();
    const myNFTs = await getMyNFTs(Contract, addressAccount, amount);
    let tiempoFinal = Date.now();

    console.log("Tiempo de carga de mis NFTs: " + ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");
    
    tiempoInicial = Date.now();
    const favouriteNFT_ID = await Contract.methods.favourite_nft(addressAccount).call();

    const favouriteNFT = await getNFT(Contract, favouriteNFT_ID);
    tiempoFinal = Date.now();

    console.log("Tiempo de carga de mi NFT favorito: " + ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    tiempoInicial = Date.now();
    const totalLostIncomeWEI = await Contract.methods.total_lost_income(addressAccount).call();
    const actualLostIncomeWEI = await Contract.methods.actual_lost_income(addressAccount).call();
    const total_stablecoin_earnedWEI = await Contract.methods.total_stablecoin_earned(addressAccount).call();

    const total_lost_income = web3.utils.fromWei(totalLostIncomeWEI, 'ether');
    const actual_lost_income = web3.utils.fromWei(actualLostIncomeWEI, 'ether');
    const total_stablecoin_earned = web3.utils.fromWei(total_stablecoin_earnedWEI, 'ether');

    const resourcesAmountCDAWEI = await CDA_Contract.methods.balanceOf(SINERGY_BRONZE_CONTRACT_ADDRESS).call();
    const resourcesAmountCDA = web3.utils.fromWei(resourcesAmountCDAWEI, 'ether');

    const resourcesAmountABLEWEI = await ContractST.methods.balanceOf(SINERGY_BRONZE_CONTRACT_ADDRESS).call();
    const resourcesAmountABLE = web3.utils.fromWei(resourcesAmountABLEWEI, 'ether');

    tiempoFinal = Date.now();

    console.log("Tiempo de carga de Ganancias/Perdidas Sinergy: " + ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    let autoReferenceID = '7';

    const addressOfLastDonation = await ContractST.methods.lastDonationFrom().call();
    if (addressOfLastDonation != '0x0000000000000000000000000000000000000000') {
        const amountNFTOfLastDonation = await Contract.methods.balanceOf(addressOfLastDonation).call();

        const randomNumber = Math.trunc(Math.random() * Number(amountNFTOfLastDonation));
        const nftsOfLastDonor = await getMyNFTs(Contract, addressOfLastDonation, amountNFTOfLastDonation);

        if (Number(amountNFTOfLastDonation) > 1) {
            autoReferenceID = nftsOfLastDonor[randomNumber].id;
        }
    }

    const nextImage = {
        border: Math.trunc(Math.random() * 4),
        base: Math.trunc(Math.random() * 4),
        center: Math.trunc(Math.random() * 4)
    }


    const passiveRewardToClaim_WEI = await Contract.methods.viewAmountToClaimPassiveReward(addressAccount).call();
    const passiveRewardToClaim = web3.utils.fromWei(passiveRewardToClaim_WEI, 'ether');
    const activeReward_WEI = await Contract.methods.get_nft_balance_to_claim(favouriteNFT_ID).call();
    const activeRewardToClaim = web3.utils.fromWei(activeReward_WEI, 'ether');
    const nftImage = NFT_IMAGES.filter((nft, _) => {
        if (nft.name == `${nextImage.border}-${nextImage.base}-${nextImage.center}.png`) {
            return nft;
        }
    });

    return {
        contract: Contract,
        amount: amount,
        passiveRewardToClaim: passiveRewardToClaim,
        futurePassiveRewardToClaim: Number(amount) * 0 / Number(amountMinted),
        activeRewardToClaim: activeRewardToClaim,
        isQualified: isQualified,
        resources: {
            busd: resourcesAmount_USDT,
            cda: resourcesAmountCDA,
            able: resourcesAmountABLE
        },
        autoReferenceID: autoReferenceID,
        passiveRewardID: passiveRewardID,
        passiveRewardRaised: actualPassiveRewardRaised,
        passiveRewardClaimed: actualPassiveRewardClaimed,
        futurePassiveRewardRaised: futurePassiveRewardRaised,
        amountMinted: amountMinted,
        myNFTs: myNFTs,
        favouriteNFT: favouriteNFT,
        totalLostIncome: total_lost_income,
        actualLostIncome: actual_lost_income,
        totalStableCoinEarned: total_stablecoin_earned,
        nextNFT: {
            border: nextImage.border,
            base: nextImage.base,
            center: nextImage.center,
            imageURL: `${BASE_URL_NFT_IMAGES}/${nftImage[0].cdi}`,
            jsonURL: `ipfs://${CID_NFT_JSON}/${nextImage.border}-${nextImage.base}-${nextImage.center}.json`
        }
    };
}

const getNFTReferencesAtLevel = async (Contract, tokenID, amountOfReferences, level) => {
    let nftReferences = [];

    const total_amount_references = await Contract.methods.get_total_amount_references(tokenID).call();
    const imageURL = await Contract.methods.get_nft_image_url(tokenID).call();
    const timestampCreated = await Contract.methods.get_nft_timestamp_created(tokenID).call();
    const dateCreated = unixToDate(timestampCreated);

    if (level == 1) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_first_level_references(tokenID, i).call();
            const ref = await Contract.methods.get_nft_reference(nftID).call();

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref
            })
        }

        return nftReferences;
    }

    if (level == 2) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_second_level_references(tokenID, i).call();
            const ref = await Contract.methods.get_nft_reference(nftID).call();

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref
            })
        }

        return nftReferences;
    }

    if (level == 3) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_third_level_references(tokenID, i).call();
            const ref = await Contract.methods.get_nft_reference(nftID).call();

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref
            })
        }

        return nftReferences;
    }

    if (level == 4) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_four_level_references(tokenID, i).call();
            const ref = await Contract.methods.get_nft_reference(nftID).call();

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref
            })
        }

        return nftReferences;
    }

    if (level == 5) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_five_level_references(tokenID, i).call();
            const ref = await Contract.methods.get_nft_reference(nftID).call();

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref
            })
        }

        return nftReferences;
    }

    if (level == 6) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_six_level_references(tokenID, i).call();
            const ref = await Contract.methods.get_nft_reference(nftID).call();

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref
            })
        }

        return nftReferences;
    }

    if (level == 7) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_seven_level_references(tokenID, i).call();
            const ref = await Contract.methods.get_nft_reference(nftID).call();

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref
            })
        }

        return nftReferences;
    }

    if (level == 8) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_eight_level_references(tokenID, i).call();
            const ref = await Contract.methods.get_nft_reference(nftID).call();

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref
            })
        }

        return nftReferences;
    }

    if (level == 9) {
        for (let i = 0; i < amountOfReferences; i++) {
            const nftID = await Contract.methods.get_nine_level_references(tokenID, i).call();
            const ref = await Contract.methods.get_nft_reference(nftID).call();

            nftReferences.push({
                id: nftID,
                total_amount_references: total_amount_references,
                dateCreated: dateCreated,
                imageURL: imageURL,
                ref: ref
            })
        }

        return nftReferences;
    }


    return null;
}

const getReferences = async (ContractNFT, tokenID) => {
    const totalAmountReferences = await ContractNFT.methods.get_total_amount_references(tokenID).call();

    // First Level
    const firstLevelAmount = await ContractNFT.methods.get_first_level_amount_reference(tokenID).call();
    const firstLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, firstLevelAmount, 1);

    // Second Level
    const secondLevelAmount = await ContractNFT.methods.get_second_level_amount_reference(tokenID).call();
    const seocndLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, secondLevelAmount, 2);

    // Third Level
    const thirdLevelAmount = await ContractNFT.methods.get_third_level_amount_reference(tokenID).call();
    const thirdLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, thirdLevelAmount, 3);

    // Four Level
    const fourLevelAmount = await ContractNFT.methods.get_four_level_amount_reference(tokenID).call();
    const fourLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, fourLevelAmount, 4);

    // Five Level
    const fiveLevelAmount = await ContractNFT.methods.get_five_level_amount_reference(tokenID).call();
    const fiveLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, fiveLevelAmount, 5);

    // Six Level
    const sixLevelAmount = await ContractNFT.methods.get_six_level_amount_reference(tokenID).call();
    const sixLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, sixLevelAmount, 6);

    // Seven Level
    const sevenLevelAmount = await ContractNFT.methods.get_seven_level_amount_reference(tokenID).call();
    const sevenLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, sevenLevelAmount, 7);

    // Eight Level
    const eightLevelAmount = await ContractNFT.methods.get_eight_level_amount_reference(tokenID).call();
    const eightLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, eightLevelAmount, 8);

    // Nine Level
    const nineLevelAmount = await ContractNFT.methods.get_nine_level_amount_reference(tokenID).call();
    const nineLevelReferences = await getNFTReferencesAtLevel(ContractNFT, tokenID, nineLevelAmount, 9);

    const references = {
        firstLevel: {
            amount: firstLevelAmount,
            nfts: firstLevelReferences
        },
        secondLevel: {
            amount: secondLevelAmount,
            nfts: seocndLevelReferences
        },
        thirdLevel: {
            amount: thirdLevelAmount,
            nfts: thirdLevelReferences
        },
        fourLevel: {
            amount: fourLevelAmount,
            nfts: fourLevelReferences
        },
        fiveLevel: {
            amount: fiveLevelAmount,
            nfts: fiveLevelReferences
        },
        sixLevel: {
            amount: sixLevelAmount,
            nfts: sixLevelReferences
        },
        sevenLevel: {
            amount: sevenLevelAmount,
            nfts: sevenLevelReferences
        },
        eightLevel: {
            amount: eightLevelAmount,
            nfts: eightLevelReferences
        },
        nineLevel: {
            amount: nineLevelAmount,
            nfts: nineLevelReferences
        },
        total: totalAmountReferences
    };


    return references;
}

export const unixToDate = (timestamp) => {
    const d = new Date(Number(timestamp));
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
}

// Capaz que nos puede servir en un futuro para mostrar la imagen del NFT en los "Accordions"
const getNFT_WithoutReferences = async (ContractNFT, tokenID) => {
    const name = await ContractNFT.methods.get_nft_name(tokenID).call();
    const inscription = await ContractNFT.methods.get_nft_inscription(tokenID).call();
    const valueProposal = await ContractNFT.methods.get_nft_value_proposal(tokenID).call();

    const activeRewardsClaimedWEI = await ContractNFT.methods.get_nft_rewards_claimed(tokenID).call();
    const activeRewardsClaimed = web3.utils.fromWei(activeRewardsClaimedWEI, 'ether');

    const directReferenceNFT = await ContractNFT.methods.get_nft_reference(tokenID).call(); // NFT al que me conecte
    const ownerAddress = await ContractNFT.methods.ownerOf(tokenID).call();

    const base = await ContractNFT.methods.get_nft_base(tokenID).call();
    const border = await ContractNFT.methods.get_nft_border(tokenID).call();
    const center = await ContractNFT.methods.get_nft_center(tokenID).call();
    const font = await ContractNFT.methods.get_nft_font(tokenID).call();
    const ornament = await ContractNFT.methods.get_nft_ornament(tokenID).call();

    const timestampCreated = await ContractNFT.methods.get_nft_timestamp_created(tokenID).call();
    const dateCreated = unixToDate(timestampCreated);

    return {
        name: name,
        inscription: inscription,
        valueProposal: valueProposal,
        ownerAddress: ownerAddress,
        directReferenceNFT: directReferenceNFT,
        activeRewardsClaimed: activeRewardsClaimed,
        dateCreated: dateCreated,
        properties: {
            base: base,
            border: border,
            center: center,
            font: font,
            ornament: ornament
        },
        id: tokenID
    };

};

export const getNFT = async (ContractNFT, tokenID) => {
    const name = await ContractNFT.methods.get_nft_name(tokenID).call();
    const inscription = await ContractNFT.methods.get_nft_inscription(tokenID).call();
    const valueProposal = await ContractNFT.methods.get_nft_value_proposal(tokenID).call();

    const imageURL = await ContractNFT.methods.get_nft_image_url(tokenID).call();

    const activeRewardsClaimedWEI = await ContractNFT.methods.get_nft_rewards_claimed(tokenID).call();
    const activeRewardsClaimed = web3.utils.fromWei(activeRewardsClaimedWEI, 'ether');

    const directReferenceNFT = await ContractNFT.methods.get_nft_reference(tokenID).call(); // NFT al que me conecte
    const ownerAddress = await ContractNFT.methods.ownerOf(tokenID).call();

    const base = await ContractNFT.methods.get_nft_base(tokenID).call();
    const border = await ContractNFT.methods.get_nft_border(tokenID).call();
    const center = await ContractNFT.methods.get_nft_center(tokenID).call();
    const font = await ContractNFT.methods.get_nft_font(tokenID).call();
    const ornament = await ContractNFT.methods.get_nft_ornament(tokenID).call();

    const references = await getReferences(ContractNFT, tokenID);

    const timestampCreated = await ContractNFT.methods.get_nft_timestamp_created(tokenID).call();
    const dateCreated = unixToDate(timestampCreated);

    return {
        name: name,
        inscription: inscription,
        valueProposal: valueProposal,
        imageURL: imageURL,
        ownerAddress: ownerAddress,
        directReferenceNFT: directReferenceNFT,
        activeRewardsClaimed: activeRewardsClaimed,
        references: references,
        dateCreated: dateCreated,
        properties: {
            base: base,
            border: border,
            center: center,
            font: font,
            ornament: ornament
        },
        id: tokenID
    };
};

const getMyNFTs = async (ContractNFT, accountAddress, nftAmount) => {
    var myNftIDs = [];
    var myNFTs = [];

    // Get the tokenIDs that the user owns.
    for (var i = 0; i < nftAmount; i++) {
        const nftID = await ContractNFT.methods.get_my_nfts(accountAddress, i).call();
        myNftIDs.push(nftID);
    }

    // Get the struct of these NFTs.
    for (var i = 0; i < myNftIDs.length; i++) {
        const nft = await getNFT(ContractNFT, myNftIDs[i]);
        myNFTs.push(nft);
    }

    return myNFTs;
};

export const loadDappData = async () => {

    await loadWeb3();

    let tiempoInicial = Date.now();
    

    // Contracts
    const ContractST = new Contract(SaverToken.output.abi, SAVER_TOKEN_CONTRACT_ADDRESS);
    const StableCoinContract = new Contract(ERC20.output.abi, STABLE_COIN_CONTRACT_ADDRESS);
    const CDA_Contract = new Contract(ERC20.output.abi, CDA_CONTRACT_ADDRESS);
    const USDT_Contract = new Contract(ERC20.output.abi, USDC_CONTRACT_ADDRESS);
    const SinergyBronzeContract = new Contract(Sinergy.output.abi, SINERGY_BRONZE_CONTRACT_ADDRESS);

    let tiempoFinal = Date.now();

    console.log("Tiempo de carga de contratos: " + ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");


    tiempoInicial = Date.now();
    const addressAccount = await getAccount();

    const chainID = await window.web3.eth.getChainId();

    // Donation Balance
    const donationBalance = await getDonationBalance(addressAccount, ContractST);

    // USDC
    const USDCBalance = await getUSDCbalance(addressAccount, ContractST);

    // Saver
    const saverBalance = await getSaverBalance(addressAccount, ContractST);

    // USDT
    const usdtBalance = await getUSDTbalance(addressAccount, ContractST);

    // CDA
    const cdaBalance = await getCDAbalance(addressAccount, CDA_Contract);

    // Stable Coin Balance
    const stableCoinBalance = await getStableCoinBalance(addressAccount, StableCoinContract);

    // Native Cryptocurrencie
    const nativeCryptoBalance = await getNativeCryptoBalance(addressAccount);

    tiempoFinal = Date.now();

    console.log("Tiempo de carga de billetera y balances: " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    // Reward
    tiempoInicial = Date.now();
    const rewardID = await ContractST.methods.rewardID().call();
    const actualCycle = await getActualCycle(ContractST);

    const futureRewardAmount = await getFutureReward(ContractST);
    const futureAmountToClaim = await getAmountToClaim(ContractST, futureRewardAmount, addressAccount);


    const rewardAmountRaised = await getActualRewardRaised(ContractST);
    const actualRewardAmount = await getActualAmountReward(ContractST);
    const actualAmountToClaim = await getAmountToClaim(ContractST, rewardAmountRaised, addressAccount);


    const bddQualifiedWEI = await ContractST.methods.qualifiedDonationBalance().call();
    const bddQualified = await window.web3.utils.fromWei(bddQualifiedWEI, STABLE_COIN_FORMAT);
    
    tiempoFinal = Date.now();

    console.log("Tiempo de carga de recompensas: " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    // Timestamp
    tiempoInicial = Date.now();
    const timestampOpenReward = await getTimestampToNextReward(ContractST);

    const timestampNow = await getActualTimestamp();
    
    const timer = getHoursToNextReward(timestampNow, timestampOpenReward);

    tiempoFinal = Date.now();

    console.log("Tiempo de carga de timers: " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    // Video
    tiempoInicial = Date.now();
    const {
        videoID, videoURL, firstQuestion, secondQuestion, thirdQuestion,
        firstPossibleAnswers, secondPossibleAnswers, thirdPossibleAnswers,
        lastAnswer, firstRealAnswer, secondRealAnswer, thirdRealAnswer,
        videoSort, lastVideo, canClaimForVideo
    } = await getVideosData(addressAccount, timestampNow, ContractST);
    tiempoFinal = Date.now();

    console.log("Tiempo de carga de video: " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");
    
    tiempoInicial = Date.now();
    let SinergyBronze = await getSinergyData(addressAccount, SinergyBronzeContract, CDA_Contract, ContractST);
    tiempoFinal = Date.now();

    console.log("Tiempo de carga de sinergy: " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    tiempoInicial = Date.now();
    const rewardIDonClaim = await ContractST.methods.rewardIDonClaim().call();
    const alreadyClaim = await ContractST.methods.holderClaimed(addressAccount, rewardIDonClaim).call();
    const userQualified = await ContractST.methods.canReclaim(addressAccount).call();
    const claimFrom = await ContractST.methods.claimFrom(addressAccount).call();
    const canClaimForSavings = await ContractST.methods.qualifiedForSavings(addressAccount).call();
    const canClaimForDonatedPerDay = await ContractST.methods.qualifiedForDonatePerDay(addressAccount).call();
    
    
    tiempoFinal = Date.now();

    console.log("Tiempo de carga de able info: " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    tiempoInicial = Date.now();
    // Purposes
    const personalPurpose = await ContractST.methods.personalPurpose(addressAccount).call();
    const communityPurporse = await ContractST.methods.communityPurpose(addressAccount).call();
    tiempoFinal = Date.now();

    console.log("Tiempo de carga de propositos: " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    tiempoInicial = Date.now();
    // Recover
    const isRecover = await ContractST.methods.isRecover(addressAccount).call();
    const haveToRecover = !isRecover;
    tiempoFinal = Date.now();

    console.log("Tiempo de carga de recover: " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    tiempoInicial = Date.now();
    // Donated per day
    const cycle = await ContractST.methods.cycle().call();
    const donatedLastDayWEI = await ContractST.methods.donatedByDayOf(addressAccount, cycle).call();
    const donatedLastDay = web3.utils.fromWei(donatedLastDayWEI, STABLE_COIN_FORMAT);
    
    tiempoFinal = Date.now();
    
    console.log("Tiempo de carga de donaciones diarias: " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    // const canClaim = ((Number(claimFrom) <= Number(rewardIDonClaim)) && !alreadyClaim && canClaimForDonatedPerDay && canClaimForSavings && lastAnswer && SinergyBronze.amount > 0);
    const canClaim = ( (canClaimForDonatedPerDay || Number(donatedLastDay) >= 1.2) && canClaimForSavings && lastAnswer && SinergyBronze.amount > 0);

    // Saver Reward
    tiempoInicial = Date.now();
    const cycleToSaverReward = await ContractST.methods.cycleToSaverReward(addressAccount).call();
    const daysToClaimSaver = (Number(cycleToSaverReward) < Number(cycle) ? 0 : Number(cycleToSaverReward) - Number(cycle));

    tiempoFinal = Date.now();

    console.log("Tiempo de carga de premio able: " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    // Savings
    tiempoInicial = Date.now();
    const savingLimit = await getLimitsSavings(addressAccount, ContractST);
    const { usdcRecord, usdtRecord, totalRecord } = await getSavingsRecords(addressAccount, ContractST);
    const savingData = await getSavingData(addressAccount, ContractST);

    tiempoFinal = Date.now();

    console.log("Tiempo de carga de ahorros (0.369%): " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    // Resources
    tiempoInicial = Date.now();
    const balanceForDevelopment = await getBalanceCollectionsForDevelopment(ContractST);

    const balanceForProjects = await getBalanceCollectionsForProjects(ContractST);

    tiempoFinal = Date.now();

    console.log("Tiempo de carga de recursos: " +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    // Management Information
    tiempoInicial = Date.now();
    const managementInfo = await ContractST.methods.managementInfo().call();

    tiempoFinal = Date.now();

    console.log("Tiempo de informacion del administrador" +  ((tiempoFinal - tiempoInicial)/1000).toString() + " segundos");

    // Hacer lo mismo para Able.

    const communityWallet = await ContractST.methods.communityWallet().call();
    const managementWallet1 = await ContractST.methods.managementWallet().call();
    const managementWallet2 = await ContractST.methods.managementWallet2().call();
    const devWallet = await ContractST.methods.devWallet().call();

    return {
        donationBalance, USDCBalance, saverBalance,
        rewardAmountRaised, actualRewardAmount, actualAmountToClaim, futureAmountToClaim,
        futureRewardAmount, timestampOpenReward, ContractST, addressAccount,
        timestampNow, alreadyClaim, bddQualified, timer, canClaim, userQualified,
        usdtBalance, chainID, personalPurpose, communityPurporse, haveToRecover, canClaimForSavings,
        canClaimForDonatedPerDay, savingLimit, donatedLastDay, balanceForDevelopment,
        balanceForProjects, usdcRecord, usdtRecord, totalRecord, StableCoinContract, nativeCryptoBalance,
        stableCoinBalance, savingData, actualCycle, videoID, videoURL,
        firstQuestion, secondQuestion, thirdQuestion, firstPossibleAnswers, secondPossibleAnswers, thirdPossibleAnswers,
        lastAnswer, firstRealAnswer, secondRealAnswer, thirdRealAnswer, videoSort, lastVideo, rewardID,
        managementInfo, CDA_Contract, SinergyBronze, USDT_Contract, daysToClaimSaver, canClaimForVideo, cycle,
        communityWallet, managementWallet1, managementWallet2, devWallet, cdaBalance
    };
};

// Esta ya no esta en uso desde v2
export const getDappData = async () => {

    // window.document.getElementById('loadingPercent').innerHTML = "0%";
    await loadWeb3();

    window.document.getElementById('loadingPercent').innerHTML = "5%";

    const ContractST = new Contract(SaverToken.output.abi, SAVER_TOKEN_CONTRACT_ADDRESS);
    const StableCoinContract = new Contract(ERC20.output.abi, STABLE_COIN_CONTRACT_ADDRESS);


    window.document.getElementById('loadingPercent').innerHTML = "8%";

    const addressAccount = await getAccount();

    const chainID = await window.web3.eth.getChainId();

    window.document.getElementById('loadingPercent').innerHTML = "10%";

    // Donation Balance
    const donationBalance = await getDonationBalance(addressAccount, ContractST);

    // USDC
    const USDCBalance = await getUSDCbalance(addressAccount, ContractST);

    // Saver
    const saverBalance = await getSaverBalance(addressAccount, ContractST);

    // USDT
    const usdtBalance = await getUSDTbalance(addressAccount, ContractST);

    window.document.getElementById('loadingPercent').innerHTML = "25%";

    // Reward
    const futureRewardAmount = await getFutureReward(ContractST);
    const futureAmountToClaim = await getAmountToClaim(ContractST, futureRewardAmount, addressAccount);

    window.document.getElementById('loadingPercent').innerHTML = "28%";

    const rewardAmountRaised = await getActualRewardRaised(ContractST);
    const actualRewardAmount = await getActualAmountReward(ContractST);
    const actualAmountToClaim = await getAmountToClaim(ContractST, rewardAmountRaised, addressAccount);

    window.document.getElementById('loadingPercent').innerHTML = "35%";

    const bddQualifiedWEI = await ContractST.methods.qualifiedDonationBalance().call();
    const bddQualified = await window.web3.utils.fromWei(bddQualifiedWEI, STABLE_COIN_FORMAT);

    window.document.getElementById('loadingPercent').innerHTML = "40%";

    const rewardIDonClaim = await ContractST.methods.rewardIDonClaim().call();
    const alreadyClaim = await ContractST.methods.holderClaimed(addressAccount, rewardIDonClaim).call();
    const userQualified = await ContractST.methods.canReclaim(addressAccount).call();
    const claimFrom = await ContractST.methods.claimFrom(addressAccount).call();
    const canClaimForSavings = await ContractST.methods.qualifiedForSavings(addressAccount).call();
    const canClaimForDonatedPerDay = await ContractST.methods.qualifiedForDonatePerDay(addressAccount).call();
    const canClaim = ((Number(claimFrom) <= Number(rewardIDonClaim)) && !alreadyClaim && userQualified && canClaimForDonatedPerDay && canClaimForSavings);

    window.document.getElementById('loadingPercent').innerHTML = "60%";

    // Timestamp
    const timestampOpenReward = await getTimestampToNextReward(ContractST);
    window.document.getElementById('loadingPercent').innerHTML = "70%";

    const timestampNow = await getActualTimestamp();
    window.document.getElementById('loadingPercent').innerHTML = "80%";

    window.document.getElementById('loadingPercent').innerHTML = "90%";

    const timer = getHoursToNextReward(timestampNow, timestampOpenReward);
    // window.document.getElementById('loadingPercent').innerHTML = "100%";

    // Purposes
    const personalPurpose = await ContractST.methods.personalPurpose(addressAccount).call();
    const communityPurporse = await ContractST.methods.communityPurpose(addressAccount).call();

    // Donated per day
    const cycle = await ContractST.methods.cycle().call();
    const donatedLastDayWEI = await ContractST.methods.donatedByDayOf(addressAccount, cycle).call();
    const donatedLastDay = web3.utils.fromWei(donatedLastDayWEI, STABLE_COIN_FORMAT);

    // Saver Reward
    const cycleToSaverReward = await ContractST.methods.cycleToSaverReward(addressAccount).call();
    const daysToClaimSaver = (Number(cycleToSaverReward) < Number(cycle) ? 0 : Number(cycleToSaverReward) - Number(cycle));

    // Savings
    const savingLimit = await getLimitsSavings(addressAccount, ContractST);
    const { usdcRecord, usdtRecord, totalRecord } = await getSavingsRecords(addressAccount, ContractST);

    // Resources
    const balanceForDevelopment = await getBalanceCollectionsForDevelopment(ContractST);
    const balanceForProjects = await getBalanceCollectionsForProjects(ContractST);

    // Recover
    //const isRecover = await ContractST.methods.isRecover(addressAccount).call();
    //const lastAmountBDD = await getDonationBalance(addressAccount, LastContractST);
    //const lastAmountSaver = await getSaverBalance(addressAccount, LastContractST);
    //const haveToRecover = !isRecover &&  ( Number(lastAmountBDD) > 0 ) && (Number(lastAmountSaver) > 0);

    return {
        donationBalance, USDCBalance, saverBalance,
        rewardAmountRaised, actualRewardAmount, actualAmountToClaim, futureAmountToClaim,
        futureRewardAmount, timestampOpenReward, ContractST, addressAccount,
        timestampNow, alreadyClaim, bddQualified, timer, canClaim, userQualified,
        usdtBalance, chainID, personalPurpose, communityPurporse, canClaimForSavings,
        canClaimForDonatedPerDay, savingLimit, donatedLastDay, balanceForDevelopment,
        balanceForProjects, usdcRecord, usdtRecord, totalRecord, StableCoinContract,
        daysToClaimSaver
    };
};

export const getDataWeb3 = async () => {
    // await loadWeb3();

    const ContractST = new Contract(SaverToken.output.abi, SAVER_TOKEN_CONTRACT_ADDRESS);

    // Web3
    const tokensCirculation = await getTotalSupply(ContractST);
    const StableCoinDistribute = await getStableCoinDistribute(ContractST);
    const StableCoinLastDistribute = await getLastStableCoinDistribute(ContractST);
    const SaverPrice = await getSaverPrice();
    const SaverMinted = await getSaverMinted(ContractST);
    const { holders } = await getHolders(ContractST);

    return { tokensCirculation, StableCoinDistribute, holders, StableCoinLastDistribute, SaverPrice, SaverMinted };
};

export const loadWeb3 = async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            // await ethereum.enable();
            // Acccounts now exposed
            await ethereum.request({ method: 'eth_requestAccounts' })
        } catch (error) {
            // User denied account access...
            console.log('Error: requiring browser wallet: ', error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */ });
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

};