import { MAIN_CURRENCY, buildTransaciont } from '..';

const BASE_REWARD_IDX = 0;
const VALUE_REWARD_IDX = 1;
const CONSTANCY_REWARD_IDX = 2;
const CONFIDENCE_REWARD_IDX = 3;


export const AdminGetRewardInfo = async (
    Reward,
    wallet,
    cycle,
    idx
) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Reward...";
    let promise_reward = null;
    switch (idx) {
        case BASE_REWARD_IDX:
            promise_reward = GetAdminBaseRewardInfo(Reward, cycle, wallet);
            break;
        case VALUE_REWARD_IDX:
            promise_reward = GetAdminValueRewardInfo(Reward, cycle, wallet);
            break;
        case CONSTANCY_REWARD_IDX:
            promise_reward = GetAdminConstancyRewardInfo(Reward, cycle, wallet);
            break;
        case CONFIDENCE_REWARD_IDX:
            promise_reward = GetAdminConfidenceRewardInfo(Reward, cycle, wallet);
            break;
        default:
            break;
    }

    Reward = await promise_reward;

    let end_time = Date.now();
    console.log("Tiempo de carga (Reward): ", ((end_time - start_time) / 1000).toString());

    return Reward;
};

const GetAdminBaseRewardInfo = async (Reward, cycle, wallet) => {
    const promise_stadistic_data = AdminGetStadisticData(Reward.contract, MAIN_CURRENCY, cycle);
    const promise_set_data = AdminGetSetData(Reward.contract, wallet, Reward.address);

    const stadistic_data = await promise_stadistic_data;
    const set_data = await promise_set_data;

    Reward.admin = {
        stadistic_data,
        set_data
    };

    return Reward;
};

const GetAdminValueRewardInfo = async (Reward, cycle, wallet) => {
    // Stablecoin
    const promise_stablecoin_stadistic_data = AdminGetStadisticData(Reward.stablecoin.contract, MAIN_CURRENCY, cycle);
    const promise_stablecoin_set_data = AdminGetSetData(Reward.stablecoin.contract, wallet, Reward.stablecoin.address);

    // Able
    const promise_able_stadistic_data = AdminGetStadisticData(Reward.able.contract, "ABLE", cycle);
    const promise_able_set_data = AdminGetSetData(Reward.able.contract, wallet, Reward.able.address);

    const stablecoin_stadistic_data = await promise_stablecoin_stadistic_data;
    const stablecoin_set_data = await promise_stablecoin_set_data;
    const able_stadistic_data = await promise_able_stadistic_data;
    const able_set_data = await promise_able_set_data;

    Reward.stablecoin.admin = {
        stadistic_data: stablecoin_stadistic_data,
        set_data: stablecoin_set_data
    }

    Reward.able.admin = {
        stadistic_data: able_stadistic_data,
        set_data: able_set_data
    }

    return Reward;
};

const GetAdminConstancyRewardInfo = async (Reward, cycle, wallet) => {
    // Stablecoin
    const promise_stablecoin_stadistic_data = AdminGetStadisticData(Reward.stablecoin.contract, MAIN_CURRENCY, cycle);
    const promise_stablecoin_set_data = AdminGetSetData(Reward.stablecoin.contract, wallet, Reward.stablecoin.address);
    const promise_stablecoin_AMOUNT_USERS_NEED_TO_CLAIM = AdminConstancyChangeAMOUNT_USERS_NEED_TO_CLAIM(
        Reward.stablecoin.contract,
        wallet,
        Reward.stablecoin.address
    );

    // Able
    const promise_able_stadistic_data = AdminGetStadisticData(Reward.able.contract, "ABLE", cycle);
    const promise_able_set_data = AdminGetSetData(Reward.able.contract, wallet, Reward.able.address);
    const promise_able_AMOUNT_USERS_NEED_TO_CLAIM = AdminConstancyChangeAMOUNT_USERS_NEED_TO_CLAIM(
        Reward.able.contract,
        wallet,
        Reward.able.address
    );

    const stablecoin_stadistic_data = await promise_stablecoin_stadistic_data;
    const stablecoin_set_data = await promise_stablecoin_set_data;
    const stablecoin_AMOUNT_USERS_NEED_TO_CLAIM = await promise_stablecoin_AMOUNT_USERS_NEED_TO_CLAIM;
    stablecoin_set_data.push(stablecoin_AMOUNT_USERS_NEED_TO_CLAIM);

    const able_stadistic_data = await promise_able_stadistic_data;
    const able_set_data = await promise_able_set_data;
    const able_AMOUNT_USERS_NEED_TO_CLAIM = await promise_able_AMOUNT_USERS_NEED_TO_CLAIM;
    able_set_data.push(able_AMOUNT_USERS_NEED_TO_CLAIM);

    Reward.stablecoin.admin = {
        stadistic_data: stablecoin_stadistic_data,
        set_data: stablecoin_set_data
    }

    Reward.able.admin = {
        stadistic_data: able_stadistic_data,
        set_data: able_set_data
    }

    return Reward;
};

