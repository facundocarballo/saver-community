import Web3 from 'web3';

// Interfaces to get ABI
import IBaseReward from '../ABI/Rewards/BaseReward.json';
import IValueReward from '../ABI/Rewards/ValueReward.json';
import IConstancyReward from '../ABI/Rewards/ConstancyReward.json';
import IConfidenceReward from '../ABI/Rewards/ConfidenceReward.json';
import IMigrationSale from '../ABI/Migration/MigrationSale.json';
import IMigrationSinergy from '../ABI/Migration/MigrationSinergy.json';
import ISinergyMigrationContract from '../ABI/Migration/Contracts/Sinergy.json';
import IAble from '../ABI/Able.json';
import IAbleMigration from '../ABI/Migration/Contracts/Able.json';
import IClock from '../ABI/Clock.json';
import IERC20 from '../ABI/ERC20.json';
import ISinergy from '../ABI/Sinergy.json';
import ISinergySale from '../ABI/SinergySale.json';
import ITest from '../ABI/Test.json';
import IUser from '../ABI/User.json';
import IOwners from '../ABI/Owners.json';

// Functions
import { getAbleData } from './able';
import { getSinergySaleData } from './able/sale';
import { getSinergyData } from './sinergy';
import { getQualifiedInfo } from './user/qualified';
import { getERC20Info, getNativeCryptoBalance } from './tokens';
import { getHolders, getLastStableCoinDistribute, getSaverMinted, getSaverPrice, getStableCoinDistribute, getTotalSupply } from './publicInfo';
import { GetRecoverState, getMigrationData } from './migration';
import { ClockGetInfo } from './clock';

export const URL_WEB = "https://saver.community";


export const BASE_URL_NFT_IMAGES = "https://ipfs.io/ipfs";
export const CID_NFT_IMAGES = "bafybeiesqizstaqh5iefvu6roxopgk72v33okilo6seux3ykogrzfcdw5q";
export const CID_NFT_JSON = "QmXfyjgJq3PSc69HZxGKH17sGguwQjy6LWdJdvMfYoyqtq";

// Polygon Testnet: 'https://matic.getblock.io/5b466210-c284-40b8-9c7a-5ea4f035a9b2/testnet/';
// Polygon Mainnet: 'https://matic.getblock.io/5b466210-c284-40b8-9c7a-5ea4f035a9b2/mainnet/';
// Moonbase Alpha: 'https://rpc.api.moonbase.moonbeam.network';
// Moonbeam Mainnet: 'https://rpc.api.moonbeam.network';
const BSC_MAINNET_RPC = 'https://rpc.api.moonbeam.network';

export const MAIN_CURRENCY = "BUSD";
export const NATIVE_CRYPTO = "GLMR";

// Polygon Testnet: 80001
// Moonbase Alpha: 1287
// Moonbeam Mainnet: 1284
export const CHAIN_ID = 1284

export const GAS_PRICE = "5";

export const STABLE_COIN_FORMAT = 'ether'; // ('ether' => 18 decimals) | ('mwei' => 6 decimals)

export const VIDEOS_AMOUNT = 3;

export const PERCENT_DAILY_INCREASE = 1.09;

const Contract = require('web3-eth-contract');

Contract.setProvider(BSC_MAINNET_RPC);

/*
    Cuando se cambian los tokens hay que cambiar tambien algun contrato importante, como por ejemplo el Clock (poner el mismo contrato) para que el Router detecte los cambios.
    Luego de eso, hacer un RefreshAll

*/

// Contract Address
export const OWNERS_CONTRACT_ADDRESS = "0xF7Ca5aeb3d2DBC0012f153224e22a1757c8f83F5"; // Addresses Contract.
export const CLOCK_CONTRACT_ADDRESS = "0xDF8109567Ca3f9b5Aca54ffB76e8a783142BcA45"; 
export const USER_CONTRACT_ADDRESS = "0xE2874a3132141BEad0f6CE81910890a623B5f8F6";
export const TEST_CONTRACT_ADDRESS = "0x4c8e26975B9B44637796034A377D42BC276D8b83"; 
export const ABLE_CONTRACT_ADDRESS = "0xA0cB3bB440E98595deA168C56f8e5b06CE9636FC"; 
export const SINERGY_BRONZE_CONTRACT_ADDRESS = "0xe519E164cd1F8D3474289fF4e52C16699EC9ea17";
export const MIGRATION_SINERGY_BRONZE_CONTRACT_ADDRESS = "0x62b97Bb6FF05Df90255b73aD9af063dfd35Dd21D";
export const SINERGY_SALE_CONTRACT_ADDRESS = "0x8849E9BD43c7b525F0EE5e881b815e68E1E86F59";
export const MIGRATION_SINERGY_SALE_CONTRACT_ADDRESS = "0xcbBA637211C34C7F56Fd6bdbD9f7E5b594292305";
export const STABLECOIN_BASE_REWARD_ADDRESS = "0xFcd33fcc4e90ef04652fd1189Ad5945516BfdD18";


