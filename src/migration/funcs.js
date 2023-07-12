import Web3 from "web3";
import SaverCommunityInterface from './ABI/SaverCommunity.json';
import SaverFastInterface from './ABI/SaverFast.json';
import SaverAbleInterface from './ABI/SaverAbleInterface.json';
import BDDFInterface from './ABI/BDDF.json';
import ERC20Interface from './ABI/ERC20.json';
import { buildTransaciont, SAVER_TOKEN_CONTRACT_ADDRESS } from "../web3/funcs";

/*
    En este archivo tengo que obtener la informacion necesaria para la migracion
        Primero voy a necesitar la informacion de la BSC
        Segundo voy a necesitar la informacion de xDAI para poder migrar los datos correspondientes
*/

const BSC_MAINNET_RPC = 'https://bsc-dataseed1.binance.org/';
// 'https://rinkeby.infura.io/v3/fbb5f7b0808d450bbae06a7348f5dda8';

const xDAI_RPC = "https://ropsten.infura.io/v3/fbb5f7b0808d450bbae06a7348f5dda8";

const MOONBEAM_RPC = 'https://rpc.ankr.com/moonbeam'; //'https://rpc.api.moonbase.moonbeam.network';

export const LIST_WALLETS = [
    "0x00162e91b69f692657f186fc26b66a64e6e8bada",
    "0x019039376fbcc6e4f991ea9c4f421c6992979d85",
    "0x077598c4fc506cd94c60887e582d26a7d5fa0789",
    "0x06a5374854930dc44459b955012ae2711a37d0b9",
    "0x0aa38bbfe460f86e87ba77ffa4354181f1433049",
    "0x0fa6b9c5f2c265e8cc48aca380c2e5e583b54b5c",
    "0x198a1b46cd597736967a4fa1fc295e24a83fc13f",
    "0x1c9172c7ab94d364cdd2e3ffbbf2c1e53ea91d2f",
    "0x0db42a6fcb5e3975042b990339011f9acb496d00",
    "0x2a486dae06d731e9fd30dc34d0130edeac5fbb57",
    "0x25ede2559478d145925f45e39ca1c4d7786ebb81",
    "0x36ae717ac8a9c0495a29bc32e075523f2df94a5f",
    "0x312cfb81a60c128458add6dac1b1b33263e9ea1d",
    "0x226508578b41224dd8009e3227ea69170a7e2ba1",
    "0x3d35cb5dba4b12ab2aeb1b12517ab8c4ec4ff81f",
    "0x41e4def64b4c7054cf33429e75c2e3fa5acbcbd6",
    "0x42c6437319cb028632ac3203f0a1e208a0b2e774",
    "0x539fda2d15d9267b96458bfe05409ba292c73346",
    "0x6d1101fa3a2ee35d908d90c922f709743fe49847",
    "0x63b598d37b056de3d15f769e88ea25e89d9b8e64",
    "0x72b3b4fb64823c638c3add6321c9d257e211a051",
    "0x4e635cbf562530b924e4516eed2c43c86d0ae8aa",
    "0x780025b06a14250da45a190405c7ba1fd6df686f",
    "0x91a51b8d7a5442e49888e092b0c8dfd41ac3b0a4",
    "0x87f1452169ba1bb467c2862dbef22bfc89d7cea4",
    "0x92d8f5bacb1d8d68a82b3bb9dee305669f76625c",
    "0xa17871b36eaad9ec864928a4d1e3bc4feb2e9eee",
    "0xa2b9da5e71a48c7f3057b1f8b85452480455725d",
    "0x72ba99895e95c5d30906fd6e3e39bb4781e9ff57",
    "0xa45dcbb4cb1581bcfc54909793bb58ba63f4ac82",
    "0xac775ee401a7d012c65ec7e7a29310fc9fb58113",
    "0xa80869ac0efc907b83616dd999e2cd6e90b7d1cf",
    "0xa1cd975814fbc8eb2c8203d6d5c8dcff0314f749",
    "0xc040491da4e18047bf572d2feeedd79ac0938a75",
    "0xc249124560dfd71a8b8929faed0b0884e7ec064c",
    "0xc505583a7618d81eb43663c64d43db232cbc49bf",
    "0xb93e1a1d884d5fdd686a1e1d30183d1366907c10",
    "0xc8895f6f85d870589c42fd6d531c855bddd27b0f",
    "0xc5443ef1b7218666c0e2db2db7d3034dbe799144",
    "0xd07a6a06e26a3bba933402926a87c47e38088408",
    "0xefc0c4d1cc22bdb1ad0bc9848f662d954ed087a9",
    "0xc9b90bb65326f0e66e4157f52e5f8e7a60afa4be",
    "0xf084e180064fe16e73a69d6be15474ff843c1ffb",
    "0xf283829e35def29e216ea380210a9247bd3ddd78",
    "0x004d6259841f5f0b4c2af726e0b2ed80bcc7de2a",
    "0x019039376fbcc6e4f991ea9c4f421c6992979d85",
    "0x06afff6af6d6b3598c20f6bce65060886f78035c",
    "0xfac3f80f41842930f46dad7bf3386f5866c0b7b0",
    "0x077598c4fc506cd94c60887e582d26a7d5fa0789",
    "0x1935dfc53007caf552c7b1da641e1d0017090a8c",
    "0x1759677d01adef8224cadbc9e6a99a64c4d533b0",
    "0x196467142fbd1b452b1fed882620a530068f0858",
    "0x1c9172c7ab94d364cdd2e3ffbbf2c1e53ea91d2f",
    "0x1cf50ef4a3c4b652730ad931b76dbaff886c4b6c",
    "0x28c239608d0894a981fa442c723bc6d119a55e51",
    "0x21d9820716042f8a725d9601c46fd19a387b5beb",
    "0x2f2908c04e3fcf504f645ecf7beb744ffb643d91",
    "0x2a486dae06d731e9fd30dc34d0130edeac5fbb57",
    "0x0fa6b9c5f2c265e8cc48aca380c2e5e583b54b5c",
    "0x36ee71e60b421ad650fb0156f90bb42ab165f7d9",
    "0x3a177945687f477f8e516e24f11a59f4678fbea4",
    "0x3cefccb6a1856a2a8a607ab8df9c4f568192a728",
    "0x312cfb81a60c128458add6dac1b1b33263e9ea1d",
    "0x48a4294eeb52e0682b3e3009093c60af9b928588",
    "0x3fb853394feb775723cae4b65a746c800851972b",
    "0x3e979e2255b66a9860d0ee2c684691cede9f54ec",
    "0x4c3296c49880a0fbf690a4f8e85456d383010096",
    "0x4fc9fd1678915718717c99c12f2507b8c15429d3",
    "0x51a03259c2dc6f4c11f30d27dd05d93cd0322979",
    "0x562434bcc62d07fa8ab6c329253cf2f98cd3fef4",
    "0x5ef5842e2b0d7e48f5a90d65152eeed164bc07ee",
    "0x645eb1dd3bf3f3d39795faad839ebc8bb5f28752",
    "0x6a6115fd304f63bd85d3c6ebab9f1fd71c1f1f18",
    "0x6d1101fa3a2ee35d908d90c922f709743fe49847",
    "0x4e635cbf562530b924e4516eed2c43c86d0ae8aa",
    "0x72ba99895e95c5d30906fd6e3e39bb4781e9ff57",
    "0x732b4023bfed8cc51d46122aee95b2c64940d997",
    "0x7a93149aba4bb382e59b0493ef36c105a77941ce",
    "0x6ab7a7db1b0de16d2c48068463ca2eb84c798227",
    "0x7c70aebf97fffe9f873a9b7aafe50534cccc2aa3",
    "0x8d71c91f6c63a5ff22b45e36a708e6c589eae7e1",
    "0x7704c6b4d9ba0117664e3cdf1c31882ced936009",
    "0x92d8f5bacb1d8d68a82b3bb9dee305669f76625c",
    "0x7b4baa4aa6673e29c2b1410b8d0bda3ef974b26e",
    "0x96658913768aab38a24245f0370ca6272318c3e2",
    "0xa1cd975814fbc8eb2c8203d6d5c8dcff0314f749",
    "0xaccf3ff2c2067e168783070ad231663f51db85cd",
    "0xad0b3e816cdf5c0285bc7f1420d982a5df18e163",
    "0x93a8b7d89785d723121e309c28879afb62889fe6",
    "0xadbd1a82a8c84d06efce1d1691dffc6c27aa5ea4",
    "0xbf27b5e42a644ee6e3e06bc99bbf32f9872f14f5",
    "0xc7a04cf7d2fe0f8979de62e908640069fb22c488",
    "0xc14f22f09d8adb9ee30439ab9290c6749a1ce6a0",
    "0xc4624d90116b5641eb0d94fdce7cc0d72e8ab0f5",
    "0xc8895f6f85d870589c42fd6d531c855bddd27b0f",
    "0xc9b90bb65326f0e66e4157f52e5f8e7a60afa4be",
    "0xcdb3e19ed4799d708510abd3dc6ccf9658d3e78a",
    "0xd20da94dd6ec1373bc510ed0aecb328c759c37fa",
    "0xdf0704dd2de7215874222345dcf6d2dc879de389",
    "0xe203a789726acb264df76d76964cd43a8f5e8b5d",
    "0xe22eaa6a0d59131172a657bb7e6351424b281d46",
    "0xe8c24518461f66066aa506a0a26c87c08cd3effd",
    "0xe2be00ceffcc9bd6225f13950e61bf2c5262ecc8",
    "0xeb121594fd5b03d2cc9134a07a794cea4d012c81",
    "0xddafa69054d206098ee2107e96cd95e0b27b115f",
    "0xec4d2277bc83430d3705e773bdc657349a1c7e0a",
    "0xefc0c4d1cc22bdb1ad0bc9848f662d954ed087a9",
    "0xf0bea9e7a8b6571f4f95acc65e7211dd093042b0",
    "0xf09a37f519cef3b2043c3ffbd5ff3cb61499a94e",
    "0xf2b5a1615174ea8c7479a21314fc05bd0c9fc598",
    "0xf16658029669bfc6c0bfeecf028956ef70fdd308",
    "0xf872cb91745f5b5c809d8c7dc192add1080284d6",
    "0xfac3f80f41842930f46dad7bf3386f5866c0b7b0",
    "0xf283829e35def29e216ea380210a9247bd3ddd78",
    "0xfe9b8455c939a24e9087c9377da0d3a571283c29",
    "0xfb21f4ec8df8d2b4b85b9c52dda7ff17ab63a78b",
    "0xfc182a8d54924d86468ee18ad5c022d500de69fa"
];

