import { USER_CONTRACT_ADDRESS, buildTransaciont } from '..';

export const AdminGetUserInfo = async (User, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando User...";

    const stadistic_data = await AdminGetStadisticData(User.contract, wallet, cycle);
    const set_data = await AdminGetSetData(User.contract, wallet, cycle);

    User.admin = {
        stadistic_data,
        set_data
    };

    let end_time = Date.now();
    console.log("Tiempo de carga (User): ", ((end_time - start_time) / 1000).toString());

    return User;
};

const AdminGetStadisticData = async (Contract, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Estadisticos de User...";
    
    const data = [];

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos estadisticos de User): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetSetData = async (Contract, wallet, cycle) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Modificables de User...";

    const MIN_POINTS_TO_QUALIFY = await AdminGetMinPointsToQualify(Contract, wallet);
    const PERCENT_TO_INCREASE = await AdminGetMinPointsToIncrease(Contract, wallet);
    
    const data = [
        MIN_POINTS_TO_QUALIFY,
        PERCENT_TO_INCREASE
    ]

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos Modificables de User): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetMinPointsToQualify = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetMinAmountOfPointsToQualify(value).encodeABI();
        const params = await buildTransaciont(wallet, USER_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value_wei = await Contract.methods.MIN_POINTS_TO_QUALIFY().call();
    const actual_value = web3.utils.fromWei(actual_value_wei, 'ether');

    const obj = {
        title: "Cantidad minima de puntos para calificar.",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetMinPointsToIncrease = async (Contract, wallet) => {
    const handler = async (num) => {
        const value = ((Number(num) / 100) + 1) * 10000;
        console.log("Lo cambiara a este valor: ", String(Math.floor(value)));
        const data = await Contract.methods.SetPercentToIncrease(String(Math.floor(value))).encodeABI();
        const params = await buildTransaciont(wallet, USER_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.PERCENT_TO_INCREASE().call();

    const obj = {
        title: "Porcentaje de incremento de puntos diarios",
        actual_value: `${(((Number(actual_value) / 10000) - 1) * 100).toFixed(2)}%`,
        params: true,
        func: handler
    }

    return obj;
};



