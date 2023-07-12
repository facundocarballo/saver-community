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

export const URL_WEB = "https://saver-community-test-moonbeam.web.app";


export const BASE_URL_NFT_IMAGES = "https://ipfs.io/ipfs";
export const CID_NFT_IMAGES = "bafybeiesqizstaqh5iefvu6roxopgk72v33okilo6seux3ykogrzfcdw5q";
export const CID_NFT_JSON = "QmXfyjgJq3PSc69HZxGKH17sGguwQjy6LWdJdvMfYoyqtq";

// Polygon Testnet: 'https://matic.getblock.io/5b466210-c284-40b8-9c7a-5ea4f035a9b2/testnet/';
// Polygon Mainnet: 'https://matic.getblock.io/5b466210-c284-40b8-9c7a-5ea4f035a9b2/mainnet/';
// Moonbase Alpha: 'https://rpc.api.moonbase.moonbeam.network';
// Moonbeam Mainnet: 'https://rpc.api.moonbeam.network';
const BSC_MAINNET_RPC = 'https://rpc.api.moonbeam.network';

export const MAIN_CURRENCY = "DAI";
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
    Contratos del 27-02-2023 (Ciclos de 24 horas)
    ------------------------
    Triple: 0x0A8D35ADCccb06d688973008c42E48Cf48847f2E
    AbleSaver: 0x5A220FC2f7D0cCC7c95c440189ed1c170B6c5b83
    Sinergy: 0xaeFDeD1Efb9f370F3663493755a1Da0A4E6F17E6
    AbleSale: 0x899A11BEC1fC578E75523Cdc079d9CC767884aB4
    TripleSale: 0xd21B7fcBBbbF1860301172b45cAb1993Ee2d235c

    Contratos del 03-03-2023 (Ciclos de 6 Minutos)
    ------------------------
    Triple: 0xE9Fd6d0D992D1735283b14e6bb9A37719C4A8B9C
    AbleSaver: 0x7027b417A3520831eE1BE0f098A21eFF7E1b7F31
    Sinergy: 0xC9048bdBB586740744b0Ec5EE4cc1e9715D4B53D
    AbleSale: 0x5624345142ba110ba037704a1194fbF7266792eC
    TripleSale: 0xbc4E59AE11A28214f84FCc1c9B0535355D408BBf 

    Contratos del 04-03-2023 (Ciclos de 9 Minutos)
    ------------------------
    Triple: 0x2aEfDc58F84D7F290a89BFf403df36b8E0C9EB37
    AbleSaver: 0x3659F9bFb328e8F9245F10a10B95257b6576E2Da
    Sinergy: 0xF2A173145D4c50a3D4551A46B3FC1D776436dCa1
    AbleSale: 0x968E43eDD28Da618cad6694602a9290e6b5b6C19
    TripleSale: 0x9823ca33521175Ef7DA1fC65A3b15a339667A56F 

    Contratos del 06-03-2023 (Ciclos de 9 Minutos)
    ------------------------
    Triple: 0xD115C55cddA3f1992570156a919B28cA3FEfA819
    AbleSaver: 0x6711097d174e264fB73732c9fac5CB8C01fc5619
    Sinergy: 0xb6E444Ebc909031807f9eF98f85D49Ae743C132D
    AbleSale: 0xFBCD33dFe91a8a1794291B9bb65502B8C9AeDD47
    TripleSale: 0x0eC18B2a7ddcAC6038384e95798dc14E8a59A550 

    Contratos del 10-03-2023 (Ciclos de 6 Minutos) (Nuestro Noviembre 2022)
    ------------------------
    Triple: 0x2619619c2b55Ec45EeE4e56A230E7EE4e349c965
    AbleSaver: 0x938afb19da3e8fd3bE6ae0F3F04Be1D5899CBE94
    Sinergy: 0xa1a814B18cf5aC0425C38101B7352376A882d7eB
    AbleSale: 0xFe509A7D37B59015d8e04A9e334A62e0D623E285
    TripleSale: 0xb0e1b02054f5D068f5E33E7E98B9B3e655647518 

    Contratos del 12-03-2023 (Ciclos de 12 Minutos) (Nuestro Abril 2023)
    ------------------------
    Triple: 0x44f652C31c494Efd22D0735390c5F81583d2c1AA
    AbleSaver: 0xA30854221CEDB4E6B62F4F897F23D094b7039E99
    Sinergy: 0x342e28bcE651Cef2fe32Ee677Afb86e8bfEf8Ccb
    AbleSale: 0x2D8a5220330bFb8458e4a16F516f86BEf892699a
    TripleSale: 0x0ba806E15c93a992d91Df55C568ad2Af42a399eF

    Contratos del 15-03-2023 (Ciclos de 12 Minutos => Polygon Testnet)
    ------------------------
    Triple: 0x1e2D1eA28c3A495784F50E091a5ddF4f1A87F484
    AbleSaver: 0x2d11BDb35ca96B9beAa0b27A54A7381384F90D8d
    Sinergy: 0x06c3161CE0379B3248B76f6E6bd8349a3B7d81e8
    AbleSale: 0xAB79A38eb344Aa6Fd4807F628B69651e9f09Db0B
    TripleSale: 0x636D99033Ee071932890d9B94B0517b0A5649c1a

    Contratos del 15-03-2023 (Ciclos de 12 Minutos => Moonbeam Mainnet)
    ------------------------
    Triple: 0x2C7Ae6A3449df8de65aD15eF8960bf765B8e7b02
    AbleSaver: 0xD15506c3Dd6f2d110130d28b9d74bb2ea1ec8BDb
    Sinergy: 0x08e98f3205597c639665D26b78a843416A77dBB0
    AbleSale: 0x31060b3b7814F1e293036d34A82732B1d8f83058
    TripleSale: 0x0E61BaDD50d1497AF9B2ea71390aF88b70b1E9dE

    Contratos del 16-03-2023 (Ciclos de 6 Minutos => Moonbeam Mainnet)
    ------------------------
    Triple: 0x7BEd86CF03F32200EAB466c47488955de3E0564c
    AbleSaver: 0xE0F072BfcAD69a3E176B1Ed4DF58165B683Dc154
    Sinergy: 0x38B68dda392d7DaA20474a935B4c81A562B354c4 // 0x2d8941353f70A550525d58Df310b449faa2a2F77
    AbleSale: 0x1514D04AA28e9118894117b3Af4207337abf3490 // 0xA7022b4eA195FBe157e05fCA9A1E6F0ecdD2C84e
    TripleSale: 0x827b82d675011D572E052F2C34DB019daF1a1aE8 // 0xcdf97d3D956fDD2bCb3a8DC75504011aAf4a02eb

    Contratos del 17-03-2023 (Ciclos de 6 Minutos => Moonbeam Mainnet)
    ------------------------
    Triple: 0x7BEd86CF03F32200EAB466c47488955de3E0564c
    AbleSaver: 0xE0F072BfcAD69a3E176B1Ed4DF58165B683Dc154
    Sinergy: 0xEcFeBb9b4f1c2a4e362dc1604196a0a1D069a268
    AbleSale: 0x2AE3A4c7AF0A4baC3C16B94BFb0C3dAfaA9325b9
    TripleSale: 0xf1f8164Ff04c3bD5A7A7E1dc204200902b475423

    Contratos del 18-03-2023 (Ciclos de 12 Minutos => Moonbeam Mainnet)
    ------------------------
    Triple: 0x8e3153a724aF487Fd11fB4C4cDA508984dEDf3c4
    AbleSaver: 0xd9B9c7A1B42f1ad78D9C3Dd5C7F0381277ddc9Bb
    Sinergy: 0x01b0b0a198Dc182d391fdA142CEb25014b9Ce273
    AbleSale: 0xFD5c75Cee3f0Cb104A5962384c1f6225A80b2B52
    TripleSale: 0xf357A343c9B47053fff0ED176cA738f029e96c5b

    Contratos del 23-03-2023 (Ciclos de 12 Minutos => Moonbeam Mainnet)
    ------------------------
    AbleSaver: 0x080C076CB441aDa31Efa8a446B342E938eac5b63
    Sinergy: 0x71bdD44475D75DDeF3D141b8d77D1C7B6131D5ca
    AbleSale: 0x65D0E662B32f22F4B51A89127FA1CEAb1b1F873c
    BUSD_PassiveReward: 0x87b4e844F571FC785B3b21402318BF4033b9BEda
    BUSD_ConstancyReward: 0xEB143F51D9Ae2a2cAfB4D21d9a70949E3Cb6f32B
    ABLE_PassiveReward: 0x65004C6A362Db4c003694400d22e652222b8E753
    ABLE_ConstancyReward: 0xcF3343Ba30C3E95DE94355F1a61BC7685b9CA2D6

    Contratos del 24-03-2023 (Ciclos de 12 Minutos => Moonbeam Mainnet)
    ------------------------
    AbleSaver: 0xC5197b84e39Df6AE2a20EDd63955aca33EC920BE
    Sinergy: 0xB70a1712D205A858a34499beFDB905Deaf6dD1C1
    AbleSale: 0xacA296a120892B55B1aB820378B0ed605557D40d
    BUSD_PassiveReward: 0x1f62b8B9baE7B0DdA6a5058A3b0EF0E95753b62d
    BUSD_ConstancyReward: 0xA45140D43dB4A6a346F02F418BA1d619569988bE
    ABLE_PassiveReward: 0x7993BE53f31697C62d62A624DBA900Fc5287A219
    ABLE_ConstancyReward: 0xDB304c735F761CC59F6df65e1b9D3F058abb03f2

    Contratos del 31-03-2023 (Ciclos de 6 Minutos => Moonbeam Mainnet)
    ------------------------
    AbleSaver: 0xDeB93B2e3c292e3780c3353E2AD06080aaa6C5d4
    Sinergy: 0x5fF79c81aA43028C58046F0FaefC098bCc80C4D0//0x6D447F02416edC43e21270456EA30B7349C661a6
    AbleSale: 0x1B0a136283368F30b20bc69B14c820A93266a27c
    BUSD_PassiveReward: 0x5b3794a94Bf8006bFb24965f56CD6c693FEEF3dd//0x34972EEBfa2572c110dba96a931700e1518c66F1
    BUSD_ConstancyReward: 0xBde969711fAbe3eA31b1B871Aa84B13A06e9F709//0x7B6Bf72040005d10FF27bb8D384fE10727BCaD8a
    ABLE_PassiveReward: 0xeAd5830626097074D5C0E663344b2c84E7E8f8D9//0x1c7003aEfA40ec6bF9F48608cFdE401E037e5e45
    ABLE_ConstancyReward: 0x4Cd86759cDee712cA0DF9E18be0dC2bcE08BeBFE//0x5289E65582658834F27C3aeC63A37A779Fc5D209

    Contratos del 03-04-2023 (YO SOY EL ADMIN Ciclos de 12 Minutos => Moonbeam Mainnet)
    ------------------------
    AbleSaver: 0xC0F96ED8731978E3A79A8D1c40260b62E1dfbB06
    Sinergy: 0x58dd9B353F091e2bdBA4E5457359e598341bC81F
    AbleSale: 0x9C81d3615b851Fe6b4321858f8A716555865442b
    BUSD_PassiveReward: 0x941e220A0285d0AE814F8ca16B68A80C0250e551
    BUSD_ConstancyReward: 0x78e1370F53C133CC18faD75a2bC4283cdC14Ca75
    ABLE_PassiveReward: 0xA506A403401ed042b39a9422c74507bcB849dFF6
    ABLE_ConstancyReward: 0x17710fa26B3Df174f2074781Cec18D2dE854B4Df

    Contratos del 03-04-2023 (Ciclos de 6 Minutos => Moonbeam Mainnet)
    ------------------------
    AbleSaver: 0xe4376A33BbEE142F24BF1aCf502670D9563BF3b4
    Sinergy: 0x61e7dd8687bFdcbb2ea514E8B371E5F08501d1Eb
    AbleSale: 0xA1973B8D6cfd0d5A9cEc7379dE5D034342cE1f06
    BUSD_PassiveReward: 0x8b7D8368FA6F66143640d8f09306b53f232Bf949
    BUSD_ConstancyReward: 0x0CEdd10E6cfBe748f53EBDfD2c7f393EE31C4c02
    ABLE_PassiveReward: 0x156969834eAb8AAc58EA42358da6DE4Bc4463f61
    ABLE_ConstancyReward: 0x8FFc1A6Bc74A47675F9A66956B4A9782D479eF26

    Contratos del 04-04-2023 (Ciclos de 6 Minutos => Moonbeam Mainnet)
    ------------------------
    AbleSaver: 0x5F1Eae25195163E569784b87a53A1f50daE041f7
    Sinergy: 0xA41b972a939F214CC48Fcaa9fBDcC9D7F96C25A4
    AbleSale: 0x06c5BC1f291B6a82e1D39cf67c9A2a4179214Be5
    BUSD_PassiveReward: 0xB5A186b8f9E99918588296F9305Db3beBaFe2770
    BUSD_ConstancyReward: 0x89ccB0506c684C4837F75B981111a6AD5D586D06
    ABLE_PassiveReward: 0x1caaCa39D7DCE378a161a14A6900fb656DD416d5
    ABLE_ConstancyReward: 0x322674d66185A6f9eBC448ad73b09FAFB755B157

    Contratos del 05-04-2023 (Ciclos de 6 Minutos => Polygon Mainnet)
    ------------------------
    AbleSaver: 0x0a7B43AD3f6688Fb84f3AbD0BEFE1ae8FDAedF66
    Sinergy: 0x1989E06A6ae35D3624331107a1a07bE8c9eB579B
    AbleSale: 0xeDBA1E805978eBEba8FA267490bC2c397De9F300
    BUSD_PassiveReward: 0x721316e3E8cdeAF75ACeb51503E253b7F93d2bA5
    BUSD_ConstancyReward: 0x06c3161CE0379B3248B76f6E6bd8349a3B7d81e8
    ABLE_PassiveReward: 0xAB79A38eb344Aa6Fd4807F628B69651e9f09Db0B
    ABLE_ConstancyReward: 0x636D99033Ee071932890d9B94B0517b0A5649c1a

    Contratos del 06-04-2023 (Ciclos de 6 Minutos => Moonbeam Mainnet)
    ------------------------
    AbleSaver: 0x63307C2A45948DE20C8ab14B358a6E518fAC15BE
    Sinergy: 0x3577AEA7008de0995Fb164d634713953D54A5f3e
    AbleSale: 0xE41987D7409F73912B0697DFA0A145D969c4220D
    BUSD_PassiveReward: 0xb393e6a8dc1F4b712ba809b0D171b39a4B421eFd
    BUSD_ConstancyReward: 0xd0A7a155f8cE76fFF88C04c4e8b3615bB6FEbA60
    ABLE_PassiveReward: 0xAd2FBf0e631Af547239DBe9bF560b6C9086f2E6D
    ABLE_ConstancyReward: 0x34e88D651EC7d39CEc9F000eA6d11859fddf5cfb

    Contratos del 08-04-2023 (Ciclos de 6 Minutos => Moonbeam Mainnet)
    ------------------------
    AbleSaver: 0x5594848BaB3a5aCbE6d3FE54A12BAC149719Cf1E
    Sinergy: 0x022146D99Dc46B824b87C2bDF204EF9B7b34663a
    AbleSale: 0x8f03401BE71867EDe05DBcDFEDce5c71DB298083
    BUSD_PassiveReward: 0x7Dc1253D67E39CA02472A1D24E0bcD152a288c3a
    BUSD_ConstancyReward: 0x9c5B5dF3A9F0200b3F9f4142fc543ef15Bc94DA6
    ABLE_PassiveReward: 0xea58c9Be514D93F44B3Ee1a7dd76e4C5043e51eF
    ABLE_ConstancyReward: 0x5a731557c9898a3BF2904B17cb42213B97564cCc

    Contratos del 11-04-2023 (Ciclos de 6 Minutos => Moonbeam Mainnet)
    ------------------------
    AbleSaver: 0xe6e85DD4ECaD1Cc7164B876F8f2D2607BB91Bece
    Sinergy: 0x02940668e5B595c903F212E662d1E98c56B83B78 | 0x43E3f5d09D7f8e7262F4520bFe540899626fDD26
    AbleSale: 0xaED5bC1d3d23E17aFce7eEf6eC3BBf2Be28Fa86f
    BUSD_PassiveReward: 0x36345e2be1f5738254448D40E62e14F77a236dD1
    BUSD_ConstancyReward: 0x89637a8c72B70D98763D9aD85a93c6484Cce6A62
    ABLE_PassiveReward: 0x834Dd5f82b49C166C8B7D5031E603A196d4127da
    ABLE_ConstancyReward: 0xb8ce9b0557dC94E4ADd0e82635BC568D9B03C1B6

    Contratos del 13-04-2023 (Ciclos de 6 Minutos => Moonbeam Mainnet)
    ------------------------
    AbleSaver: 0x12E79F36Ec9eB4f583068F9863AA285DB0cCcB63
    Sinergy: 0x2fe7D083573b15B2584e162723A6168DD673C1e2
    AbleSale: 0x7fa46675165F0d0Ab1A3bd3FD96AA3eD59167B52
    BUSD_PassiveReward: 0x4F19668690b3501fa2404039436d4f1C14079dB8
    BUSD_ConstancyReward: 0x2B06dD06Cf7cdAB0f8cC39a6F79FD88b20cb2C5D
    ABLE_PassiveReward: 0x72e29bC0cF7E6f2A3FC99890069E857b736F6dE9
    ABLE_ConstancyReward: 0xc32AfBC61e4A2Be096cBe27Fa1072EA7f25Aa79d
    Migration: 0x9fEc50459Ee0412fa3371b010C36693a80fcb508

    Contratos del 14-04-2023 (Ciclos de 6 Minutos => Moonbeam Mainnet)
    ------------------------
    AbleSaver: 0x68627b19b01C497749328e160e17a168D7719956
    Sinergy: 0x508c132EE7cBb4A666E661634F85B59158eaDB4B
    AbleSale: 0xD42058180A985DEe1b52aEAEa5573D069D87Dc94
    BUSD_PassiveReward: 0xb020b9055e3b621825919710Da20C4FA58cd8cFA
    BUSD_ConstancyReward: 0x295c7962F0DB6fA1A7fDc6De35C96F9a29BeAa3a
    ABLE_PassiveReward: 0x277b1A3166C93A64EA7c92a36cb5164EffC2a2e6
    ABLE_ConstancyReward: 0xDA98f704F111c8b2fd1Dd6d117A9354EC4450557
    Migration: 0xfb20A393B5603F7DF1667746D53316389dB8aE9E

    Contratos del 16-04-2023 (OFICIAL)
    ------------------------
    AbleSaver: 0x0b85cCA1814eE40C6E83E3591F3819eC7e87d0A5
    Sinergy: 0xaeFDeD1Efb9f370F3663493755a1Da0A4E6F17E6
    AbleSale: 0x899A11BEC1fC578E75523Cdc079d9CC767884aB4
    BUSD_PassiveReward: 0xd21B7fcBBbbF1860301172b45cAb1993Ee2d235c
    BUSD_ConstancyReward: 0xf242B3065700Cf0e82FcA634c60Df1095F40341C
    ABLE_PassiveReward: 0xcEF32Ad573Ef6db3fC4fEBF82C6f504677d9534d
    ABLE_ConstancyReward: 0x5e086C0D033A065f1aC683c6a7114DF00b235F91
    Migration: 0x4559FC7347f1E9CaC47Bf4414ed50197fd00383E


    Contratos del 10-05-2023 (Ciclos de 6 Minutos => Moonbeam Mainnet)
    ------------------------
    Clock: 0xbc4E59AE11A28214f84FCc1c9B0535355D408BBf
    User: 0xb48E4bbE89bD0276343726b0f8A162be1BCB411c
    Test: 0x0fD26833Bb122baf3b5982D4E68BAaBb16980791
    Able: 0xc62D16e508163cE73Cbc4c8A6dD23293A5966c1E
    Sinergy: 0x7087254bC21D5CA5c26089cA787CAD728ea62C83
    Sinergy Migration: 0x935e0FBaEdA443928062Bbadf4F101357Ff16765
    Sinergy Sale: 0x258eC126779278Ff594a78E856B2aA5Ae8BC16aE
    Sinergy Sale Migration: 0x43FA02B1cF2B70922D8Bc7ABd76330B2FF54b260
    Base Reward: 0x1Ef4ee71e66ED79C2a421926D27c2F88b375D886
    Value Reward Stablecoin: 0xbEE331fF26942D8556d3EE07Fe611Dd4086b5260
    Value Reward Able: 0x03B1a450ecE6a8443bf6B48370918e432ad438D0
    Constancy Reward Stablecoin: 0x24D530cECA4C555f3a8A97AB7674A365a2FcccD0
    Constancy Reward Able: 0x389695704135FAaFDbe75bFa65FCf95e1bC1234a
    Confidence Reward Stablecoin: 0xb9b98612D1C652b9ca54B2d68ce5EAfFF692e24F
    Confidence Reward Able: 0x7bCcdDF229BA8EC6F53a97a9834F97bF2C94DBB4

    Contratos del 18-05-2023 (Ciclos de 6 Minutos => Moonbeam Testnet)
    ------------------------
    Owner: 0x69410e4E45439881EF69a486F566122FE26CDCd5
    Clock: 0x0B1Ffdd979c530ACaf4d0ef6744C03eebd2617Cf
    User: 0xa80132f7AD5a4Ad6dA91BdB2f29C9c38Fc8B16F1
    Test: 0x1D8427ebb299b2c6Fc3eD6e3ACd26e5C144C9847
    Able: 0xC97DCbDFBa408b7b532Df4C5209f64A70c4dD393
    Sinergy: 0x7516dccD2aD588C0f15eb4DEb67807Ab36a4f36F
    Sinergy Migration: 0x493aB069CC7a764bDd0C5C92CAa2cCCdd0a5E559
    Sinergy Sale: 0xF67071BD33d7d95B179452F1754112F1Dfd6bE67
    Sinergy Sale Migration: 0xC6b2F6990fb1E7C7a53f97723ceA9eF242EC82b5
    Base Reward: 0x66D250ad832Be184F71496771b2699a7404b9B97
    Value Reward Stablecoin: 0x6f83E524FE54Eff302F15b049021343Cd29eE90e
    Value Reward Able: 0x3805e3fCdb8a58BE17927D94B37a779215e3f064
    Constancy Reward Stablecoin: 0x6388b11959Ca2F75Ac3E3F0D979A1D0f65F8F528
    Constancy Reward Able: 0x76Fb9D6f3d02f314718dAF892E82b3239D9fD3EB
    Confidence Reward Stablecoin: 0x2e608eBC98cD88Ee8B24798c539427d15CA343aa
    Confidence Reward Able: 0xecC26a738Ff45130B88B2eD16a9E6e758e59EaeF

    Contratos de prueba oficiales (Moonbeam Testnet)
    ------------------------
    Owner: 0xfd5cc7c77B45B2C0DA2E4FB37615ac0D948fbD51
    Clock: 0x6549F7B3aef1A5d62bAC0Ce16063b0E4F25698a5
    User: 0xc3dFd2a2d5f22E4D009f60a0c1DB71eB9532D368
    Test: 0x3c10E074201902a8A994BB0a9046a1c4f2E2C448
    Able: 0x87AE937696eF921f410f116EfbEd71325F2F593C
    Sinergy: 0x30C3E84a5C691C9458403f817ECDF32e616A1EcE
    Sinergy Migration: 0xfB2260B1D01FB02EF0bd0B94296817250Ac31573
    Sinergy Sale: 0x2FD90e89479833E7F8baEcfD9386A708d2FB2B03
    Sinergy Sale Migration: 0x6E2507A51a5f050c085cB244645d89e5eDc05541
    Base Reward: 0xe29b6738cc8E34EB7Cbf25a5ea246bBA2407cDbA
    Value Reward Stablecoin: 0x51EebD7337C9F1fe630c48e8F9fFe7536FabD0DA
    Value Reward Able: 0x861474b1064d9C20E5510A54a862416D5b56e601
    Constancy Reward Stablecoin: 0x40140218342d8e688F6Da8f79b74ba6C6102F6E4
    Constancy Reward Able: 0x2A8f874E4E68549cD64633DD4D64374e0743E73e
    Confidence Reward Stablecoin: 0xf991C16B7faC7Dd0597b434bF8a4D81E299C68e8
    Confidence Reward Able: 0x5c2f2B561Ce3C6F5AFC7D465dd4274e647E31908

    Contratos del 22-06-2023 prueba oficiales (Moonbeam Mainnet)
    ------------------------
    Owner: 0x0eC18B2a7ddcAC6038384e95798dc14E8a59A550
    Clock: 0xCDC4A8b984F555c6F63c8162795E7F9406B7EB8c
    User: 0x68680328Cf658a266d71647A924533f733FebfF2
    Test: 0x02aA97f6EBA1764a7Be878d20410b61ae2f10AeF
    Able: 0x97C27D5C707E5a46722000a0AAddfbD0aE4a4430
    Sinergy: 0xbe806cbE3b1Fd1FF493C58750E674DBA7620Fa88
    Sinergy Migration: 0x938afb19da3e8fd3bE6ae0F3F04Be1D5899CBE94
    Sinergy Sale: 0xa1a814B18cf5aC0425C38101B7352376A882d7eB
    Sinergy Sale Migration: 0xb0e1b02054f5D068f5E33E7E98B9B3e655647518
    Base Reward: 0xdf59c0bA384003F75aFaD3DBc3700b236cd5948a
    Value Reward Stablecoin: 0x030A5eBD10413366f2FACF7830A3445191C3cd31
    Value Reward Able: 0xea721Be53B8EBE3a3b5b8a829DD0aE06203361A5
    Constancy Reward Stablecoin: 0x139cD418200f1E03d2B209c4e4fcb3ba9A3e01Ac
    Constancy Reward Able: 0x029D9E32D21779e8CdE2E81e30D26168F905efC8
    Confidence Reward Stablecoin: 0x60E35622a6F0A2260Aa368CC591cA32AE415196B
    Confidence Reward Able: 0x666f85Ab486BDbd489610886c676aCFDCDDb75a6