export const BSC_CHAIN_ID = 100;

export const GAS_PRICE = "5";

const Contract = require('web3-eth-contract');

Contract.setProvider(BSC_MAINNET_RPC);

// Contract Address
export const SAVER_COMMUNITY_ADDRESS = "0x6a066F3f15a0D685c8B51dC89248A21d1308F63e"; // '0x416d328aD0Af5Eb25803930fCA838179Bad05953'
export const SAVER_FAST_ADDRESS = "0x0cDf9B2d032A046b574944a9bfc68056715C434B"; // '0x1a311671957613B9C0dd4eEF5D988a7552AFf800'
export const BDDF_ADDRESS = "0x37eE608Ed997919A06a481dEB6c3e711443782BF"; // '0xC39ED5D54434652125cDD2de18f7c2B4D640094d'

const getAccount = async () => {
    const account = await ethereum.request({ method: 'eth_coinbase' });

    return account;
};

const getNumberFromWEI = (e) => Number(window.web3.utils.fromWei(e, "ether")).toFixed(2);

export const migrateBDDF = async (amount, addressAccount) => {
    Contract.setProvider(xDAI_RPC);

    const ContractSaverAble = new Contract(SaverAbleInterface.output.abi, SAVER_ABLE_ADDRESS);

    const amountWEI = web3.utils.toWei(amount, 'ether');

    const data = await ContractSaverAble.methods.migrateBDDF(amountWEI).encodeABI();

    const nonce = await web3.eth.getTransactionCount(addressAccount);

    const estimateGas = await web3.eth.estimateGas({
        from: addressAccount,
        nonce: nonce,
        to: SAVER_TOKEN_CONTRACT_ADDRESS,
        data: data
    });

    const params = {
        from: addressAccount,
        to: SAVER_TOKEN_CONTRACT_ADDRESS,
        gas: web3.utils.toHex(estimateGas),
        gasPrice: web3.utils.toHex(web3.utils.toWei(GAS_PRICE, 'gwei')),
        data: data
    };

    ethereum.request({
        method: 'eth_sendTransaction',
        params: [params]
    }).then((res) => {
        console.log("Transaction Hash: ", res);
    })

}

