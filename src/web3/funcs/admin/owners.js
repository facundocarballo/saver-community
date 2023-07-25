import { ABLE_CONTRACT_ADDRESS, OWNERS_CONTRACT_ADDRESS, buildTransaciont } from '..';

export const AdminGetOwnersInfo = async (Owners, wallet) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Owners...";

    const stadistic_data = await AdminGetStadisticData(Owners.contract, wallet);
    const set_data = await AdminGetSetData(Owners.contract, wallet);

    Owners.admin = {
        stadistic_data,
        set_data
    };

    let end_time = Date.now();
    console.log("Tiempo de carga (Owners): ", ((end_time - start_time) / 1000).toString());

    return Owners;
};

const AdminGetStadisticData = async (Contract, wallet) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Estadisticos de Owners...";
    
    const data = [];

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos estadisticos de Owners): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetSetData = async (Contract, wallet) => {
    let start_time = Date.now();
    window.document.getElementById('loading').innerHTML = "Cargando Datos Modificables de Owners...";

    const community_wallet = await AdminGetCommuntiyWallet(Contract, wallet);
    const development_wallet = await AdminGetDevelopmentWallet(Contract, wallet);
    const USDC = await AdminGetUsdc(Contract, wallet);
    const USDC_DECIMALS = await AdminGetUsdcDecimals(Contract, wallet);
    const USDT = await AdminGetUsdt(Contract, wallet);
    const USDT_DECIMALS = await AdminGetUsdtDecimals(Contract, wallet);
    const Stablecoin = await AdminGetStablecoin(Contract, wallet);
    const RefreshAll = await AdminGetRefreshAll(Contract, wallet);

    const data = [
        community_wallet,
        development_wallet,
        USDC,
        USDC_DECIMALS,
        USDT,
        USDT_DECIMALS,
        Stablecoin,
        RefreshAll
    ]

    let end_time = Date.now();
    console.log("Tiempo de carga (Datos Modificables de Owners): ", ((end_time - start_time) / 1000).toString());

    return data;
};

const AdminGetCommuntiyWallet = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetCommunityWallet(value).encodeABI();
        const params = await buildTransaciont(wallet, OWNERS_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.community_wallet().call();
    const obj = {
        title: "Billetera de la comunidad",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetDevelopmentWallet = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetDevelopmentWallet(value).encodeABI();
        const params = await buildTransaciont(wallet, ABLE_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.development_wallet().call();
    const obj = {
        title: "Billetera de Desarrollador",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

// USDC
const AdminGetUsdc = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetUSDC(value).encodeABI();
        const params = await buildTransaciont(wallet, OWNERS_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.USDC().call();
    const obj = {
        title: "USDC",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetUsdcDecimals = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetUSDCDecimals(value).encodeABI();
        const params = await buildTransaciont(wallet, OWNERS_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.USDC_DECIMALS().call();
    const obj = {
        title: "Decimales del token USDC",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

// USDT
const AdminGetUsdt = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetUSDT(value).encodeABI();
        const params = await buildTransaciont(wallet, OWNERS_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.USDT().call();
    const obj = {
        title: "USDT",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

const AdminGetUsdtDecimals = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetUSDTDecimals(value).encodeABI();
        const params = await buildTransaciont(wallet, OWNERS_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.USDT_DECIMALS().call();
    const obj = {
        title: "Decimales del token USDT",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

// Stablecoin
const AdminGetStablecoin = async (Contract, wallet) => {
    const handler = async (value) => {
        const data = await Contract.methods.SetStablecoin(value).encodeABI();
        const params = await buildTransaciont(wallet, OWNERS_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const actual_value = await Contract.methods.Stablecoin().call();
    const obj = {
        title: "Stablecoin",
        actual_value: actual_value,
        params: true,
        func: handler
    }

    return obj;
};

// Refresh All
const AdminGetRefreshAll = async (Contract, wallet) => {
    const handler = async () => {
        const data = await Contract.methods.RefreshAll().encodeABI();
        const params = await buildTransaciont(wallet, OWNERS_CONTRACT_ADDRESS, data);
        
        return params;
    };

    const obj = {
        title: "Refrescar todos los contratos",
        actual_value: "",
        params: false,
        func: handler
    }

    return obj;
};