export const STABLECOIN_VALUE_REWARD_ADDRESS = "0xd3D4A95d6A6b2a78eEEAB47E82A5F37917EE04b2";
export const ABLE_VALUE_REWARD_ADDRESS = "0x2E98E76EEc7C69e9bbf87857fd099Ee851D4e5c4";

export const STABLECOIN_CONSTANCY_REWARD_ADDRESS = "0x767C3E921272F4F4648435A47C4fF09cb4f3c87f";
export const ABLE_CONSTANCY_REWARD_ADDRESS = "0x0cc78F063F8f4EDEbD174c69bDD7EE0fAaa6BFEb";

export const STABLECOIN_CONFIDENCE_REWARD_ADDRESS = "0xe688784F840486d925B97936b8D1f70509916A07";
export const ABLE_CONFIDENCE_REWARD_ADDRESS = "0xEF29c67496Fac5A9D4E6c5cca67cAEDfed9005b6";

// ------------------------

export const CDA_CONTRACT_ADDRESS = "";
export const TRIPLE_SALE_ADDRESS = "";

// Contract Migration Address
export const ABLE_FIRST_MIGRATION_CONTRACT_ADDRESS = "0xB13D289830F6512dFf4C6ce97f121F29bD400E39"; // Noviembre 2022  
export const ABLE_MIGRATION_CONTRACT_ADDRESS = "0x0b85cCA1814eE40C6E83E3591F3819eC7e87d0A5"; // Abril 2023  
export const SINERGY_BRONZE_FIRST_MIGRATION_ADDRESS = "0xEa063b5A744616a161272a013a626A1cBD80Ee1B"; // Noviembre 2022  
export const SINERGY_BRONZE_MIGRATION_ADDRESS = "0xaeFDeD1Efb9f370F3663493755a1Da0A4E6F17E6"; // Abril 2023  
export const MIGRATION_SINERGY_BRONZE_APRIL_2023 = "0x4559FC7347f1E9CaC47Bf4414ed50197fd00383E"; // Abril 2023
export const SINERGY_SALE_MIGRATION_CONTRACT_ADDRESS = "0x899A11BEC1fC578E75523Cdc079d9CC767884aB4"; // Abril 2023  
export const TRIPLE_MIGRATION_ADDRESS = "0x38e43FCEEE68373e08a30714123010b8d841364d";
export const INITIAL_AMOUNT_NFTS = 1301;

// Polygon Testnet: "0x358cBaa85a38Ab70726e65a0c1986d225210B1EF"
// Polygon Mainnet: "0x1027b66cb2Be166A6ABfB12b9cFBBE7a83911151"
// Moonbase Alpha: "0xEa9f365Bdf33B80b5145ED26D1b92229280DA6D3"
// Moonbeam Mainnet (mios): "0x4E8F5dC8c0f21992116Aac2458b0Bded98E11F13"
// Moonbeam Mainnet: "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b"
// Moonbeam Mainnet whUSDC: 0x931715FEE2d06333043d11F658C8CE934aC61D0c
export const USDC_CONTRACT_ADDRESS = "0x931715FEE2d06333043d11F658C8CE934aC61D0c";

// Polygon Testnet: "0x1989E06A6ae35D3624331107a1a07bE8c9eB579B"
// Polygon Mainnet: "0xc2395378e8EDCEA662DaeEe9Aa3E2804a114DC11"
// Moonbase Alpha: "0x358cBaa85a38Ab70726e65a0c1986d225210B1EF"
// Moonbeam Mainnet (mios): "0xB3E9c83c80120764a5B52D8B41B43895F7c04685"
// Moonbeam Mainnet: "0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73"
// Moonbeam Mainnet WGLMR: "0xAcc15dC74880C9944775448304B263D191c6077F"
export const USDT_CONTRACT_ADDRESS = "0xAcc15dC74880C9944775448304B263D191c6077F";

