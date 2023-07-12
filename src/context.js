import React from "react";
import {
    MAIN_CURRENCY,
    loadBasicData,
    STABLE_COIN_CONTRACT_ADDRESS,
    SAVER_TOKEN_CONTRACT_ADDRESS,
    ABLE_SALE_ADDRESS,
} from "./web3/funcs";
import {
    AbleGetAbleRewardInfo,
    AbleGetPointsInfo,
    getAbleData,
    getAbleData_AfterAbleReward,
    getAbleData_AfterBuyCDA,
    getAbleData_AfterChangePorpouses,
    getAbleData_AfterMigrate,
    getAbleData_AfterReward,
    getAbleData_AfterVideoTest,
} from "./web3/funcs/able";
import { getSinergySaleData, getSinergySaleData_AfterBuyAble } from "./web3/funcs/able/sale";
import { getAbleCloseCyclesEventsInfo, getAbleCyclesChangesEventsInfo, getAbleEventsInfo, getAblePointsEventsInfo, getAbleRewardEventsInfo, getAbleSaleEventsInfo, getAbleStableCoinRewardEventsInfo, getAbleUpdatesEventsInfo, getAbleUserQualificationEventsInfo, getAbleVideoEventsInfo, getEventsInfo, getSinergyEventsInfo, getUsdcEventsInfo } from "./web3/funcs/events";
import {
    getSinergyBronzeData,
    getSinergyBronzeData_AfterBuyNFT,
    getSinergyBronzeData_AfterChooseFavouriteNFT,
    getSinergyBronzeData_AfterMigrate,
    getSinergyBronzeData_AfterModifyNFT,
    getSinergyBronzeData_AfterReward,
    getSinergyBronzeData_ForAble,
    getSinergyBronzeData_FirstReference,
    getSinergyBronzeData_SecondReference,
    getSinergyBronzeData_ThirdReference,
    getSinergyBronzeData_FourReference,
    getSinergyBronzeData_FiveReference,
    getSinergyBronzeData_SixReference,
    getSinergyBronzeData_SevenReference,
    getSinergyBronzeData_EightReference,
    getSinergyBronzeData_NineReference,
    getSinergyBronzeData_AfterMigrateLevel
} from "./web3/funcs/sinergy";
import { getSinergyBronze_AfterSell } from "./web3/funcs/sinergy/nft";
import { getERC20Info } from "./web3/funcs/tokens";
import {
    getHistoryQualified,
    getQualifiedInfo,
    getQualifiedInfo_AfterAbleReward,
    getQualifiedInfo_AfterBuyCDA,
    getQualifiedInfo_AfterBuyNFT,
    getQualifiedInfo_AfterReward,
    getQualifiedInfo_AfterVideoTest,
    getQualifiedInfo_ForSinergySilver
} from "./web3/funcs/user/qualified";
import {
    getRecoverInfo
} from './web3/funcs/sinergy/recover';
import { getVideosData } from "./web3/funcs/able/video";
import { getActualTimestamp, getRewardInfo as getAbleRewardsInfo } from "./web3/funcs/able/reward";
import { getRewardInfo as getSinergyRewardsInfo } from "./web3/funcs/sinergy/reward";
import { getAbleEvents } from "./web3/funcs/events/able";
import { ClockGetInfo } from "./web3/funcs/clock";
import { UserGetData, UserGetHistoryQualified } from './web3/funcs/user';
import { TestGetData, TestGetVideo } from './web3/funcs/test';
import { AbleGetData } from "./web3/funcs/able";
import { RewardGetData } from './web3/funcs/reward';
import { RewardSinergyGetData } from './web3/funcs/reward/sinergy';
import { AdminGetAbleInfo } from './web3/funcs/admin/able';
import { AdminGetSinergyInfo } from './web3/funcs/admin/sinergy';
import { AdminGetSinergySaleInfo } from './web3/funcs/admin/SinergySale';
import { AdminGetTestInfo } from './web3/funcs/admin/test';
import { AdminGetUserInfo } from './web3/funcs/admin/user';
import { AdminGetOwnersInfo } from './web3/funcs/admin/owners';
import { AdminGetRewardInfo } from './web3/funcs/admin/reward';
import { AdminGetClockInfo } from './web3/funcs/admin/clock';
import { GetMinAmountToIncreasePoints } from "./web3/funcs/auxs/sinergy-sale";

const SaverContext = React.createContext(null);