export const migrateToXDAI = async (
    addressAccount,
    donationBalance,
    allDonatesOf,
    balanceOf,
    stableCoinEarned,
    personalPurpose,
    communityPurpose,
    bddfAmount
) => {
    Contract.setProvider(MOONBEAM_RPC);

    const ContractSaverAble = new Contract(SaverAbleInterface.output.abi, SAVER_TOKEN_CONTRACT_ADDRESS);

    const bddfAmountWEI = web3.utils.toWei(bddfAmount, 'ether');

    const data = await ContractSaverAble.methods.migrate(
        donationBalance,
        allDonatesOf,
        stableCoinEarned,
        personalPurpose,
        communityPurpose,
        balanceOf,
        bddfAmountWEI
    ).encodeABI();

    const nonce = await web3.eth.getTransactionCount(addressAccount);

    const estimateGas = await web3.eth.estimateGas({
        from: addressAccount,
        nonce: nonce,
        to: SAVER_TOKEN_CONTRACT_ADDRESS,
        data: data
    });

    const gas_price = await web3.eth.getGasPrice();
    
    const params = {
        from: addressAccount,
        to: SAVER_TOKEN_CONTRACT_ADDRESS,
        gas: web3.utils.toHex(estimateGas),
        gasPrice: web3.utils.toHex(gas_price),
        data: data
    };

    try {
        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [params]
        }).then((res) => {
            console.log("Transaction Hash: ", res);
        })
    } catch (e) {
        console.log("ERROR: ", e);
    }

}