// Polygon Testnet: "0x76bE64285ddcCB5B45a00B7671cF030dfc009E8B"
// Polygon Mainnet: "0xEa9f365Bdf33B80b5145ED26D1b92229280DA6D3"
// Moonbase Alpha: "0x1027b66cb2Be166A6ABfB12b9cFBBE7a83911151"
// Moonbeam Mainnet (mios): DAI => 0xB856De7DAFf71A0d7eAFD4CC22A7db6F762179de  BUSD => "0x831548ceccf006D865fE88d3F88E0d3b577453F4"
// Moonbeam Mainnet: DAI => "0x765277EebeCA2e31912C9946eAe1021199B39C61" BUSD => "0xA649325Aa7C5093d12D6F98EB4378deAe68CE23F"
export const STABLE_COIN_CONTRACT_ADDRESS = "0xA649325Aa7C5093d12D6F98EB4378deAe68CE23F";

export const COMMUNITY_WALLET = "0xc8895f6f85D870589C42fd6d531c855bddD27B0f";
export const DEVELOPMENT_WALLET = "0x9060723c22dE586c2fA5eFa07A7743F6f4a935f5";

export const FACTORY_ADDRESS = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";

// Load Web3 to show info only
export const loadWeb3Data = async () => {
    window.web3 = new Web3(BSC_MAINNET_RPC);

    const data = await getDataWeb3();

    return data;
};

export const getDataWeb3 = async () => {
    // await loadWeb3();

    const ContractST = new Contract(IAble.output.abi, ABLE_CONTRACT_ADDRESS);
    const StablecoinBaseReward = GetObjContract(IBaseReward.output.abi, STABLECOIN_BASE_REWARD_ADDRESS);
    const StablecoinValueReward = GetObjContract(IValueReward.output.abi, STABLECOIN_VALUE_REWARD_ADDRESS);
    const StablecoinConstancyReward = GetObjContract(IConstancyReward.output.abi, STABLECOIN_CONSTANCY_REWARD_ADDRESS);
    const StablecoinConfidenceReward = GetObjContract(IConfidenceReward.output.abi, STABLECOIN_CONFIDENCE_REWARD_ADDRESS);
    const Clock = GetObjContract(IClock.output.abi, CLOCK_CONTRACT_ADDRESS);

    const cycle = await Clock.contract.methods.cycle().call();

    // Web3
    const tokensCirculation = await getTotalSupply(ContractST);
    const StableCoinDistribute = await getStableCoinDistribute(
        StablecoinBaseReward, 
        StablecoinValueReward,
        StablecoinConstancyReward,
        StablecoinConfidenceReward
    );
    const StableCoinLastDistribute = await getLastStableCoinDistribute(
        StablecoinBaseReward, 
        StablecoinValueReward,
        StablecoinConstancyReward,
        StablecoinConfidenceReward,
        cycle
    );
    const SaverPrice = await getSaverPrice();
    const SaverMinted = await getSaverMinted(ContractST);
    const { holders } = await getHolders(ContractST);

    return {
        tokensCirculation: tokensCirculation,
        stableCoinDistribute: StableCoinDistribute,
        holders: holders,
        stableCoinLastDistribute: StableCoinLastDistribute,
        saverPrice: SaverPrice,
        saverMinted: SaverMinted
    };
};

export const buildTransaciont = async (addressAccount, to, data) => {
    const nonce = await web3.eth.getTransactionCount(addressAccount);
    const estimateGas = await web3.eth.estimateGas({
        from: addressAccount,
        to: to,
        nonce: nonce,
        data: data
    });
    const eth_gas_price = await web3.eth.getGasPrice();
    const gas_price = Math.trunc(Number(eth_gas_price) * 1.5);
    return {
        from: addressAccount,
        to: to,
        gas: web3.utils.toHex(estimateGas),
        gasPrice: web3.utils.toHex(gas_price),
        data: data
    };

}

export const getAccount = async () => {
    window.document.getElementById('loading').innerHTML = "Cargando Billetera...";
    let account = null;
    try {
        account = await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.log("ERROR AL CONECTAR LA BILLETERA");
        window.document.getElementById('loading').innerHTML = "Error al conectar la billetera de Metamask.";
    }
    String(account[0]).replaceAll(' ', '');
    return account[0];
};

export const GetObjContract = (abi, address) => {
    const contract = new Contract(abi, address);

    return {contract, address};
}

export const unixToDate = (timestamp) => {
    const d = new Date(Number(timestamp));
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
}