export const SaverProvider = (props) => {

    // Info Page
    const [saverCirculation, setSaverCirculation] = React.useState(null);
    const [saverHolders, setSaverHolders] = React.useState(null);
    const [stableCoinDistribute, setStableCoinDistributed] = React.useState(null);
    const [lastStableCoinDistribute, setLastStableCoinDistribute] = React.useState(null);
    const [saverPrice, setSaverPrice] = React.useState(null);
    const [saverMinted, setSaverMinted] = React.useState(null);

    // NUEVO 18-10-2022
    const [addressAccount, setAddressAccount] = React.useState(null);
    const [chainID, setChainID] = React.useState(null);
    const [theCycle, setTheCycle] = React.useState(null);
    const [showChangeCycle, setShowChangeCycle] = React.useState(false);
    const [Qualified, setQualified] = React.useState(null);
    const [USDC, setUSDC] = React.useState(null);
    const [USDT, setUSDT] = React.useState(null);
    const [StableCoin, setStableCoin] = React.useState(null);
    const [nativeCryptoBalance, setNativeCryptoBalance] = React.useState(null);
    const [Events, setEvents] = React.useState(null);
    const [Rewards, setRewards] = React.useState(null);
    const [videoTest, setVideoTest] = React.useState(false);
    const [showTermsConditions, setShowTermsConditions] = React.useState(false);
    const [migrationData, setMigrationData] = React.useState(null);
    const [showSinergyRewards, setShowSinergyRewards] = React.useState(false);
    const [showAbleSaleList, setShowAbleSaleList] = React.useState(false);
    const [showAbleRewards, setShowAbleRewards] = React.useState(false);

    // Contracts
    const [Owners, setOwners] = React.useState(null);
    const [Clock, setClock] = React.useState(null);
    const [User, setUser] = React.useState(null);
    const [Able, setAble] = React.useState(null);
    const [SinergyBronze, setSinergyBronze] = React.useState(null);
    const [MigrationSinergyBronze, setMigrationSinergyBronze] = React.useState(null);
    const [Test, setTest] = React.useState(null);
    const [AbleSale, setAbleSale] = React.useState(null);
    const [MigrationSinergySale, setMigrationSinergySale] = React.useState(null);
    const [MigrationFirstSinergyBronze, setMigrationFirstSinergyBronze] = React.useState(null);
    const [BaseReward, setBaseReward] = React.useState(null);
    const [ValueReward, setValueReward] = React.useState(null)
    const [ConstancyReward, setConstancyReward] = React.useState(null);
    const [ConfidenceReward, setConfidenceReward] = React.useState(null);
    const [ValueRewardAdminLoad, setValueRewardAdminLoad] = React.useState(false);

    // Previous Contracts
    const [AbleMigration, setAbleMigration] = React.useState(null);
    const [AbleFirstMigration, setAbleFirstMigration] = React.useState(null);
    const [SinergyBronzeMigration, setSinergyBronzeMigration] = React.useState(null);
    const [SinergyBronzeFirstMigration, setSinergyBronzeFirstMigration] = React.useState(null);
    const [Triple, setTriple] = React.useState(null);

    const [min_amount_to_increase_points, setMinAmountToIncreasePoints] = React.useState(null);


    // Funcion necesaria para la visualizacion de los botes en el Admin.
    const canClaim = () => User.qualified.sinergy &&
        User.qualified.able &&
        User.qualified.usdc &&
        User.qualified.usdt &&
        User.qualified.points &&
        User.qualified.increase_points &&
        User.qualified.test;


    const setBasicData = (data) => {
        setAddressAccount(data.addressAccount);
        setChainID(data.chain_id);
        setAble(data.Able);
        setAbleSale(data.SinergySale);
        setSinergyBronze(data.SinergyBronze);
        setUSDC(data.Usdc);
        setUSDT(data.Usdt);
        setStableCoin(data.Stablecoin);
        setNativeCryptoBalance(data.native_crypto_balance);
        setSinergyBronzeMigration(data.SinergyBronzeMigration);
        setRewards(data.Rewards);
        setMigrationData(data.Migration);
        setAbleMigration(data.AbleMigration);
        setTriple(data.TripleMigration);
        setMigrationSinergySale(data.MigrationSinergySale);
        setAbleFirstMigration(data.AbleFirstMigration);
        setSinergyBronzeFirstMigration(data.SinergyBronzeFirstMigration);
        setTest(data.Test);
        setClock(data.Clock);
        setUser(data.User);
        setMigrationSinergyBronze(data.MigrationSinergyBronze);
        setMigrationFirstSinergyBronze(data.MigrationFirstSinergyBronze);
        setValueReward(data.Rewards.value);
        setConstancyReward(data.Rewards.constancy);
        setConfidenceReward(data.Rewards.confidence);
        setOwners(data.Owners)
    };

    const handleCycle = (number) => {
        if (theCycle == null) {
            setTheCycle(number);
            return;
        }

        if (theCycle != number) {
            setShowChangeCycle(true);
            setTheCycle(number);
        }
    };

    // Necesito solamente 4 funciones principales:
    // 1- Cargar Able (Actualizado)
    const loadAble = async () => {

        if (Able == null) {
            const basicData = await loadBasicData();
            const user = await UserGetData(
                basicData.User,
                basicData.Clock.cycle,
                basicData.addressAccount
            );
            const test = await TestGetData(
                basicData.Test,
                basicData.addressAccount,
                basicData.Clock.cycle
            );
            const able = await AbleGetData(
                basicData.Able,
                basicData.addressAccount,
                basicData.Clock.cycle
            );
            const sinergy_bronze = await getSinergyBronzeData_ForAble(
                basicData.addressAccount,
                basicData.SinergyBronze.contract,
                basicData.MigrationSinergyBronze.contract
            );
            const base_reward = await RewardGetData(
                basicData.Rewards.daily.stablecoin,
                basicData.addressAccount,
                basicData.Clock.cycle
            );
            setMinAmountToIncreasePoints(GetMinAmountToIncreasePoints(
                able.points.points_of,
                user.last_points,
                user.qualified.PERCENT_DAILY_INCREASE
            ));
            setBasicData(basicData);
            setUser(user);
            setTest(test);
            setAble(able);
            setSinergyBronze(sinergy_bronze);
            setBaseReward(base_reward);
            handleCycle(basicData.Clock.cycle);

            return;
        }
        const Clock = await ClockGetInfo(Clock);
        const user = await UserGetData(
            User,
            Clock.cycle,
            addressAccount
        );
        const Able = await getAbleData(Able.contract, addressAccount);

        setMinAmountToIncreasePoints(GetMinAmountToIncreasePoints(
            Able.points.points_of,
            user.last_points,
            user.qualified.PERCENT_DAILY_INCREASE
        ));

        setShowAbleRewards(false);

        setClock(Clock);
        setUser(user);
        setAble(Able);
        handleCycle(Clock.cycle);
    }
    // 2- Cargar Bronze (Actualizado)
    const loadSinergyBronze = async () => {
        if (Able == null) {
            const basicData = await loadBasicData();
            const able = await AbleGetData(
                basicData.Able,
                basicData.addressAccount,
                basicData.Clock.cycle
            );
            const data = await getSinergyBronzeData(
                basicData.addressAccount,
                basicData.SinergyBronze.contract,
                basicData.Able.contract,
                basicData.SinergySale.contract,
                basicData.MigrationSinergyBronze.contract,
                basicData.SinergyBronzeMigration.contract
            );


            setBasicData(basicData);
            setSinergyBronze(data);
            setAble(able);

            return;
        }

        const data = await getSinergyBronzeData(
            addressAccount,
            SinergyBronze.contract,
            Able.contract,
            AbleSale.contract,
            MigrationSinergyBronze.contract,
            SinergyBronzeMigration.contract
        );

        const clock = await ClockGetInfo(Clock);
        const user = await UserGetData(User, clock.cycle, addressAccount);

        setSinergyBronze(data);
        setUser(user);
        setClock(Clock);
        handleCycle(clock.cycle);

    };

    // 3- Cargar Pagina Privada de NFT (Mi arbol) (Actualizado)
    const loadSinergyBronze_OwnerNFT = async () => {
        if (Able == null) {
            const basicData = await loadBasicData();
            const able = await AbleGetData(basicData.Able, basicData.addressAccount, basicData.Clock.cycle);
            const data = await getSinergyBronzeData(
                basicData.addressAccount,
                basicData.SinergyBronze.contract,
                basicData.Able.contract,
                basicData.SinergySale.contract,
                basicData.MigrationSinergyBronze.contract,
                basicData.SinergyBronzeMigration.contract
            );

            const user = await UserGetData(
                basicData.User,
                basicData.Clock.cycle,
                basicData.addressAccount
            );

            const value = await RewardGetData(
                basicData.Rewards.value.stablecoin,
                basicData.addressAccount,
                basicData.Clock.cycle
            );

            const confidence = await RewardGetData(
                basicData.Rewards.confidence.stablecoin,
                basicData.addressAccount,
                basicData.Clock.cycle
            );

            const constancy = await RewardGetData(
                basicData.Rewards.constancy.stablecoin,
                basicData.addressAccount,
                basicData.Clock.cycle
            );

            setBasicData(basicData);
            setUser(user);
            setSinergyBronze(data);
            setAble(able);
            handleCycle(basicData.Clock.cycle);
            setValueReward(value);
            setConfidenceReward(confidence);
            setConstancyReward(constancy);

            return;
        }

        const clock = await ClockGetInfo(Clock);
        const data = await getSinergyBronzeData(
            addressAccount,
            SinergyBronze.contract,
            Able.contract,
            AbleSale.contract,
            MigrationSinergyBronze.contract,
            SinergyBronzeMigration.contract
        );

        setSinergyBronze(data);
        setClock(clock);
        handleCycle(clock.cycle);

    };

    // 4- Cargar Admin (No sabemos si se usa.)
    const loadAdmin = async () => {
        const basicData = await loadBasicData();
        const Able = await getAbleData(basicData.Able.contract, basicData.addressAccount);
        const Qualified = await getQualifiedInfo(basicData.Able.contract, basicData.addressAccount);
        const sinergyBronze = await getSinergyBronzeData(
            basicData.addressAccount,
            basicData.SinergyBronze.contract,
            basicData.Able.contract,
            basicData.AbleSale.contract,
            basicData.MigrationSinergyBronze.contract,
            basicData.SinergyBronzeMigration.contract
        );

        const ableReward = await getAbleRewardsInfo(
            basicData.Able.contract,
            basicData.addressAccount,
            Able.cycle
        );

        Able.reward = ableReward;

        const sinergyReward = await getSinergyRewardsInfo(
            basicData.SinergyBronze.contract,
            basicData.Rewards,
            basicData.addressAccount,
            "0"
        );

        sinergyBronze.recoverInfo = await getRecoverInfo(
            basicData.SinergyBronze.contract,
            basicData.Migration
        );

        sinergyBronze.rewards = sinergyReward;

        setBasicData(basicData);
        setAble(Able);
        setQualified(Qualified);
        setSinergyBronze(sinergyBronze);
        handleCycle(Able.cycle);

        setActualRewardState({
            title: "REPARTIENDO",
            amountRaised: `${Able != null ?
                Able.reward != undefined ? Able.reward.stableCoin.actual.raised :
                    0 : 0} ${MAIN_CURRENCY}`,
            amountToClaim: `${Able != null && Able.reward != undefined ? Able.reward.stableCoin.future.toClaim : '0.00'} ${MAIN_CURRENCY}`,
            actualAmount: `${Able != null && Able.reward != undefined ? Able.reward.stableCoin.actual.amount : '0.00'}  ${MAIN_CURRENCY}`
        });

        setFutureRewardState({
            title: "RECAUDANDO",
            amountRaised: `${Able != null && Able.reward != undefined ? Able.reward.stableCoin.future.raised : '0.00'}  ${MAIN_CURRENCY}`,
            amountToClaim: `${Able != null && Able.reward != undefined ? Able.reward.stableCoin.future.toClaim : '0.00'}  ${MAIN_CURRENCY}`,
            actualAmount: `${Able != null && Able.reward != undefined ? Able.reward.stableCoin.future.amount : '0.00'}  ${MAIN_CURRENCY}`
        });
    };

    // 5- Cargar historia de calificacion (Actualizado)
    const loadHistoryQualified = async () => {
        const clock = await ClockGetInfo(Clock);
        const user = await UserGetHistoryQualified(User, addressAccount, clock.cycle);

        setUser(user);
        setClock(clock);
        handleCycle(clock.cycle);

    };

    // 6- Cargar video test (Actualizado)
    const loadVideoTestInfo = async () => {
        const clock = await ClockGetInfo(Clock);
        const video = await TestGetVideo(Test.contract, Test.id);

        Test.video = video;

        setClock(clock);
        setTest(Test);
        handleCycle(clock.cycle);
    };

    // Funciones de Recarga (ABLE):

    // 1- Comprar ABLE (Actualizado)
    const uploadBuyAble = async () => {
        const stablecoinData = await getERC20Info(StableCoin.contract, addressAccount, 'ether', STABLE_COIN_CONTRACT_ADDRESS);
        const able_info = await getAbleData_AfterBuyCDA(Able, addressAccount);
        const clock = await ClockGetInfo(Clock);
        const user = await UserGetData(User, clock.cycle, addressAccount);
        const ableSale = await getSinergySaleData_AfterBuyAble(AbleSale);

        setStableCoin(stablecoinData);
        setAble(able_info);
        setUser(user);
        setAbleSale(ableSale);
        setClock(clock);
        handleCycle(clock.cycle);
    };

    // 2- Obtener Historial (Faltan probarlos)
    // 2.1
    const uploadAbleEvents = async (wallet) => {
        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);
        const events = await getAbleEventsInfo(
            wallet,
            Able.contract
        )

        setEvents(events);
    };

    // 2.2
    const uploadUSDCEvents = async (wallet) => {
        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getUsdcEventsInfo(addressAccount, USDC.contract)

        setEvents(events);
    };

    // 2.3
    const uploadUSDTEvents = async (wallet) => {
        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getUsdcEventsInfo(addressAccount, USDT.contract)

        setEvents(events);
    };

    // 2.4
    const uploadAbleStablecoinRewardEvents = async (wallet) => {

        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getAbleStableCoinRewardEventsInfo(
            wallet,
            Able.contract
        )

        setEvents(events);
    };

    // 2.5
    const uploadAbleRewardEvents = async (wallet) => {

        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getAbleRewardEventsInfo(
            wallet,
            Able.contract
        )

        setEvents(events);
    };

    // 2.6
    const uploadAbleVideoEvents = async (wallet) => {
        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getAbleVideoEventsInfo(
            wallet,
            Able.contract
        )

        setEvents(events);
    };

    // 2.7
    const uploadAbleUpdatesEvents = async (wallet) => {
        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getAbleUpdatesEventsInfo(
            wallet,
            Able.contract
        )

        setEvents(events);
    };

    // 2.8
    const uploadAbleCyclesChangesEvents = async (wallet) => {

        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getAbleCyclesChangesEventsInfo(
            Able.contract
        )

        setEvents(events);
    };

    // 2.9
    const uploadAbleUserQualificationEvents = async (wallet) => {

        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getAbleUserQualificationEventsInfo(
            wallet,
            Able.contract
        )

        setEvents(events);
    };

    // 2.10
    const uploadAbleCloseCyclesEvents = async (wallet) => {

        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getAbleCloseCyclesEventsInfo(
            wallet,
            Able.contract
        )

        setEvents(events);
    };

    // 2.11
    const uploadAblePointsEvents = async (wallet) => {

        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getAblePointsEventsInfo(
            wallet,
            Able.contract
        )

        setEvents(events);
    };

    // 2.12
    const uploadSinergyEvents = async (wallet) => {
        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getSinergyEventsInfo(addressAccount, SinergyBronze.contract, Rewards);

        setEvents(events);
    };

    // 2.13
    const uploadAbleSaleEvents = async (wallet) => {
        const clock = await ClockGetInfo(Clock);
        setClock(clock);
        handleCycle(clock.cycle);

        const events = await getAbleSaleEventsInfo(addressAccount, SinergyBronze.contract, AbleSale.contract);

        setEvents(events);
    };

    // 3- Contestar el Video Test (Actualizado)
    const uploadVideoTest = async () => {
        const clock = await ClockGetInfo(Clock);
        const user = await UserGetData(User, clock.cycle, addressAccount);
        const test = await TestGetData(Test, addressAccount, clock.cycle);

        setVideoTest(test.last_answer);
        setTest(test);
        setUser(user);
        setClock(clock);
        handleCycle(clock.cycle);
    };

    // 4- Recordatorios y Propositos (Actualizado)
    const uploadPorpouses = async () => {
        const clock = await ClockGetInfo(Clock);
        const able = await getAbleData_AfterChangePorpouses(Able, addressAccount, Clock);

        setAble(able);
        setClock(clock);
        handleCycle(clock.cycle);
    };

    // 5- Cargar Recompensas (Actualizado)
    const handleLoadAbleRewards = async () => {
        const clock = await ClockGetInfo(Clock);
        const reward = await AbleGetAbleRewardInfo(Able.contract, addressAccount, clock.cycle);
        Able.reward = reward;
        setClock(clock);
        setAble(Able);
        handleCycle(clock.cycle);
        setShowAbleRewards(true);
    };

    // 6- Recibir Recompensa (Actualizado)
    const uploadReward = async () => {
        const clock = await ClockGetInfo(Clock);
        const stablecoinData = await getERC20Info(StableCoin.contract, addressAccount, 'ether', STABLE_COIN_CONTRACT_ADDRESS);
        const base_reward = await RewardGetData(BaseReward, addressAccount, clock.cycle);
        const points = await AbleGetPointsInfo(Able.contract, addressAccount, clock.cycle);
        const user = await UserGetData(User, clock.cycle, addressAccount);


        setMinAmountToIncreasePoints(GetMinAmountToIncreasePoints(
            points.points_of,
            user.last_points,
            user.qualified.PERCENT_DAILY_INCREASE
        ));
        setClock(clock);
        setStableCoin(stablecoinData);
        setUser(user);
        setBaseReward(base_reward);
        handleCycle(clock.cycle);
    };

    // 7- Recibir Premio Able (Actualizado)
    const uploadAbleReward = async () => {
        const clock = await ClockGetInfo(Clock);
        const reward = await AbleGetAbleRewardInfo(Able.contract, addressAccount, clock.cycle);
        const user = await UserGetData(User, clock.cycle, addressAccount);

        Able.reward = reward;

        setAble(Able);
        setUser(user);
        setClock(clock);
        handleCycle(clock.cycle);
    };

    // 8- Migracion (Actualizado)
    const uploadAbleMigrate = async () => {
        const clock = await ClockGetInfo(Clock);
        const ableData = await getAbleData_AfterMigrate(Able, addressAccount);

        setClock(clock);
        setAble(ableData);
        handleCycle(clock.cycle);
    };

    // Funciones de Recarga Sinergy Bronze:
    // 1- Adquirir NFT (Actualizado)
    const uploadBuyNFT_Bronze = async () => {
        const clock = await ClockGetInfo(Clock);
        const stablecoinData = await getERC20Info(
            StableCoin.contract,
            addressAccount,
            'ether',
            STABLE_COIN_CONTRACT_ADDRESS
        );
        const ableData = await getERC20Info(
            Able.contract,
            addressAccount,
            'ether',
            SAVER_TOKEN_CONTRACT_ADDRESS
        );
        const bronzeData = await getSinergyBronzeData_AfterBuyNFT(
            addressAccount,
            SinergyBronze,
            Able,
            SinergyBronzeMigration.contract,
            MigrationSinergyBronze.contract
        );

        const user = await UserGetData(User, clock.cycle, addressAccount);

        Able.balance = ableData.balance;

        setAble(Able);
        setStableCoin(stablecoinData);
        setSinergyBronze(bronzeData);
        setUser(user);
        setClock(clock);
        handleCycle(clock.cycle);
    };

    // 3- Elegir un NFT Favorito (Actualiado)
    const uploadChooseFavouriteNFT_Bronze = async () => {
        const clock = await ClockGetInfo(Clock);
        const bronzeData = await getSinergyBronzeData_AfterChooseFavouriteNFT(
            addressAccount,
            SinergyBronze,
            AbleSale.contract,
            MigrationSinergyBronze.contract
        );

        // Value Reward
        const value = await RewardSinergyGetData(ValueReward, addressAccount, clock.cycle);
        setValueReward(value);

        // Constancy Reward
        const constancy = await RewardSinergyGetData(ConstancyReward, addressAccount, clock.cycle);
        setValueReward(constancy);

        // Confidence Reward
        const confidence = await RewardSinergyGetData(ConfidenceReward, addressAccount, clock.cycle);
        setValueReward(confidence);

        setSinergyBronze(bronzeData);
        setShowSinergyRewards(showSinergyRewards); // Esto lo agregamos para hacer refrescar la carta de NFT.
        setClock(clock);
        handleCycle(clock.cycle);
    };

    // 4- Reclamar Recompensas de Sinergy (Actualizado)
    const uploadNftReward_Bronze = async (idx) => {
        const clock = await ClockGetInfo(Clock);
        const stablecoinData = await getERC20Info(
            StableCoin.contract,
            addressAccount,
            'ether',
            STABLE_COIN_CONTRACT_ADDRESS
        );

        switch (idx) {
            case 0:
                // Value Reward
                const value = await RewardSinergyGetData(ValueReward, addressAccount, clock.cycle);
                setValueReward(value);
                break;
            case 1:
                // Constancy Reward
                const constancy = await RewardSinergyGetData(ConstancyReward, addressAccount, clock.cycle);
                setValueReward(constancy);
                break;
            case 2:
                // Confidence Reward
                const confidence = await RewardSinergyGetData(ConfidenceReward, addressAccount, clock.cycle);
                setValueReward(confidence);
                break;
            default:
                break;
        }

        setClock(clock);
        setStableCoin(stablecoinData);
        handleCycle(clock.cycle);
    };

    // 5- Editar NFT (Actualiazdo)
    const uploadModifyNFT_Bronze = async () => {
        const clock = await ClockGetInfo(Clock);
        const stablecoinData = await getERC20Info(
            StableCoin.contract,
            addressAccount,
            'ether',
            STABLE_COIN_CONTRACT_ADDRESS
        );
        const ableData = await getERC20Info(
            Able.contract,
            addressAccount,
            'ether',
            SAVER_TOKEN_CONTRACT_ADDRESS
        );
        const bronzeData = await getSinergyBronzeData_AfterModifyNFT(
            addressAccount,
            SinergyBronze,
            AbleSale.contract,
            MigrationSinergyBronze.contract
        );

        Able.balance = ableData.balance;

        setAble(Able);
        setStableCoin(stablecoinData);
        setSinergyBronze(bronzeData);
        setClock(clock);
        handleCycle(clock.cycle);
    };

    // 6- AbleSale (Actualizado)
    const uploadAbleSale = async () => {
        const able = await getERC20Info(Able.contract, addressAccount, 'ether');
        const clock = await ClockGetInfo(Clock);
        const ableSaleData = await getSinergySaleData(
            AbleSale.contract,
            ABLE_SALE_ADDRESS,
            false,
            addressAccount,
            clock.cycle
        );
        const sinergyBronze = await getSinergyBronze_AfterSell(
            SinergyBronze,
            AbleSale.contract
        );

        Able.balance = able.balance;
        setSinergyBronze(sinergyBronze);
        setAbleSale(ableSaleData);
        setClock(clock);
        setAble(Able);
        handleCycle(clock.cycle);
    };

    // 8- Cargar Referencias (Actualizado)
    const uploadReferences = async (level) => {
        const clock = await ClockGetInfo(Clock);
        let sinergyBronzeData = SinergyBronze;
        switch (level) {
            case 1:
                sinergyBronzeData = await getSinergyBronzeData_FirstReference(SinergyBronze);
                break;
            case 2:
                sinergyBronzeData = await getSinergyBronzeData_SecondReference(SinergyBronze);
                break;
            case 3:
                sinergyBronzeData = await getSinergyBronzeData_ThirdReference(SinergyBronze);
                break;
            case 4:
                sinergyBronzeData = await getSinergyBronzeData_FourReference(SinergyBronze);
                break;
            case 5:
                sinergyBronzeData = await getSinergyBronzeData_FiveReference(SinergyBronze);
                break;
            case 6:
                sinergyBronzeData = await getSinergyBronzeData_SixReference(SinergyBronze);
                break;
            case 7:
                sinergyBronzeData = await getSinergyBronzeData_SevenReference(SinergyBronze);
                break;
            case 8:
                sinergyBronzeData = await getSinergyBronzeData_EightReference(SinergyBronze);
                break;
            case 9:
                sinergyBronzeData = await getSinergyBronzeData_NineReference(SinergyBronze);
                break;
            default:
                break;
        }
        setSinergyBronze(sinergyBronzeData);
        setClock(clock);
        handleCycle(clock.cycle);
    };

    // 9- Migracion (Actualizado)
    const uploadSinergyMigrate = async () => {
        const clock = await ClockGetInfo(Clock);
        const sinergyData = await getSinergyBronzeData_AfterMigrate(
            addressAccount,
            SinergyBronze,
            MigrationSinergyBronze.contract
        );

        setSinergyBronze(sinergyData);
        setClock(clock);
        handleCycle(clock.cycle);
    };

    // 10- Cargar Recompensas Sinergy (Actualizado)
    const handleLoadSinergyRewards = async () => {
        const clock = await ClockGetInfo(Clock);
        const value = await RewardSinergyGetData(ValueReward, addressAccount, clock.cycle);
        const constancy = await RewardSinergyGetData(ConstancyReward, addressAccount, clock.cycle);
        const confidence = await RewardSinergyGetData(ConfidenceReward, addressAccount, clock.cycle);

        const min_amount_able_wei = await ConfidenceReward.stablecoin.contract.methods.MIN_AMOUNT_OF_ABLE().call();
        const min_amount_able = Number(web3.utils.fromWei(min_amount_able_wei, 'ether')).toFixed(2);
        confidence.min_amount_able = min_amount_able;

        setClock(clock);
        setValueReward(value);
        setConstancyReward(constancy);
        setConfidenceReward(confidence);
        handleCycle(clock.cycle);

        await handleLoadAbleRewards();
        setShowSinergyRewards(true);
    };

    // 11- Cargar Able Sale (Actualizado)
    const handleLoadAbleSale = async () => {
        const clock = await ClockGetInfo(Clock);
        const ableSale = await getSinergySaleData(
            AbleSale.contract,
            ABLE_SALE_ADDRESS,
            true,
            addressAccount,
            clock.cycle
        );

        setClock(clock);
        setAbleSale(ableSale);
        handleCycle(clock.cycle);
        setShowAbleSaleList(true);
    };

    // 12- Migrate Reference Level
    const handleMigrateReferenceLevel = async (level) => {
        const clock = await ClockGetInfo(Clock);
        const bronzeData = await getSinergyBronzeData_AfterMigrateLevel(SinergyBronze, level);

        setSinergyBronze(bronzeData);
        setClock(clock);
        handleCycle(clock.cycle);
    };

    // ADMIN

    // 1. Cargar Able
    const AdminLoadAble = async () => {
        const basic_data = await loadBasicData();
        const able = await AdminGetAbleInfo(
            basic_data.Able,
            basic_data.addressAccount,
            basic_data.Clock.cycle
        );

        setBasicData(basic_data);
        setAble(able);
        setClock(basic_data.Clock.cycle);
    };

    // 2. Cargar Sinergy
    const AdminLoadSinergy = async () => {
        const basic_data = await loadBasicData();
        const sinergy = await AdminGetSinergyInfo(
            basic_data.SinergyBronze,
            basic_data.addressAccount
        );

        setBasicData(basic_data);
        setSinergyBronze(sinergy);
        setClock(basic_data.Clock.cycle);
    };

    // 3. Cargar Sinergy Sale
    const AdminLoadSinergySale = async () => {
        const basic_data = await loadBasicData();
        const sinergy = await AdminGetSinergySaleInfo(
            basic_data.SinergySale,
            basic_data.addressAccount,
            basic_data.Clock.cycle
        );

        setBasicData(basic_data);
        setAbleSale(sinergy);
        setClock(basic_data.Clock.cycle);
    };

    // 4. Cargar Test
    const AdminLoadTest = async () => {
        const basic_data = await loadBasicData();
        const test = await AdminGetTestInfo(
            basic_data.Test,
            basic_data.addressAccount,
            basic_data.Clock.cycle
        );

        setBasicData(basic_data);
        setTest(test);
        setClock(basic_data.Clock.cycle);
    };

    // 5. Cargar User
    const AdminLoadUser = async () => {
        const basic_data = await loadBasicData();
        const user = await AdminGetUserInfo(
            basic_data.User,
            basic_data.addressAccount,
            basic_data.Clock.cycle
        )

        setBasicData(basic_data);
        setUser(user);
        setClock(basic_data.Clock.cycle);
    };

    // 6. Cargar Owners
    const AdminLoadOwners = async () => {
        const basic_data = await loadBasicData();
        const data = await AdminGetOwnersInfo(
            basic_data.Owners,
            basic_data.addressAccount
        );

        setBasicData(basic_data);
        setClock(basic_data.Clock.cycle);
        setOwners(data);
    };

    // 7. Cargar Value Reward
    const AdminLoadValueReward = async () => {
        const basic_data = await loadBasicData();
        const data = await AdminGetRewardInfo(
            basic_data.Rewards.value,
            basic_data.addressAccount,
            basic_data.Clock.cycle,
            1
        );

        setBasicData(basic_data);
        setValueReward(data);
        setClock(basic_data.Clock.cycle);
    };

    // 8. Cargar Constancy Reward
    const AdminLoadConstancyReward = async () => {
        const basic_data = await loadBasicData();
        const data = await AdminGetRewardInfo(
            basic_data.Rewards.constancy,
            basic_data.addressAccount,
            basic_data.Clock.cycle,
            2
        );

        setBasicData(basic_data);
        setConstancyReward(data);
        setClock(basic_data.Clock.cycle);
    };

    // 9. Cargar Confidence Reward
    const AdminLoadConfidenceReward = async () => {
        const basic_data = await loadBasicData();
        const data = await AdminGetRewardInfo(
            basic_data.Rewards.confidence,
            basic_data.addressAccount,
            basic_data.Clock.cycle,
            3
        );
        

        setBasicData(basic_data);
        setConfidenceReward(data);
        setClock(data);
    };

    // 10. Cargar Base Reward
    const AdminLoadBaseReward = async () => {
        const basic_data = await loadBasicData();
        const data = await AdminGetRewardInfo(
            basic_data.Rewards.daily.stablecoin,
            basic_data.addressAccount,
            basic_data.Clock.cycle,
            0
        );

        setBasicData(basic_data);
        setBaseReward(data);
        setClock(basic_data.Clock.cycle);
    };

    // 11. Cargar Clock
    const AdminLoadClock = async () => {
        const basic_data = await loadBasicData();
        const clock = await AdminGetClockInfo(basic_data.Clock, basic_data.addressAccount);

        setBasicData(basic_data);
        setClock(clock);
        handleCycle(basic_data.Clock.cycle);
    };

    const values = {
        saverCirculation, setSaverCirculation,
        saverHolders, setSaverHolders,
        stableCoinDistribute, setStableCoinDistributed,
        lastStableCoinDistribute, setLastStableCoinDistribute,
        saverPrice, setSaverPrice,
        saverMinted, setSaverMinted,
        addressAccount,
        chainID,
        Able,
        AbleSale,
        SinergyBronze,
        Qualified,
        USDC,
        USDT,
        StableCoin,
        nativeCryptoBalance,
        Events,
        theCycle,
        showChangeCycle,
        SinergyBronzeMigration,
        videoTest,
        showTermsConditions,
        Rewards,
        migrationData,
        showAbleRewards,
        showSinergyRewards,
        AbleMigration,
        Triple,
        showAbleSaleList,
        MigrationSinergySale,
        AbleFirstMigration,
        SinergyBronzeFirstMigration,
        User,
        Test,
        Clock,
        MigrationSinergyBronze,
        ValueReward,
        ConfidenceReward,
        ConstancyReward,
        BaseReward,
        Owners,
        ValueRewardAdminLoad,
        MigrationFirstSinergyBronze,
        min_amount_to_increase_points,
        setShowChangeCycle,
        loadAdmin,
        loadAble,
        loadSinergyBronze,
        uploadBuyAble,
        uploadAbleEvents,
        uploadUSDCEvents,
        uploadUSDTEvents,
        uploadAbleStablecoinRewardEvents,
        uploadAbleRewardEvents,
        uploadAbleVideoEvents,
        uploadAbleUpdatesEvents,
        uploadAbleCyclesChangesEvents,
        uploadAbleUserQualificationEvents,
        uploadAbleCloseCyclesEvents,
        uploadAblePointsEvents,
        uploadSinergyEvents,
        uploadAbleSaleEvents,
        uploadVideoTest,
        uploadPorpouses,
        uploadReward,
        uploadAbleReward,
        uploadBuyNFT_Bronze,
        uploadChooseFavouriteNFT_Bronze,
        uploadNftReward_Bronze,
        uploadModifyNFT_Bronze,
        uploadAbleSale,
        canClaim,
        uploadAbleMigrate,
        uploadSinergyMigrate,
        uploadReferences,
        setShowTermsConditions,
        loadHistoryQualified,
        loadVideoTestInfo,
        handleLoadAbleRewards,
        handleLoadSinergyRewards,
        setMigrationData,
        setAbleMigration,
        handleMigrateReferenceLevel,
        loadSinergyBronze_OwnerNFT,
        setShowAbleSaleList,
        handleLoadAbleSale,
        AdminLoadAble,
        AdminLoadSinergy,
        AdminLoadSinergySale,
        AdminLoadTest,
        AdminLoadUser,
        AdminLoadOwners,
        AdminLoadValueReward,
        AdminLoadConstancyReward,
        AdminLoadConfidenceReward,
        AdminLoadConfidenceReward,
        AdminLoadBaseReward,
        AdminLoadClock,
        setTest
    };

    return <SaverContext.Provider value={values} {...props} />
}

export const useProvider = () => {
    const context = React.useContext(SaverContext);
    if (!context) throw new Error('useProvider debe estar dentro del provider');
    return context;
};