*/

// Contract Address
// Las direcciones comentadas son de la testnet
// 0x0eC18B2a7ddcAC6038384e95798dc14E8a59A550 
export const OWNERS_CONTRACT_ADDRESS = "0x98ded051014551057Db47Ea39bc8c36d8890Ef38"; // Addresses Contract.
export const CLOCK_CONTRACT_ADDRESS = "0xCDC4A8b984F555c6F63c8162795E7F9406B7EB8c"; //  0x89238a266ebA457132f48D2f9874C8BD16E32325 
export const USER_CONTRACT_ADDRESS = "0x68680328Cf658a266d71647A924533f733FebfF2"; //  0xB0DBf8b55b28725E94d8a7493e2Df8d42202bC26
export const TEST_CONTRACT_ADDRESS = "0x02aA97f6EBA1764a7Be878d20410b61ae2f10AeF"; // 
export const ABLE_CONTRACT_ADDRESS = "0x97C27D5C707E5a46722000a0AAddfbD0aE4a4430"; // 0xd8820EED4B4A3cA5f5Bb423cb19001061D889763
export const SINERGY_BRONZE_CONTRACT_ADDRESS = "0x0b9097D99516E150e2a2F2FfC85939B5c9f9E756" //"0x67c181D1951e03738711CcD19e6BD5Cdc3AB79F2" -> Este contrato tiene el arbol que arme en el video. 
export const MIGRATION_SINERGY_BRONZE_CONTRACT_ADDRESS = "0x14FdB2E53D7a5B514997c45f026a1203291F4767"; //"0x938afb19da3e8fd3bE6ae0F3F04Be1D5899CBE94"; // 
export const SINERGY_SALE_CONTRACT_ADDRESS = "0x3a027DC2B67A643B31E8fAaDF8f44B997231dE8f"; // 0x32e0f4a5EbdF72207927136B1009a3243d272E4D
export const MIGRATION_SINERGY_SALE_CONTRACT_ADDRESS = "0x758Cc8E3781e86e012fA43fBF1D0240Bc7D692A3"; // 
export const STABLECOIN_BASE_REWARD_ADDRESS = "0xdf59c0bA384003F75aFaD3DBc3700b236cd5948a"; // 


