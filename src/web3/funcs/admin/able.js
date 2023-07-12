import { ABLE_CONTRACT_ADDRESS, buildTransaciont } from '..';
import { AbleGetAbleRewardInfo, AbleGetHoldersInfo, AbleGetPointsInfo } from '../able/index';

export const AdminGetAbleInfo = async (Able, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Able...";

    const stadistic_data = await AdminGetStadisticData(Able.contract, wallet, cycle);
    const set_data = await AdminGetSetData(Able.contract, wallet, cycle);

    Able.admin = {
        stadistic_data,
        set_data
    };

    let end_time = Date.now();
    console.log("Tiempo de carga (Able): ", ((end_time - start_time) / 1000).toString());

    return Able;
};

const AdminGetStadisticData = async (Contract, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Estadisticos de Able...";

    const holders = await AbleGetHoldersInfo(Contract);
    const points = await AbleGetPointsInfo(Contract, wallet, cycle);

    const able_rewards_claimed = await Contract.methods.able_rewards_claimed().call();

    const qualified_able_rewards_claimed = await Contract.methods.qualified_able_rewards_claimed().call();
    
    const total_able_distributed_wei = await Contract.methods.total_able_distributed().call();
    const total_able_distributed = Number(web3.utils.fromWei(total_able_distributed_wei, 'ether')).toFixed(2);

    const amount_wallets_winners = await Contract.methods.GetWalletWinnersLength().call();
    
    const data = [
        {
            title: "Holders",
            value: holders.total_holders
        },
        {
            title: "Holders Calificados",
            value: holders.qualified_holders
        },
        {
            title: "Puntos totales",
            value: points.total_points
        },
        {
            title: "Billeteras con puntos",
            value: points.amount_of_wallets_with_points
        },
        {
            title: "Ultima billetera calificada que adquirio Able",
            value: points.last_wallet_who_bought_able
        },
        {
            title: "Premio Able Entregados",
            value: able_rewards_claimed
        },
        {
            title: "Able entregado en Premio Able",
            value: total_able_distributed
        },
        {
            title: "Premios able entregados a cuentas actualmente calificadas",
            value: qualified_able_rewards_claimed
        },
        {
            title: "Billeteras que obtuvieron el Premio Able",
            value: amount_wallets_winners
        },
    ];

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos estadisticos de Able): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetAbleRewardInfo = async (Contract) => {


    return 
};

const AdminGetSetData = async (Contract, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Modificables de Able...";

    const potencial_able = await AdminGetPotencialAbleObj(Contract, wallet);
    const cycles_for_able_reward = await AdminGetCyclesForAbleRewardObj(Contract, wallet);

    const data = [
        potencial_able,
        cycles_for_able_reward
    ]

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos Modificables de Able): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetPotencialAbleObj = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetPotencialAble(value).encodeABI();
        const params = await buildTransaciont(wallet, ABLE_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.POTENCIAL_ABLE().call();
    const obj = {
        title: "Potencial de Able",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetCyclesForAbleRewardObj = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetCyclesForAbleReward(value).encodeABI();
        const params = await buildTransaciont(wallet, ABLE_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.CYCLES_FOR_ABLE_REWARD().call();
    const obj = {
        title: "Ciclos para Able Reward",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};