export const loadBasicData = async () => {

    let start_time = Date.now();

    await loadWeb3();

    window.document.getElementById('loading').innerHTML = "Cargando Contratos...";

    // ERC20 Contracts
    let Able = GetObjContract(IAble.output.abi, ABLE_CONTRACT_ADDRESS);
    let Stablecoin = GetObjContract(IERC20.output.abi, STABLE_COIN_CONTRACT_ADDRESS);
    let Usdc = GetObjContract(IERC20.output.abi, USDC_CONTRACT_ADDRESS);
    let Usdt = GetObjContract(IERC20.output.abi, USDT_CONTRACT_ADDRESS);

    const Owners = GetObjContract(IOwners.output.abi, OWNERS_CONTRACT_ADDRESS);

    // Clock
    const Clock = GetObjContract(IClock.output.abi, CLOCK_CONTRACT_ADDRESS);

    // User
    const User = GetObjContract(IUser.output.abi, USER_CONTRACT_ADDRESS);

    // Test
    const Test = GetObjContract(ITest.output.abi, TEST_CONTRACT_ADDRESS);

    // Sinergy
    const SinergyBronze = GetObjContract(ISinergy.output.abi, SINERGY_BRONZE_CONTRACT_ADDRESS);

    // Sinergy Sale
    let SinergySale = GetObjContract(ISinergySale.output.abi, SINERGY_SALE_CONTRACT_ADDRESS);

    // Value Rewards
    const StablecoinValueReward = GetObjContract(IValueReward.output.abi, STABLECOIN_VALUE_REWARD_ADDRESS);
    const AbleValueReward = GetObjContract(IValueReward.output.abi, ABLE_VALUE_REWARD_ADDRESS);

    // Constancy Rewards
    const StablecoinConstancyReward = GetObjContract(IConstancyReward.output.abi, STABLECOIN_CONSTANCY_REWARD_ADDRESS);
    const AbleConstancyReward = GetObjContract(IConstancyReward.output.abi, ABLE_CONSTANCY_REWARD_ADDRESS);

    // Constancy Rewards
    const StablecoinConfidenceReward= GetObjContract(IConfidenceReward.output.abi, STABLECOIN_CONFIDENCE_REWARD_ADDRESS);
    const AbleConfidenceReward= GetObjContract(IConfidenceReward.output.abi, ABLE_CONFIDENCE_REWARD_ADDRESS);

    // Base Reward
    const StablecoinBaseReward = GetObjContract(IBaseReward.output.abi, STABLECOIN_BASE_REWARD_ADDRESS);
        
    // Migration Contracts
    const MigrationSinergyBronze = GetObjContract(IMigrationSinergy.output.abi, MIGRATION_SINERGY_BRONZE_CONTRACT_ADDRESS);
    const MigrationSinergySale = GetObjContract(IMigrationSale.output.abi, MIGRATION_SINERGY_SALE_CONTRACT_ADDRESS)

    // Previous contracts
    const AbleMigration = GetObjContract(IAbleMigration.output.abi, ABLE_MIGRATION_CONTRACT_ADDRESS); // Abril 2023
    const AbleFirstMigration = GetObjContract(IAbleMigration.output.abi, ABLE_FIRST_MIGRATION_CONTRACT_ADDRESS); // Noviembre 2022
    const SinergyBronzeMigration = GetObjContract(ISinergyMigrationContract.output.abi, SINERGY_BRONZE_MIGRATION_ADDRESS);
    const SinergyBronzeFirstMigration = GetObjContract(ISinergyMigrationContract.output.abi, SINERGY_BRONZE_FIRST_MIGRATION_ADDRESS);
    const TripleMigration = GetObjContract(IERC20.output.abi, TRIPLE_MIGRATION_ADDRESS);

    // Account & ChainID
    const addressAccount = await getAccount();
    const chain_id = await window.web3.eth.getChainId();

    const is_recover_able = await Able.contract.methods.isRecover(addressAccount).call();
    const is_recover_sinergy = await MigrationSinergyBronze.contract.methods.isRecover(addressAccount).call();

    let Migration = null;

    if (!is_recover_able || !is_recover_sinergy) {
        start_time = Date.now();
        window.document.getElementById('loading').innerHTML = "Cargando Migracion...";
        Migration = await getMigrationData(
            Able.contract,
            AbleFirstMigration.contract,
            AbleMigration.contract,
            MigrationSinergyBronze.contract,
            SinergyBronzeMigration.contract,
            TripleMigration.contract, 
            addressAccount,
        );
        end_time = Date.now();
        console.log("Tiempo de carga (migracion): ", ((end_time - start_time) / 1000).toString());
    }

    const Rewards = {
        daily: {
            stablecoin: StablecoinBaseReward
        },
        value: {
            stablecoin: StablecoinValueReward,
            able: AbleValueReward
        },
        constancy: {
            stablecoin: StablecoinConstancyReward,
            able: AbleConstancyReward
        },
        confidence: {
            stablecoin: StablecoinConfidenceReward,
            able: AbleConfidenceReward
        }
    }

    Clock = await ClockGetInfo(Clock);
    
    // Promises
    window.document.getElementById('loading').innerHTML = "Cargando Able...";
    const promise_able = getERC20Info(Able.contract, addressAccount, 'ether', ABLE_CONTRACT_ADDRESS);

    let end_time = Date.now();
    console.log("Tiempo de carga (contratos): ", ((end_time - start_time) / 1000).toString())

    start_time = Date.now();
    const promise_sinergy_sale = getSinergySaleData(
        SinergySale.contract, 
        SINERGY_SALE_CONTRACT_ADDRESS, 
        false,
        addressAccount,
        Clock.cycle,
    );
    end_time = Date.now();
    console.log("Tiempo de carga (Sinergy Sale): ", ((end_time - start_time) / 1000).toString())



    start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando ERC20s...";

    const promise_usdc = getERC20Info(Usdc.contract, addressAccount, 'mwei', USDC_CONTRACT_ADDRESS);
    const promise_usdt = getERC20Info(Usdt.contract, addressAccount, 'ether', USDT_CONTRACT_ADDRESS);
    const promise_stablecoin = getERC20Info(Stablecoin.contract, addressAccount, 'ether', STABLE_COIN_CONTRACT_ADDRESS);

    window.document.getElementById('loading').innerHTML = "Cargando GLMR...";

    const promise_native_crypto_balance = getNativeCryptoBalance(addressAccount);

    end_time = Date.now();
    console.log("Tiempo de carga (tokens): ", ((end_time - start_time) / 1000).toString());

    Able = await promise_able;
    SinergySale = await promise_sinergy_sale;
    Usdc = await promise_usdc;
    Usdt = await promise_usdt;
    Stablecoin = await promise_stablecoin;
    const native_crypto_balance = await promise_native_crypto_balance;

    return {
        addressAccount,
        chain_id,
        SinergyBronze,
        Able,
        Usdc,
        Usdt,
        Stablecoin,
        native_crypto_balance,
        SinergySale,
        SinergyBronzeMigration,
        Rewards,
        Migration,
        MigrationSinergyBronze,
        AbleMigration,
        TripleMigration,
        MigrationSinergySale,
        AbleFirstMigration,
        SinergyBronzeFirstMigration,
        Clock,
        User,
        Test,
        StablecoinBaseReward,
        Owners
    }

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
            console.log('Error: requiring browser addressAccount: ', error);
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


export const cargarPaginaEntrada = async () => {
    await loadWeb3();

    let init = new Date();

    // Contracts
    const ContractAble = new Contract(IAble.output.abi, ABLE_CONTRACT_ADDRESS);

    const ContractStableCoin = new Contract(IERC20.output.abi, STABLE_COIN_CONTRACT_ADDRESS);

    const ContractCDA = new Contract(IERC20.output.abi, CDA_CONTRACT_ADDRESS);

    const ContractUSDC = new Contract(IERC20.output.abi, USDC_CONTRACT_ADDRESS);

    const ContractUSDT = new Contract(IERC20.output.abi, USDT_CONTRACT_ADDRESS);
    const SinergyBronzeContract = new Contract(ISinergy.output.abi, SINERGY_BRONZE_CONTRACT_ADDRESS);

    const addressAccount = await getAccount();
    const chain_id = await window.web3.eth.getChainId();

    const Able = await getAbleData(ContractAble, addressAccount);

    const Qualified = await getQualifiedInfo(ContractAble, addressAccount, Able.cycle);

    const SinergyBronze = await getSinergyData(
        addressAccount, SinergyBronzeContract,
        ContractCDA, ContractAble
    );

    const CDA = await getERC20Info(ContractCDA, addressAccount, 'ether', CDA_CONTRACT_ADDRESS);
    const Usdc = await getERC20Info(ContractUSDC, addressAccount, 'mwei', USDC_CONTRACT_ADDRESS);
    const Usdt = await getERC20Info(ContractUSDT, addressAccount, 'mwei', USDT_CONTRACT_ADDRESS);

    const StableCoin = await getERC20Info(ContractStableCoin, addressAccount, 'ether', STABLE_COIN_CONTRACT_ADDRESS);
    const native_crypto_balance = await getNativeCryptoBalance(addressAccount);
    let final = new Date();

    console.log("Tiempo de carga: ", (final - init));

    return {
        addressAccount: addressAccount,
        chain_id: chain_id,
        Events: null,
        Able: Able,
        SinergyBronze: SinergyBronze,
        Qualified: Qualified,
        CDA: CDA,
        Usdc: Usdc,
        Usdt: Usdt,
        StableCoin: StableCoin,
        native_crypto_balance: native_crypto_balance,
    }
};