export const STABLECOIN_VALUE_REWARD_ADDRESS = "0x030A5eBD10413366f2FACF7830A3445191C3cd31"; // 
export const ABLE_VALUE_REWARD_ADDRESS = "0xea721Be53B8EBE3a3b5b8a829DD0aE06203361A5"; // 0x65cF46Ca162Dd1635cd68a71afBE9CC58192AD3c

export const STABLECOIN_CONSTANCY_REWARD_ADDRESS = "0x139cD418200f1E03d2B209c4e4fcb3ba9A3e01Ac"; // 
export const ABLE_CONSTANCY_REWARD_ADDRESS = "0x029D9E32D21779e8CdE2E81e30D26168F905efC8"; // 0x37EEaA95eEa44460CeBF667E690bC00bB5F7583e

export const STABLECOIN_CONFIDENCE_REWARD_ADDRESS = "0x60E35622a6F0A2260Aa368CC591cA32AE415196B"; // 
export const ABLE_CONFIDENCE_REWARD_ADDRESS = "0x666f85Ab486BDbd489610886c676aCFDCDDb75a6"; // 0x4F531401d80cdDf9cF29058c8Df330625eA4b8Bc

// ------------------------

export const CDA_CONTRACT_ADDRESS = "";
export const TRIPLE_SALE_ADDRESS = "";