const GetAdminConfidenceRewardInfo = async (Reward, cycle, wallet) => {
    // Stablecoin
    const promise_stablecoin_stadistic_data = AdminGetStadisticData(Reward.stablecoin.contract, MAIN_CURRENCY, cycle);
    const promise_stablecoin_set_data = AdminGetSetData(Reward.stablecoin.contract, wallet, Reward.stablecoin.address);
    const promise_stablecoin_MIN_AMOUNT_OF_ABLE = AdminConfidenceGetMIN_AMOUNT_OF_ABLE(Reward.stablecoin.contract, wallet, Reward.stablecoin.address);

    // Able
    const promise_able_stadistic_data = AdminGetStadisticData(Reward.able.contract, "ABLE", cycle);
    const promise_able_set_data = AdminGetSetData(Reward.able.contract, wallet, Reward.able.address);
    const promise_able_MIN_AMOUNT_OF_ABLE = AdminConfidenceGetMIN_AMOUNT_OF_ABLE(Reward.able.contract, wallet, Reward.able.address);

    const stablecoin_stadistic_data = await promise_stablecoin_stadistic_data;
    const stablecoin_set_data = await promise_stablecoin_set_data;
    const stablecoin_MIN_AMOUNT_OF_ABLE = await promise_stablecoin_MIN_AMOUNT_OF_ABLE;
    stablecoin_set_data.push(stablecoin_MIN_AMOUNT_OF_ABLE);

    const able_stadistic_data = await promise_able_stadistic_data;
    const able_set_data = await promise_able_set_data;
    const able_MIN_AMOUNT_OF_ABLE = await promise_able_MIN_AMOUNT_OF_ABLE;
    able_set_data.push(able_MIN_AMOUNT_OF_ABLE);

    Reward.stablecoin.admin = {
        stadistic_data: stablecoin_stadistic_data,
        set_data: stablecoin_set_data
    }

    Reward.able.admin = {
        stadistic_data: able_stadistic_data,
        set_data: able_set_data
    }

    console.log(Reward.stablecoin.admin);
    console.log(Reward.able.admin);

    return Reward;
};

const AdminGetStadisticData = async (Contract, symbol, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Estadisticos de Reward...";

    const total_claimed_wei = await Contract.methods.total_distributed().call();
    const total_claimed = web3.utils.fromWei(total_claimed_wei, 'ether');

    const last_raised_wei = await Contract.methods.raised_amount(String(Number(cycle) - 1)).call();
    const last_raised = web3.utils.fromWei(last_raised_wei, 'ether');

    const actual_claimed_wei = await Contract.methods.claimed_amount(cycle).call();
    const actual_claimed = web3.utils.fromWei(actual_claimed_wei, 'ether');

    const actual_raised_wei = await Contract.methods.raised_amount(cycle).call();
    const actual_raised = web3.utils.fromWei(actual_raised_wei, 'ether');

    const data = [
        {
            title: "Total Distribuido",
            value: `${symbol} ${Number(total_claimed).toFixed(2)}`
        },
        {
            title: "Recaudacion del ciclo anterior",
            value: `${symbol} ${Number(last_raised).toFixed(2)}`
        },
        {
            title: "Cantidad reclamada por usuarios en este ciclo",
            value: `${symbol} ${Number(actual_claimed).toFixed(2)}`
        },
        {
            title: "Recaudacion actual",
            value: `${symbol} ${Number(actual_raised).toFixed(2)}`
        },
    ];

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos estadisticos de Reward): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetSetData = async (Contract, wallet, ContractAddress) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Modificables de Reward...";

    const token = await AdminGetToken(Contract, wallet, ContractAddress);

    const data = [
        token
    ]

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos Modificables de Reward): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetToken = async (Contract, wallet, ContractAddress) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetToken(value).encodeABI();
        const params = await buildTransaciont(wallet, ContractAddress, data);

        return params;
    };

    const actual_value = await Contract.methods.Token().call();
    const obj = {
        title: "Token del Bote",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminConstancyChangeAMOUNT_USERS_NEED_TO_CLAIM = async (Contract, wallet, ContractAddress) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetAmoutUsersNeedToClaim(value).encodeABI();
        const params = await buildTransaciont(wallet, ContractAddress, data);

        return params;
    };

    const actual_value = await Contract.methods.AMOUNT_USERS_NEED_TO_CLAIM().call();
    const obj = {
        title: "Billeteras necesarias para habilitar el bote",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminConfidenceGetMIN_AMOUNT_OF_ABLE = async (Contract, wallet, ContractAddress) => {
    const handler = async (value) => {
        const wei = web3.utils.toWei(value, 'ether');
        const data = await Contract.methods.SetMinAmountOfAble(wei).encodeABI();
        const params = await buildTransaciont(wallet, ContractAddress, data);

        return params;
    };

    const actual_value = await Contract.methods.MIN_AMOUNT_OF_ABLE().call();
    const value = Number(web3.utils.fromWei(actual_value, 'ether')).toFixed(2);
    const obj = {
        title: "Minima cantidad de Able para participar del bote",
        actual_value: value,
        func: handler,
        params: true
    }

    return obj;
};