export const getDappData = async (contract, addressAccount) => {

    const donationBalanceWEI = await contract.methods.donationBalance(addressAccount).call();
    const donationBalance = getNumberFromWEI(donationBalanceWEI);

    const balanceOfWEI = await contract.methods.balanceOf(addressAccount).call();
    const balanceOf = getNumberFromWEI(balanceOfWEI);

    const allDonatesOfWEI = await contract.methods.allDonatesOf(addressAccount).call();
    const allDonatesOf = getNumberFromWEI(allDonatesOfWEI);

    const stableCoinEarnedWEI = await contract.methods.stableCoinEarned(addressAccount).call();
    const stableCoinEarned = getNumberFromWEI(stableCoinEarnedWEI);

    const personalPurpose = await contract.methods.personalPurpose(addressAccount).call();
    const communityPurpose = await contract.methods.communityPurpose(addressAccount).call();
    const cyclesOf = await contract.methods.cyclesOf(addressAccount).call();
    const timestampToClaimSaver = await contract.methods.timestampToClaimSaver(addressAccount).call();
    const isListedToClaimSaver = await contract.methods.isListedToClaimSaver(addressAccount).call();

    return {
        donationBalance, balanceOf, allDonatesOf, stableCoinEarned,
        personalPurpose, communityPurpose, cyclesOf, timestampToClaimSaver,
        isListedToClaimSaver
    };
}

export const getDataToMigrate = async () => {
    await loadWeb3();

    const chainID = await window.web3.eth.getChainId();

    const ContractSaverCommunity = new Contract(SaverCommunityInterface.output.abi, SAVER_COMMUNITY_ADDRESS);
    const ContractSaverFast = new Contract(SaverFastInterface.output.abi, SAVER_FAST_ADDRESS);
    const ContractBDDF = new Contract(ERC20Interface.output.abi, BDDF_ADDRESS);

    const addressAccount = await getAccount();

    const bddfAmountWEI = await ContractBDDF.methods.balanceOf(addressAccount).call();
    const bddfAmount = getNumberFromWEI(bddfAmountWEI);

    const communityData = await getDappData(ContractSaverCommunity, addressAccount);
    const fastData = await getDappData(ContractSaverFast, addressAccount);

    return { communityData, fastData, addressAccount, bddfAmount, chainID };
}

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