// Contract Migration Address
export const ABLE_FIRST_MIGRATION_CONTRACT_ADDRESS = "0xB13D289830F6512dFf4C6ce97f121F29bD400E39"; // Noviembre 2022  0x938afb19da3e8fd3bE6ae0F3F04Be1D5899CBE94
export const ABLE_MIGRATION_CONTRACT_ADDRESS = "0x0b85cCA1814eE40C6E83E3591F3819eC7e87d0A5"; // Abril 2023  0xA30854221CEDB4E6B62F4F897F23D094b7039E99
export const SINERGY_BRONZE_FIRST_MIGRATION_ADDRESS = "0xEa063b5A744616a161272a013a626A1cBD80Ee1B"; // Noviembre 2022  0xa1a814B18cf5aC0425C38101B7352376A882d7eB
export const SINERGY_BRONZE_MIGRATION_ADDRESS = "0xaeFDeD1Efb9f370F3663493755a1Da0A4E6F17E6"; // Abril 2023  0x342e28bcE651Cef2fe32Ee677Afb86e8bfEf8Ccb
export const MIGRATION_SINERGY_BRONZE_APRIL_2023 = "0x4559FC7347f1E9CaC47Bf4414ed50197fd00383E"; // Abril 2023
export const SINERGY_SALE_MIGRATION_CONTRACT_ADDRESS = "0x899A11BEC1fC578E75523Cdc079d9CC767884aB4"; // Abril 2023  0x6dc8aF36B556c31F12De4c37101787494b5D024a
export const TRIPLE_MIGRATION_ADDRESS = "0x38e43FCEEE68373e08a30714123010b8d841364d"; //""; 0xE9Fd6d0D992D1735283b14e6bb9A37719C4A8B9C
export const INITIAL_AMOUNT_NFTS = 1301;

// Polygon Testnet: "0x358cBaa85a38Ab70726e65a0c1986d225210B1EF"
// Polygon Mainnet: "0x1027b66cb2Be166A6ABfB12b9cFBBE7a83911151"
// Moonbase Alpha: "0xEa9f365Bdf33B80b5145ED26D1b92229280DA6D3"
// Moonbeam Mainnet (mios): "0x4E8F5dC8c0f21992116Aac2458b0Bded98E11F13"
// Moonbeam Mainnet: "0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b"
export const USDC_CONTRACT_ADDRESS = "0x4E8F5dC8c0f21992116Aac2458b0Bded98E11F13";

// Polygon Testnet: "0x1989E06A6ae35D3624331107a1a07bE8c9eB579B"
// Polygon Mainnet: "0xc2395378e8EDCEA662DaeEe9Aa3E2804a114DC11"
// Moonbase Alpha: "0x358cBaa85a38Ab70726e65a0c1986d225210B1EF"
// Moonbeam Mainnet (mios): "0xB3E9c83c80120764a5B52D8B41B43895F7c04685"
// Moonbeam Mainnet: "0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73"
export const USDT_CONTRACT_ADDRESS = "0xB3E9c83c80120764a5B52D8B41B43895F7c04685";

// Polygon Testnet: "0x76bE64285ddcCB5B45a00B7671cF030dfc009E8B"
// Polygon Mainnet: "0xEa9f365Bdf33B80b5145ED26D1b92229280DA6D3"
// Moonbase Alpha: "0x1027b66cb2Be166A6ABfB12b9cFBBE7a83911151"
// Moonbeam Mainnet (mios): DAI => 0xB856De7DAFf71A0d7eAFD4CC22A7db6F762179de  BUSD => "0x831548ceccf006D865fE88d3F88E0d3b577453F4"
// Moonbeam Mainnet: "0x765277EebeCA2e31912C9946eAe1021199B39C61"
export const STABLE_COIN_CONTRACT_ADDRESS = "0xB856De7DAFf71A0d7eAFD4CC22A7db6F762179de";

export const COMMUNITY_WALLET = "0xc8895f6f85D870589C42fd6d531c855bddD27B0f";// "0xA7Fb84F82FF48fc0b55fD94363CF7048a5cFD7EB";
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
    const promise_usdt = getERC20Info(Usdt.contract, addressAccount, 'mwei', USDT_CONTRACT_ADDRESS);
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